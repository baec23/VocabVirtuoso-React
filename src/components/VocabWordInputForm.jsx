import {useState} from "react";
import PropTypes from "prop-types";

const VocabWordInputForm = ({index, baseWord, definition: def, onBaseChanged, onDefinitionChanged}) => {
    const [base, setBase] = useState(baseWord);
    const [definition, setDefinition] = useState(def);

    return (
        <div className="input-group">
            <input type="text" className="form-control" value={base}
                   onChange={(e) => {
                       setBase(e.target.value);
                       onBaseChanged(e.target.value);
                   }}/>
            <input type="text" className="form-control" value={definition}
                   onChange={(e) => {
                       setDefinition(e.target.value);
                       onDefinitionChanged(e.target.value);
                   }}/>
        </div>);
}

VocabWordInputForm.propTypes = {
    index: PropTypes.number,
    baseWord: PropTypes.string,
    definition: PropTypes.string,
    onBaseChanged: PropTypes.func,
    onDefinitionChanged: PropTypes.func
}

export default VocabWordInputForm;