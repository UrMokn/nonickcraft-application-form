import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Provider } from './provider';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'のにクラ参加申請フォーム',
  description: '2024年8月～9月に開催する、のにクラ シーズン2の参加申請を行えます。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <body className={notoSansJP.className}>
        <Provider>
          <main>{children}</main>
          <Toaster position='bottom-right' />
        </Provider>
      </body>
    </html>
  );
}
