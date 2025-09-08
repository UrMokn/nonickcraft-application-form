/*'use server';

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
*/
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

    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "新しい申請",
              color: 0x00ffcc,
              author: {
                name: session?.user.name || "不明なユーザー",
                icon_url: session?.user.image || undefined,
              },
              fields: [
                { name: "ユーザーID", value: session?.user.id || "不明", inline: true },
                { name: "Java ID", value: value.javaId || "なし", inline: true },
                { name: "Bedrock ID", value: value.bedrockId || "なし", inline: true },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }

    revalidatePath('/');
    return { ok: true };
  } catch (e) {
    if (e instanceof Error) {
      return { ok: false, error: e.message };
    }
  }
}
