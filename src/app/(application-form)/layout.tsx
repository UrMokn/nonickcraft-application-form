import { Navbar } from '@/components/navbar';
import Image from 'next/image';
import type { ReactNode } from 'react';
import banner from '../../../public/banner.png';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className='container max-w-screen-md flex flex-col gap-6'>
        <Image src={banner} alt='バナー画像' className='rounded-lg' priority />
        <section className='space-y-1'>
          <h1 className='max-sm:text-2xl text-3xl font-black'>UrMoknCraft参加申請フォーム</h1>
          <h2 className='max-sm:text-sm text-default-500'>
            UrMoknCraftへの参加申請を行えます。
          </h2>
        </section>
        {children}
      </div>
    </>
  );
}
