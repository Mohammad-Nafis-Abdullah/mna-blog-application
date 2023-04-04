import LoginForm from '@/components/LoginForm';
import Modal, { openModal } from '@/components/Modal';
import '@/styles/globals.css';
import { Nunito_Sans } from "next/font/google";
import Link from 'next/link';
import { BiLogIn } from 'react-icons/bi';

const nunito = Nunito_Sans({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }) {
  return (
    <main className={nunito.className}>
      <div className='flex justify-between lg:justify-center py-3 px-3 lg:px-5 shadow max-w-[85rem] mx-auto'>
        <Link href='/' className='font-bold text-center text-2xl lg:text-3xl cursor-pointer hover:underline lg:grow'>Tech Blogs</Link>
        <button
          onClick={()=>openModal(<LoginForm/>)}
          className='font-bold inline-flex items-center gap-1 active:scale-95 bg-gray-950 rounded text-white px-3'>
          <BiLogIn />
          <span className='tracking-wider'>Login</span>
        </button>
      </div>
      <Component {...pageProps} />
      <Modal />
    </main>
  )
}
