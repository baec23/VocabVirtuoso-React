import 'bootstrap/dist/css/bootstrap.css';

import React from "react";

const TwoColumnVocabListInput = ({input1, input2, onInput1Changed, onInput2Changed}) => {

    return (
        <div className="container p-2">
            <div className="row">
                <div className="col">
                    <label className="form-label">List 1</label>
                    <textarea
                        className="form-control no-resize"
                        value={input1}
                        rows="10"
                        onChange={
                            (e) => onInput1Changed(e.target.value)
                        }/>
                </div>
                <div className="col">
                    <label className="form-label">List 2</label>
                    <textarea
                        className="form-control no-resize"
                        value={input2}
                        rows="10"
                        onChange={
                            (e) => onInput2Changed(e.target.value)
                        }/>
                </div>
            </div>
        </div>
    );
}

export default TwoColumnVocabListInput;