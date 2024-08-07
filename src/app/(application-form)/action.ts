'use server';

import { auth } from '@/auth';
import applicationModel from '@/lib/database/applicationModel';
import { applicationSchema } from '@/lib/database/schema';
import { dbConnect } from '@/lib/mongoose';
import { revalidatePath } from 'next/cache';
import type { z } from 'zod';
import { checkRequirements } from './util';

export async function postApplication(value: z.output<typeof applicationSchema>) {
  try {
    const res = await checkRequirements();
    if (!res?.ok) throw new Error(res?.error);

    if (!applicationSchema.safeParse(value).success) throw new Error('INVALID_VALUES');

    const session = await auth();

    await dbConnect();
    await applicationModel.findOneAndUpdate(
      { userId: session?.user.id },
      { $set: { java: value.javaId, bedrock: value.bedrockId } },
      { upsert: true },
    );

    revalidatePath('/');
    return { ok: true };
  } catch (e) {
    if (e instanceof Error) {
      return { ok: false, error: e.message };
    }
  }
}
