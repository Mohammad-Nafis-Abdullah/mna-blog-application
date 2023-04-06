/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import React, { useState } from 'react';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import RequireAuth from '@/components/RequireAuth';
import useFirebaseFileStorage from '@/hooks/useFirebaseFileStorage';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '@/components/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

const defaultImg = '1680739611531-react-blog.jpg';

const CreatePost = () => {
    const [value, setValue] = useState('');
    const [user,loading] = useAuthState(auth);
    const [img, setImg] = useState(undefined);
    const [err, setErr] = useState(false);
    const {uploadImage} = useFirebaseFileStorage();
    const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm();

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

    const errGenerator = (length)=> {
        if (length===1) {
            setErr(true);
            return;
        }
        setErr(false);
        return;
    }

    if (loading) {
        return <Loading/>;
    }

    // form submitting function
    const submitting = async (data)=> {
        // console.log(value,err);
        if (!value || err) {
            // setErr(true);
            return;
        }
        const newBlog = {
            title:data.title,
            details:value,
            authorId: user?.uid,
            img:defaultImg
        };

        if (img) {
            const {name} = await uploadImage(img);
            newBlog.img=name;
        }
        const {data:{inserted}} = await axios.post('http://localhost:3000/api/blogs',newBlog);
        if (inserted) {
            reset();
            setErr(false);
            setImg(undefined);
            setValue('');
            clearErrors();
            toast.success('New blog inserted successfully',{theme:'colored'});
        } else {
            toast.error('Blog insertion unsuccessfull',{theme:'colored'});
        }

    }

    const getPreviewUrl = (file)=> {
        if (!file) {
            return '';
        }
        return URL.createObjectURL(file);
    }

    return (
        <RequireAuth>
            <Head>
                <title>Create Blog - Tech Blogs</title>
            </Head>

            <h2 className='font-bold text-center text-xl mt-1 underline decoration-2'>Create New Blog</h2>

            <form className='max-w-lg mx-auto p-3 gap-3 flex flex-col' onSubmit={handleSubmit(submitting)}>
                
                <label className='space-y-1'>
                    <span className='text-lg font-bold tracking-widest'>Blog Title : *</span>
                    <input
                        {...register('title', { required: "Title is required", pattern:{
                            value:/[A-Za-z]+/i,
                            message:'Not a valid title'
                        } })}
                        className='border-2 p-2 text-lg w-full min-w-0 rounded text-gray-600 font-bold' type="text"/>
                    {
                        errors.title && 
                        <p className='text-red-600 text-sm font-bold bg-red-200 p-2 rounded tracking-wider'>{errors.title?.message}</p>
                    }
                </label>

                <label className='space-y-1'>
                    <span className='text-lg font-bold tracking-widest'>Blog Image : *</span>
                    <input
                        {...register('img',{ required:false })}
                        accept=".jpg, .jpeg, .png"
                        type="file"
                        onChange={(e)=> setImg(e.target.files?.[0])}
                        className='border-2 p-2 text-lg w-full min-w-0 rounded text-gray-600 font-bold' />
                    {
                        errors.img && 
                        <p className='text-red-600 text-sm font-bold bg-red-200 p-2 rounded tracking-wider'>{errors.img?.message}</p>
                    }
                    {
                        img &&
                        <img src={getPreviewUrl(img)} alt="" className='mx-auto h-40 w-full object-scale-down' />
                    }
                </label>

                <section className='w-full h-[17.5rem] space-y-1'>
                    <span className='text-lg font-bold tracking-widest'>Blog Details : *</span>
                    {
                        err && 
                        <p className='text-red-600 text-sm font-bold bg-red-200 p-2 rounded tracking-wider'>Details is required</p>
                    }
                    <ReactQuill value={value} onChange={(content,delta,source,editor) => {
                        setValue(content);
                        errGenerator(editor.getLength());
                    }} modules={modules} formats={formats} style={{
                        minHeight: '10rem',
                        height: '10rem'
                    }} />
                </section>

                <input className='px-5 py-1 rounded-lg self-center border-2 font-bold bg-gray-900 text-white tracking-wider cursor-pointer active:scale-95 ' type="submit" value="Publish"/>
            </form>

            
            {/* <div dangerouslySetInnerHTML={{__html: value}}></div> */}
        </RequireAuth>
    );
};

export default CreatePost;