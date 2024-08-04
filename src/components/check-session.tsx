import { signOut, useSession } from 'next-auth/react';
import { type ReactNode, useEffect } from 'react';

export function CheckSessionProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session.user.expiresAt * 1000 < Date.now()) {
      signOut();
    }
  }, [session, status]);

  return <>{children}</>;
}
