import Modal from '@/components/Modal';
import '@/styles/globals.css';
import { Nunito_Sans } from "next/font/google";
import Link from 'next/link';

const nunito = Nunito_Sans({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }) {
  return (
    <main className={nunito.className}>
      <div className='flex justify-center text-3xl py-3 shadow'>
        <Link href='/' className='font-bold text-center cursor-pointer hover:underline'>Tech Blogs</Link>
      </div>
      <Component {...pageProps} />
      <Modal/>
    </main>
  )
}
