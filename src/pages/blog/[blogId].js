/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Loading from '@/components/Loading';
import { imgUrl } from '@/hooks/useFirebaseFileStorage';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useRefetch from '@/hooks/useRefetch';


const SinglePost = ({ blog }) => {
    const [user, loading] = useAuthState(auth);
    const {data:comments,loading:dataLoading,refetch} = useRefetch(`http://localhost:3000/api/comments?blogId=${blog._id}`,[]);
    const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm();

    // console.log(comments);

    const submitting = async (data) => {
        if (!user) {
            toast.error('Please login first to comment', { theme: 'colored' });
            return;
        }

        const newComment = {
            ...data,
            userEmail: user.email,
            userId: user.uid,
            submitTime: Date().toLocaleString()
        }
        const { data: { inserted } } = await axios.post(`http://localhost:3000/api/comments?blogId=${blog._id}`, newComment);
        if (inserted) {
            refetch();
            toast.success('Comment submitted successfully', { theme: 'colored' });
        } else {
            toast.error('Comment submition unsuccessfull', { theme: 'colored' });
        }
        reset();
        clearErrors();
        return;
    }

    return (
        <>
            <Head>
                <title>{blog.title} - Tech Blogs</title>
            </Head>
            <section className='flex flex-wrap gap-5 justify-center items-start max-w-6xl mx-auto px-3 pt-5 sm:pt-10 pb-5'>
            {(loading || dataLoading) && <Loading />}
                <article className='basis-96 grow-[2] space-y-3'> {/* blog details element */}
                    <img
                        className='max-w-sm w-full mx-auto'
                        src={imgUrl(blog.img)}
                        alt={'Blogs'} />
                    <h2 className='font-bold text-gray-800 text-2xl tracking-wider'>{blog.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: blog.details }} className='text-gray-600 font-semibold overflow-y-auto h-72' />
                </article>

                <div className='basis-80 grow'> {/* comments element */}

                    <h4 className='font-bold text-lg shadow'>Comments</h4>

                    <section className='overflow-y-auto h-[23rem] space-y-2 p-1 snap-y scroll-smooth'>
                        {
                            comments?.map((comment) => (
                                <div key={comment.userId} className="border-2 h-[7.2rem] rounded-md snap-normal snap-start p-1 flex flex-col justify-around">
                                    <div className='inline-flex gap-2 items-center pl-3'>
                                        <img
                                            className='w-10 h-10 rounded-full'
                                            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" />
                                        <article>
                                            <h5 className='text-base font-semibold'>{comment.userEmail}</h5>
                                            <p className='text-xs text-gray-600 overflow-y-auto'>{comment.submitTime.split('(')[0]}</p>
                                        </article>
                                    </div>
                                    <p className='text-xs text-gray-700 h-12 overflow-y-auto pl-5 pr-3 italic font-bold text-center'> <span className='text-2xl'>&ldquo;</span> {comment.details} <span className='text-2xl'>&rdquo;</span></p>
                                </div>
                            ))
                        }
                    </section>
                    {
                        errors.details &&
                        <p className='text-red-600 text-sm font-bold bg-red-200 p-2 rounded tracking-wider'>{errors.details?.message}</p>
                    }
                    <form onSubmit={handleSubmit(submitting)} className='h-40 p-2 bg-gray-950 rounded-sm flex flex-col justify-between'> {/* write a comment element */}
                        <h4 className='font-bold text-lg text-white'>Write a Comment</h4>
                        <textarea
                            {...register('details', { required: 'Comment box could not be empty' })}
                            className='w-full h-20 rounded-sm resize-none overflow-y-auto text-xs p-1 font-bold text-gray-700'>
                        </textarea>
                        <input type='submit' className='border-2 self-end px-5 rounded text-white font-semibold cursor-pointer active:scale-95' value='Submit' />
                    </form>

                </div>

            </section>
        </>
    );
};

export default SinglePost;



export async function getServerSideProps(context) {
    const { blogId } = context.query;
    const blog = await axios.get(`http://localhost:3000/api/blogs?id=${blogId}`);
    
    return {
        props: {
            blog: blog.data,
        }
    }
}