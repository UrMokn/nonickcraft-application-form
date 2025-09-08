/*import { auth } from '@/auth';
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
    if (!session) throw new Error(CheckRequirementsError.LoginRequired);

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
*/
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
    console.log("Step 1: auth()");
    const session = await auth();
    if (!session) throw new Error(CheckRequirementsError.LoginRequired);
    console.log("✅ session", session.user);

    console.log("Step 2: dbConnect()");
    await dbConnect();

    console.log("Step 3: applicationModel.findOne()");
    const application = await applicationModel.findOne({ userId: session.user.id });
    if (application) throw new Error(CheckRequirementsError.ExistApplication);
    console.log("✅ no existing application");

    console.log("Step 4: getUserGuilds()");
    const guilds = await getUserGuilds(session.user.accessToken);
    console.log("✅ guilds", guilds.map(g => g.id));

    console.log("Step 5: check joined guild");
    if (!guilds.some((guild) => guild.id === process.env.GUILD_ID)) {
      console.error("❌ not joined target guild", process.env.GUILD_ID);
      throw new Error(CheckRequirementsError.NotJoined);
    }

    console.log("Step 6: check banned guilds");
    if (guilds.some((guild) => BannedGuilds.includes(guild.id))) {
      console.error("❌ user is in banned guilds", BannedGuilds);
      throw new Error(CheckRequirementsError.JoinedDeniedGuilds);
    }

    console.log("Step 7: levelModel.findOne()");
    const level = await levelModel.findOne({ id: session.user.id });
    console.log("✅ level", level);

    console.log("Step 8: getGuildMember()");
    const member = await getGuildMember(process.env.GUILD_ID, session.user.id);
    console.log("✅ member", member);

    console.log("Step 9: trusted role or level check");
    if (!member.roles.includes(process.env.TRUSTED_ROLE) && !((level?.lv ?? 0) >= 10)) {
      console.error("❌ requirement not met");
      throw new Error(CheckRequirementsError.NotMeetRequirements);
    }

    console.log("✅ all checks passed");
    return { ok: true };
  } catch (e) {
    console.error("checkRequirements error:", e);
    if (e instanceof Error) {
      return { ok: false, error: e.message };
    }
  }
}
