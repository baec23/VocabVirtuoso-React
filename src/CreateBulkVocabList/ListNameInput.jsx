import React from 'react';

const ListNameInput = ({listName, onListNameChanged}) => {
    return (
        <div className="container p-2">
            <label className="form-label">List Name</label>
            <input
                type="text"
                className="form-control"
                value={listName}
                onChange={(e) => onListNameChanged(e.target.value)}/>
        </div>
    );
};

export default ListNameInput;
