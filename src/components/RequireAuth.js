import { useRouter } from 'next/router';


const RequireAuth = ({children}) => {
    const router = useRouter();
    const {pathname} = router;
    
    const user = false;

    if (!user) {
        router.push('/login',pathname);
        return;
    }


    return children;
};

export default RequireAuth;