/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const RequireAuth = ({children}) => {
    const router = useRouter();
    const {pathname} = router;
    const [user] = useAuthState(auth);

    useEffect(()=> {
        if (!user) {
            router.push('/login',pathname);
            return;
        }
    },[router,user])

    if(user) {
        return children;
    }
};

export default RequireAuth;