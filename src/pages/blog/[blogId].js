/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Head from 'next/head';
import React from 'react';

const arr = [1,2,3,4,5,6];

const SinglePost = ({blog}) => {
    return (
        <>
            <Head>
                <title>{blog.title} - Tech Blogs</title>
            </Head>
            <section className='flex flex-wrap gap-5 justify-center items-start max-w-6xl mx-auto px-3 pt-5 sm:pt-10 pb-5'>
                
                <article className='basis-96 grow-[2] space-y-3'> {/* blog details element */}
                    <img
                        className='max-w-sm w-full mx-auto'
                        src={blog.img}
                        alt={'Blogs'} />
                    <h3 className='font-bold text-2xl tracking-wider'>{blog.title}</h3>
                    <p className='text-gray-600 font-semibold overflow-y-auto h-72'>{blog.details}</p>
                </article>
                
                <div className='basis-80 grow'> {/* comments element */}

                    <h4 className='font-bold text-lg shadow'>Comments</h4>
                    
                    <section className='overflow-y-auto h-[23rem] space-y-2 p-1 snap-y scroll-smooth'>
                        {
                            arr.map((comment,i)=>(
                                <div key={i} className="border-2 h-[7.2rem] rounded-md snap-normal snap-start p-1 flex flex-col gap-0.5">
                                    <div className='inline-flex gap-2 items-center font-bold text-sm'>
                                        <img
                                            className='w-10 h-10 rounded-full'
                                            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" />
                                        <h4>Mr. User</h4>
                                    </div>
                                    <p className='text-xs text-gray-600 overflow-y-auto px-0.5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum neque, eligendi qui accusantium vero tempora. Eveniet vel excepturi nam perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Et earum quia quisquam laudantium nam ducimus rerum a omnis voluptates voluptatum.</p>
                                </div>
                            ))
                        }
                    </section>
                    
                    <section className='h-40 p-2 bg-gray-950 rounded-sm flex flex-col justify-between'> {/* write a comment element */}
                        <h4 className='font-bold text-lg text-white'>Write a Comment</h4>
                        <textarea name="" id="" className='w-full h-20 rounded-sm resize-none overflow-y-auto text-xs p-1 font-bold text-gray-700'></textarea>
                        <button className='border-2 self-end px-5 rounded text-white font-semibold cursor-pointer'>Submit</button>
                    </section>

                </div>

            </section>
        </>
    );
};

export default SinglePost;



export async function getServerSideProps(context) {
    const {blogId} = context.query;
    console.log(blogId);
    const blog = await axios.get(`http://localhost:3000/api/blogs?id=${blogId}`);

    return {
        props:{
            blog:blog.data,
            comments:[]
        }
    }
}