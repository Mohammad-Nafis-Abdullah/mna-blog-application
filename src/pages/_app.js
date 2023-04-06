/* eslint-disable react-hooks/exhaustive-deps */
import Loading from '@/components/Loading';
import '@/styles/globals.css';
import { Nunito_Sans } from "next/font/google";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import auth from '../../firebase.init';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const nunito = Nunito_Sans({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [signOut, outLoading, outError] = useSignOut(auth);

  useEffect(()=> {
      if (!user && !loading) {
        router.push('/');
      }
  },[user,loading]);


  if(loading||outLoading){
    return <Loading/>
  }

  if (error||outError) {
    alert(error.message);
  }

  const handlesignOut = async()=> {
      await signOut();
  }

  return (
    <main className={nunito.className}>
      <div className='flex justify-between lg:justify-center py-3 px-3 lg:px-5 shadow max-w-[85rem] mx-auto'>
        <Link href='/' className='font-bold text-center text-2xl lg:text-3xl cursor-pointer hover:underline lg:grow'>Tech Blogs</Link>
        {
          !user?
        <button
          onClick={()=> {
              router.push('/login','/');
          }}
          className='font-bold inline-flex items-center gap-1 active:scale-95 bg-green-500 rounded text-white px-3'>
          <BiLogIn />
          <span className='tracking-wider'>Login</span>
        </button>:
        <button onClick={handlesignOut} className='bg-red-500 font-bold inline-flex items-center gap-1 active:scale-95 rounded text-white px-3'>
          <BiLogOut />
          <span className='tracking-wider'>Logout</span>
        </button>
        }
      </div>
      <Component {...pageProps} />
      <ToastContainer/>
    </main>
  )
}
