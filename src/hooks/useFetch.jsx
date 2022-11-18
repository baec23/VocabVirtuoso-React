import {useEffect, useState} from "react";

const useFetch = (url, onComplete) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url, {
                headers: {"Content-Type": "application/json", "Origin": "https://main.d32nyo45vjymyt.amplifyapp.com", "X-Requested-With": "XMLHttpRequest"}
            })
                .then(res => {
                    if (!res.ok) {
                        throw Error("Could not fetch data");
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                    if(onComplete != null)
                        onComplete(data);
                })
                .catch(error => {
                    setIsPending(false);
                    setError(error.message);
                })
        }, 50);
    }, [url]);
    return {data, isPending, error};
}
export default useFetch;