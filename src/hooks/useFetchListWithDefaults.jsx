import {useContext, useEffect, useState} from "react";
import {LoginStateContext} from "../AuthWrapper";

const useFetchListWithDefaults = (url, startDefaults) => {
    const [isPending, setIsPending] = useState(true);
    const [resultData, setResultData] = useState(null);
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