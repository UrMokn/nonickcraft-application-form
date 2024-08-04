import { auth, signIn, signOut } from '@/auth';
import { Button } from '@nextui-org/button';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <form
        action={async () => {
          'use server';
          await signIn('discord');
        }}
      >
        <Button type='submit' color='primary'>
          Sign in with Discord
        </Button>
      </form>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type='submit' color='danger'>
          Sign out
        </Button>
      </form>
    </div>
  );
}
