import Link from 'next/link';
import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

const BlogCard = ({ post }) => {
    return (
        <Link href={`/blog/${post}`} className='basis-80 grow shrink h-48 border-2 rounded transition-transform cursor-pointer bg-center bg-no-repeat hover:ring-2 blog-card' style={{
            backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/111/745/193/reactjs-javascript-programming-programming-language-hd-wallpaper-preview.jpg)'
        }}>
            <section className='flex flex-col justify-between p-3 bg-black/30 h-full'>
                <h3 className='font-semibold text-lg nunito text-gray-400'>Blog Title</h3>
                <p className='h-24 w-full overflow-hidden text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate debitis labore, optio tempore quam alias molestiae, libero quis, error adipisci nesciunt incidunt harum nostrum soluta inventore. Magni vitae culpa quos nisi libero. Aliquam, excepturi itaque labore dolore necessitatibus, deserunt quae nulla recusandae, animi nisi soluta maxime earum facilis voluptate adipisci?</p>
                <span className='underline underline-offset-2 text-sky-600 font-bold'>Read More <FaLongArrowAltRight className='inline h-5 w-5 ml-2' /></span>
            </section>
        </Link>
    );
};

export default BlogCard;