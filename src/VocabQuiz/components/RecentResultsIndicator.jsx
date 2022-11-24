import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Check, Dash, X} from "react-bootstrap-icons";

export default function RecentResultsIndicator({recentResults}) {
    return (
        <div className="row">
            {recentResults.map((recentResult) => {
                switch(recentResult){
                    case 0:
                        return <div className="col"><Dash size="90%"/></div>
                    case 1:
                        return <div className="col"><Check className="text-success" size="90%"/></div>
                    case -1:
                        return <div className="col"><X className="text-danger" size="90%"/></div>
                    default:
                        return <div className="col"><Dash/></div>
                }
            })}
        </div>
    );
}