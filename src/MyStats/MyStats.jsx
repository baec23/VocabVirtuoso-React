import React, {useContext, useEffect, useState} from 'react';
import api from '../api/userStats';
import {LoginStateContext} from "../AuthWrapper";

export default function MyStats() {

    const [userStats, setUserStats] = useState();
    const authContext = useContext(LoginStateContext);
    const loginState = authContext.loginState;
    const requestParams = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.access_token
        },
        params: {
            username: loginState.username
        }
    }

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/stats', requestParams);
                setUserStats(response.data);
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchStats();
    }, []);

    return (
        <div>
            <h2>Learned Words</h2>
            {userStats &&
                <ul>
                    {
                        userStats.learnedWordsByLanguage['ENGLISH'].map((learnedWord) => (
                            <li key={learnedWord}>
                                {learnedWord}
                            </li>))}
                </ul>
            }
            <h2>Unlearned Words</h2>
            {userStats &&
                <ul>
                    {
                        userStats.unlearnedWordsByLanguage['ENGLISH'].map((unlearnedWord) => (
                            <li key={unlearnedWord}>
                                {unlearnedWord}
                            </li>))}
                </ul>
            }
        </div>
    );
}