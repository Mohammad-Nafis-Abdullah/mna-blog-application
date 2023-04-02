import { useRouter } from 'next/router';
import React from 'react';

const SinglePost = () => {
    const { query:{postId} } = useRouter();
    return (
        <div>
            <h2 className='text-3xl font-bold text-center my-5'>Single Post with Id : {postId}</h2>
        </div>
    );
};

export default SinglePost;