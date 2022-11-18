import {useEffect, useState} from "react";

const useFetchListWithDefaults = (url, startDefaults) => {
    const [isPending, setIsPending] = useState(true);
    const [resultData, setResultData] = useState(null);

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
                    setIsPending(false);
                    setResultData([...startDefaults, ...data]);
                })
                .catch(error => {
                    setIsPending(false);
                })
        }, 50);
    }, [url]);
    return {resultData, isPending};
}
export default useFetchListWithDefaults;