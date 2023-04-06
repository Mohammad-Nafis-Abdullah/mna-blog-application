/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useRefetch = (url, initialValue = [], callback = () => 0) => {
    const [data, setData] = useState(initialValue);
    const [link, setLink] = useState(url);
    const [refetcher, setRefetch] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!url) {
            return;
        };
        setLoading(true);
        axios.get(link)
            .then(({ data }) => {
                setData(data);
                callback(data);
                setLoading(false);
            });

    }, [refetcher, link]);

    return {
        data,
        loading,
        refetch: (URL) => {
            if (URL) {
                setLink(URL);
            }
            setLoading(true);
            setRefetch((previous) => !previous);
            return;
        },
    };
};

export default useRefetch;