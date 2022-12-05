const LinkedVocabList = ({header, inputText, onInputTextChanged}) => {

    return (
        <div className="container p-2">
            <label className="form-label">{header}</label>
            <textarea
                className="form-control no-resize"
                value={inputText}
                rows="10"
                onChange={
                    (e) => onInputTextChanged(e.target.value)
                }/>
        </div>
    );
};
export default LinkedVocabList;
