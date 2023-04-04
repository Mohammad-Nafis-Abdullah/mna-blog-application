import Head from 'next/head'
import { IoCreate } from 'react-icons/io5';
import Link from 'next/link'
import BlogCard from '@/components/BlogCard'


const arr = [1,2,3,4,5,6];

export default function Home() {
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
            <input type="text" className='min-w-0 w-full p-1.5 border-2 border-gray-600 font-bold text-gray-600' name=""/>
          </div>

          <Link href='/create-blog' className='inline-flex items-center hover:underline decoration-2 underline-offset-2 order-2 lg:order-none'>
            <IoCreate className='w-8 h-8'/>
            <span className='tracking-widest font-bold pt-1'>Create a New Blog</span>
          </Link>
        </div>
        {
          arr.map((post, i) => (
            <BlogCard key={i} post={post}/>
          ))
        }
      </section>
    </>
  )
}
