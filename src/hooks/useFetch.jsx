import {useContext, useEffect, useState} from "react";
import {LoginStateContext} from "../AuthWrapper";

const useFetch = (url, onComplete) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const authContext = useContext(LoginStateContext);
    const loginState = authContext.loginState;

    useEffect(() => {
        setTimeout(() => {
            fetch(url, {
                headers: {"Content-Type": "application/json",
                    "Authorization": "Bearer " + loginState.access_token}
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