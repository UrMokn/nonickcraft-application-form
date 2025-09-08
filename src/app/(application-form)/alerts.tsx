import { signIn } from '@/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/alert';
import { Button } from '@nextui-org/button';

export function LoginAlert() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('discord');
      }}
    >
      <Alert variant='info'>
        <div className='flex justify-between items-center gap-3'>
          <div>
            <AlertTitle>ログインが必要です</AlertTitle>
            <AlertDescription>
              申請を行うにはDiscordアカウントでログインする必要があります。
            </AlertDescription>
          </div>
          <Button type='submit' color='primary'>
            ログイン
          </Button>
        </div>
      </Alert>
    </form>
  );
}

export function NotJoinedAlert() {
  return (
    <Alert variant='warning'>
      <AlertTitle>サーバーに参加していません</AlertTitle>
      <AlertDescription>申請を行うにはUrMoknCraft鯖に参加する必要があります。</AlertDescription>
    </Alert>
  );
}

export function JoinedDeniedGuildsAlert() {
  return (
    <Alert variant='danger'>
      <AlertTitle>禁止されたサーバーへの参加を検知しました</AlertTitle>
      <AlertDescription>
        該当するサーバーに参加している間は、申請を行うことはできません。
      </AlertDescription>
    </Alert>
  );
}

export function ExistApplicationAlert() {
  return (
    <Alert variant='success'>
      <AlertTitle>申請が完了しました！</AlertTitle>
      <AlertDescription>
        申請が審査されるまで、数日お待ちください。（承認された場合にのみ、DMにてサーバーへの接続方法をご案内します）
      </AlertDescription>
    </Alert>
  );
}

export function NotMeetRequirementsAlert() {
  return (
    <Alert variant='warning'>
      <AlertTitle>申請要件を満たしていません</AlertTitle>
      <AlertDescription>
        申請を行うには、
        <span className='px-1 bg-green-900/50 text-green-500 rounded-md'>@Player</span>
        ロールが付与されている必要があります。
      </AlertDescription>
    </Alert>
  );
}
