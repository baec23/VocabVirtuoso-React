import PropTypes from "prop-types";

const VocabListSelector = ({vocabLists, onVocabListSelected, onStartClicked}) => {
    return (
        <div className="row mt-4 mb-4 ms-auto me-auto">
            <select className="form-select"
                    onChange={(e) => {
                        onVocabListSelected(e.target.value);
                    }}>
                {vocabLists.map((vocabList, index) => (
                    <option key={vocabList.id} value={index}>{vocabList.name}</option>
                ))}
            </select>
            <button className="btn btn-primary mt-2" onClick={() => {
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