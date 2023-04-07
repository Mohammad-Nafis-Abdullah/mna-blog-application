/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';
import RequireAuth from '@/components/RequireAuth';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// import ReactQuill from 'react-quill';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import auth from '../../../firebase.init';
import useFirebaseFileStorage, { imgUrl } from '@/hooks/useFirebaseFileStorage';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditBlog = () => {
    const [value, setValue] = useState('');
    const [user, loading] = useAuthState(auth);
    const [img, setImg] = useState(undefined);
    const [err, setErr] = useState(false);
    const { uploadImage, deleteImage } = useFirebaseFileStorage();
    const { register, handleSubmit, reset, setValue: setInput, clearErrors, formState: { errors } } = useForm();
    const router = useRouter();
    const { id } = router.query;
    const [blog, setBlog] = useState({});
    const [refetcher, setRefetcher] = useState(false);
    // console.log(id);
    // console.log(blog);

    useEffect(() => {
        axios.get(`https://mna-blog-application.vercel.app/api/blogs?id=${id}`).then(({ data }) => {
            setBlog(data);
            setInput('title', data.title);
            setValue(data.details);
            // console.log(data);
        })
    }, [id, refetcher]);


    const modules = {
        toolbar: [
            [{ 'header': [false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    };
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
    ];

    const errGenerator = (length) => {
        if (length === 1) {
            setErr(true);
            return;
        }
        setErr(false);
        return;
    }

    if (loading) {
        return <Loading />;
    }

    // form submitting function
    const submitting = async (data) => {

        const newBlog = {
            ...blog,
            title: data.title,
            details: value,
            img: blog?.img
        };

        if (img) {
            await deleteImage(blog?.img);
            const { name } = await uploadImage(img);
            newBlog.img = name;
        }
        const { data: { update } } = await axios.put(`https://mna-blog-application.vercel.app/api/blogs?id=${blog._id}`, newBlog);
        if (update) {
            reset();
            setErr(false);
            setImg(undefined);
            // setValue('');
            clearErrors();
            setRefetcher(prev => !prev);
            toast.success('Blog updated successfully', { theme: 'colored' });
        } else {
            toast.error('Blog upgrading usuccessfull', { theme: 'colored' });
        }
        console.log(newBlog);

    }

    const getPreviewUrl = (file) => {
        if (!file) {
            return '';
        }
        return URL.createObjectURL(file);
    }

    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure to delete the blog?');
        if (!confirm) {
            return;
        }
        const { data } = await axios.delete(`https://mna-blog-application.vercel.app/api/blogs?id=${blog._id}`);
        if (data?.delete) {
            toast.success('Blog deleted successfully', { theme: 'colored' });
            router.push('/');
        } else {
            toast.error('Blog deletion unsuccessfull', { theme: 'colored' });
        }
    }

    return (
        <RequireAuth>
            <Head>
                <title>{blog.title} - Tech Blogs</title>
            </Head>

            <h2 className='font-bold text-center text-xl mt-1 underline decoration-2'>Edit Blog</h2>

            <form className='max-w-lg mx-auto p-3 gap-3 flex flex-col' onSubmit={handleSubmit(submitting)}>

                <label className='space-y-1'>
                    <span className='text-lg font-bold tracking-widest'>Blog Title : *</span>
                    <input
                        {...register('title', {
                            required: "Title is required",
                            pattern: {
                                value: /[A-Za-z]+/i,
                                message: 'Not a valid title'
                            },
                            value: `${blog?.title}`
                        })}
                        className='border-2 p-2 text-lg w-full min-w-0 rounded text-gray-600 font-bold' type="text" />
                    {
                        errors.title &&
                        <p className='text-red-600 text-sm font-bold bg-red-200 p-2 rounded tracking-wider'>{errors.title?.message}</p>
                    }
                </label>

                <label className='space-y-1'>
                    <span className='text-lg font-bold tracking-widest'>Blog Image : *</span>
                    <input
                        {...register('img', { required: false })}
                        accept=".jpg, .jpeg, .png"
                        type="file"
                        onChange={(e) => setImg(e.target.files?.[0])}
                        className='border-2 p-2 text-lg w-full min-w-0 rounded text-gray-600 font-bold' />
                    {
                        errors.img &&
                        <p className='text-red-600 text-sm font-bold bg-red-200 p-2 rounded tracking-wider'>{errors.img?.message}</p>
                    }
                    {
                        img ?
                            <img src={getPreviewUrl(img)} alt="" className='mx-auto h-40 w-full object-scale-down' /> :
                            <img src={imgUrl(blog?.img)} alt="" className='mx-auto h-40 w-full object-scale-down' />
                    }
                </label>

                <section className='w-full h-[17.5rem] space-y-1'>
                    <span className='text-lg font-bold tracking-widest'>Blog Details : *</span>
                    {
                        err &&
                        <p className='text-red-600 text-sm font-bold bg-red-200 p-2 rounded tracking-wider'>Details is required</p>
                    }
                    <ReactQuill value={value} onChange={(content, delta, source, editor) => {
                        setValue(content);
                        errGenerator(editor.getLength());
                    }} modules={modules} formats={formats} style={{
                        minHeight: '10rem',
                        height: '10rem'
                    }} />
                </section>

                <section className='flex justify-around'>
                    <input className='px-5 py-1 rounded-lg self-center border-2 font-bold bg-gray-900 text-white tracking-wider cursor-pointer active:scale-95 ' type="submit" value="Publish" />
                    <button
                        onClick={handleDelete}
                        className='px-5 py-1 rounded-lg self-center border-2 font-bold bg-red-500 text-white tracking-wider cursor-pointer active:scale-95'>
                        Delete
                    </button>
                </section>
            </form>

        </RequireAuth>
    );
};

export default EditBlog;