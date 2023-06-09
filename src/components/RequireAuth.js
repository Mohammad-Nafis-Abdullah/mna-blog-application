/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const RequireAuth = ({children}) => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);

    useEffect(()=> {
        if (!user && !loading) {
            router.push('/login');
            return;
        }
    },[user,loading])

    if(user) {
        return children;
    }
};

export default RequireAuth;