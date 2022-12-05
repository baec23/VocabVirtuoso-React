import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Check, Dash, X} from "react-bootstrap-icons";

export default function RecentResultsIndicator({recentResults}) {
    return (
        <div className="row">
            {recentResults.map((recentResult, index) => {
                switch(recentResult){
                    case 0:
                        return <div className="col" key={index}><Dash size="90%"/></div>
                    case 1:
                        return <div className="col" key={index}><Check className="text-success" size="90%"/></div>
                    case -1:
                        return <div className="col" key={index}><X className="text-danger" size="90%"/></div>
                    default:
                        return <div className="col" key={index}><Dash/></div>
                }
            })}
        </div>
    );
}