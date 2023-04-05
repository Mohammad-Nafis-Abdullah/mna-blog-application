/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { IoCreate } from 'react-icons/io5';
import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function Home({blogs}) {
  const [text,setText] = useState('');
  const router = useRouter();

  useEffect(()=> {
      router.push({
        pathname:'/',
        query:{
          title:text,
        }
      },'/');
  },[text])

  return (
    <>
      <Head>
        <title>Home - Tech Blogs</title>
      </Head>

      <section className='flex flex-wrap gap-5 justify-center max-w-6xl mx-auto px-3 pt-5 sm:pt-10 pb-5'>

        <div className='basis-full flex flex-col lg:flex-row lg:items-center gap-5 justify-between'>

          <label htmlFor="myPost" className='inline-flex gap-2 items-center pt-1 cursor-pointer order-2 lg:order-none'>
            <input type="checkbox" className='h-5 w-5' name="" id="myPost" />
            <span className='font-bold select-none'>My Blogs</span>
          </label>

          <div className='inline-flex rounded overflow-hidden grow lg:max-w-sm order-1 lg:order-none'>
            <span className='font-bold tracking-wider px-2 bg-gray-900 leading-9 text-white'>Search</span>
            <input onChange={(e)=> {
                setText(e.target.value);
            }} type="text" className='min-w-0 w-full p-1.5 border-2 border-gray-600 font-bold text-gray-600' name="" />
          </div>

          <Link href='/create-blog' className='inline-flex items-center hover:underline decoration-2 underline-offset-2 order-2 lg:order-none'>
            <IoCreate className='w-8 h-8' />
            <span className='tracking-widest font-bold pt-1'>Create a New Blog</span>
          </Link>
        </div>
        {
          blogs.map((blog, i) => (
            <BlogCard key={i} blog={blog} />
          ))
        }
      </section>
    </>
  )
}


export async function getServerSideProps(context) {
  const {title} = context.query;
  const blogs = await axios.get(`http://localhost:3000/api/blogs?title=${title}`);

  return {
    props: {
      blogs:blogs.data
    }
  }
};