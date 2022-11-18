import React, {useEffect} from 'react';

const BulkListInput = ({bulkInput, onBulkInputChanged}) => {

    return (
        <div className="container p-2">
            <label className="form-label">Vocabulary</label>
            <textarea
                className="form-control no-resize"
                value={bulkInput}
                rows="10"
                onChange={
                    (e) => onBulkInputChanged(e.target.value)
                }/>
        </div>
    );
};

export default BulkListInput;
