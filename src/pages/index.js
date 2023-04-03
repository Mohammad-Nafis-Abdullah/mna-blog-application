import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'


const arr = [1,2,3,4,5,6];

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Tech Blogs</title>
      </Head>

      <section className='flex flex-wrap gap-5 justify-center max-w-6xl mx-auto px-3 pt-5 sm:pt-16 pb-5'>
        {
          arr.map((post, i) => (
            <Link href={`/post/${post}`} key={i} className='basis-80 grow shrink h-48 p-3 border-2 rounded hover:shadow-lg hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between bg-center bg-no-repeat' style={{
              backgroundImage:'url(https://c4.wallpaperflare.com/wallpaper/111/745/193/reactjs-javascript-programming-programming-language-hd-wallpaper-preview.jpg)'
            }}>
              <h3 className='font-semibold text-lg nunito'>Blog Title</h3>
              <p className='h-24 w-full overflow-hidden'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate debitis labore, optio tempore quam alias molestiae, libero quis, error adipisci nesciunt incidunt harum nostrum soluta inventore. Magni vitae culpa quos nisi libero. Aliquam, excepturi itaque labore dolore necessitatibus, deserunt quae nulla recusandae, animi nisi soluta maxime earum facilis voluptate adipisci?</p>
              <p className='underline underline-offset-2 text-sky-600 font-bold'>Read More --{'>'}</p>
            </Link>
          ))
        }
      </section>
    </>
  )
}
