import PropTypes from "prop-types";

const VocabListSelector = ({vocabLists, onVocabListSelected, onStartClicked}) => {
    return (
        <div className="row gy-2">
            <select className="form-select"
                    onChange={(e) => {
                        onVocabListSelected(e.target.value);
                    }}>
                {vocabLists.map((vocabList, index) => (
                    <option key={vocabList.id} value={index}>{vocabList.name}</option>
                ))}
            </select>
            <button className="btn btn-primary" onClick={() => {
                onStartClicked();
            }}>Start Quiz
            </button>
        </div>);
}

VocabListSelector.propTypes = {
    vocabListsIn: PropTypes.array,
    onVocabListSelected: PropTypes.func
}

export default VocabListSelector;