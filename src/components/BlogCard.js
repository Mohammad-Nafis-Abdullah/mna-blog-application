import Link from 'next/link';
import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
    return (
        <Link href={`/blog/${blog._id}`} className='basis-80 grow shrink h-48 border-2 rounded transition-transform cursor-pointer bg-center bg-cover bg-no-repeat hover:ring-2 blog-card' style={{
            backgroundImage: `url(${blog.img})`
        }}>
            <section className='flex flex-col justify-between p-3 bg-black/30 h-full'>
                <h3 className='font-semibold text-lg nunito text-gray-400'>{blog.title}</h3>
                <p className='h-24 w-full overflow-hidden text-gray-600'>{blog.details}</p>
                <span className='underline underline-offset-2 text-sky-600 font-bold'>Read More <FaLongArrowAltRight className='inline h-5 w-5 ml-2' /></span>
            </section>
        </Link>
    );
};

export default BlogCard;