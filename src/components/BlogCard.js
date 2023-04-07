import { imgUrl } from '@/hooks/useFirebaseFileStorage';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaLongArrowAltRight, FaRegEdit } from 'react-icons/fa';

const BlogCard = ({ blog, userId }) => {
    const [user, setUser] = useState({});
    // console.log(blog._id);

    useEffect(() => {
        async function getUser() {
            const { data } = await axios.get(`https://mna-blog-application.vercel.app/api/users?id=${userId}`);
            setUser(data);
        };
        getUser();
    }, [userId]);

    return (
        <section className='basis-96 grow shrink h-48 border-2 rounded transition-transform cursor-pointer bg-center bg-cover bg-no-repeat hover:ring-2 relative' style={{
            backgroundImage: `url(${imgUrl(blog.img)})`
        }}>
            {
                (userId === blog.authorId || user?.role) &&
                <Link href={`/edit-blog/${blog._id}`} className='absolute top-0 right-0 px-4 py-2 inline-flex rounded-bl-2xl bg-indigo-500 text-white font-bold items-center gap-1 z-[999] hover:bg-indigo-800'>
                    <FaRegEdit />
                    <span className='tracking-wider'>Edit</span>
                </Link>
            }
            <Link href={`/blog/${blog._id}`} className='blog-card flex flex-col justify-between p-3 bg-black/80 h-full'>
                <h3 className='font-semibold text-xl nunito text-indigo-400 tracking-wider'>{blog.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: blog.details }} className='h-24 w-full overflow-hidden text-gray-500' />
                <span className='underline underline-offset-2 text-sky-600 font-bold'>Read More <FaLongArrowAltRight className='inline h-5 w-5 ml-2' /></span>
            </Link>
        </section>
    );
};

export default BlogCard;