import { auth } from '@/auth';
import applicationModel from '@/lib/database/applicationModel';
import levelModel from '@/lib/database/levelModel';
import { getGuildMember, getUserGuilds } from '@/lib/discord';
import { dbConnect } from '@/lib/mongoose';
import { BannedGuilds } from '../config';

export enum CheckRequirementsError {
  LoginRequired = 'LOGIN_REQUIRED',
  NotJoined = 'NOT_JOINED',
  JoinedDeniedGuilds = 'JOINED_DENIED_GUILDS',
  ExistApplication = 'EXIST_APPLICATION',
  NotMeetRequirements = 'NOT_MEET_REQUIREMENTS',
}

export type CheckRequirementsRes =
  | {
      ok: boolean;
      error?: undefined;
    }
  | {
      ok: boolean;
      error: string;
    }
  | undefined;

export async function checkRequirements(): Promise<CheckRequirementsRes> {
  try {
    const session = await auth();
    if (!session || !session.user.id) throw new Error(CheckRequirementsError.LoginRequired);

    await dbConnect();

    const application = await applicationModel.findOne({ userId: session.user.id });
    if (application) throw new Error(CheckRequirementsError.ExistApplication);

    const guilds = await getUserGuilds(session.user.accessToken);
    if (!guilds.some((guild) => guild.id === process.env.GUILD_ID))
      throw new Error(CheckRequirementsError.NotJoined);
    if (guilds.some((guild) => BannedGuilds.includes(guild.id)))
      throw new Error(CheckRequirementsError.JoinedDeniedGuilds);

    const level = await levelModel.findOne({ id: session.user.id });
    const member = await getGuildMember(process.env.GUILD_ID, session.user.id);

    if (!member.roles.includes(process.env.TRUSTED_ROLE) && !((level?.lv ?? 0) >= 10))
      throw new Error(CheckRequirementsError.NotMeetRequirements);

    return { ok: true };
  } catch (e) {
    if (e instanceof Error) {
      return { ok: false, error: e.message };
    }
  }
}
