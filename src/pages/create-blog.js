/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import React, { useState } from 'react';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';

const CreatePost = () => {
    const [value, setValue] = useState('');
    const [err, setErr] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
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

    const errGenerator = (text='')=> {
        if (!text) {
            setErr(true);
            return;
        }
        setErr(false);
        return;
    }

    // form submitting function
    const submitting = (data)=> {
        if (!value) {
            setErr(true);
            return;
        }
        const blog = {...data,detail:value};
        console.log(blog);
    }

    return (
        <>
            <Head>
                <title>Create Blog - Tech Blogs</title>
            </Head>

            <h2 className='font-bold text-center text-xl mt-1 underline decoration-2'>Create New Blog</h2>

            <form className='max-w-lg mx-auto p-3 gap-3 flex flex-col' onSubmit={handleSubmit(submitting)}>
                
                <label className='space-y-1'>
                    <span className='text-lg font-bold tracking-widest'>Blog Title : *</span>
                    <input
                        {...register('title', { required: "Title is required", pattern: /[A-Za-z]+/i })}
                        className='border-2 p-2 text-lg w-full min-w-0 rounded text-gray-600 font-bold' type="text"/>
                    {
                        errors.title && 
                        <p className='text-red-600 text-sm font-bold bg-red-200 p-2 rounded tracking-wider'>{errors.title?.message}</p>
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
                        errGenerator(editor.getText());
                    }} modules={modules} formats={formats} style={{
                        minHeight: '10rem',
                        height: '10rem'
                    }} />
                </section>

                <input className='px-5 py-1 rounded-lg self-center border-2 font-bold bg-gray-900 text-white tracking-wider cursor-pointer active:scale-95 ' type="submit" value="Publish"/>
            </form>

            
            {/* <div dangerouslySetInnerHTML={{__html: value}}></div> */}
        </>
    );
};

export default CreatePost;