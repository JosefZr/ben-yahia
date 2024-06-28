import { useEffect, useState } from 'react'
import { getUserCredantials } from '../api/profileApi';
import { useQuery } from 'react-query';

export default function useUserId() {
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    
        useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            setUserId(id);
        }
        }, []);
    
        const { isLoading, isError, data, error } = useQuery(
        ["user", userId],
        () => getUserCredantials({ userId }),
        {
            enabled: !!userId,
            onSuccess: (data) => {
            if (data.length > 0) {
                setUserInfo(data[0]); // Assuming only one user is returned
            }
            },
        }
    );
    return{userInfo,isLoading,isError}
}
