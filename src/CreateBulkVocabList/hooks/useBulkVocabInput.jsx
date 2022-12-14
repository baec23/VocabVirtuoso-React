import {useEffect, useState} from "react";

const useBulkVocabInput = ({listName, inputType, singleListInput, doubleListInput1, doubleListInput2}) => {

    const [isValid, setValid] = useState(false);
    const [error, setError] = useState(null);
    const [baseWords, setBaseWords] = useState([]);
    const [definitions, setDefinitions] = useState([]);
    const [shouldTryParse, setShouldTryParse] = useState(false);
    const [isListNameValid, setListNameValid] = useState(false);
    const [isBulkInputValid, setBulkInputValid] = useState(false);

    function parseSingleListInput() {
        console.log("Parse Single List Input");
        const inputByLines = singleListInput.trim().split("\n");
        const newBaseWords = [];
        const newDefinitions = [];
        for(let i=0; i<inputByLines.length; i++){
            const lineByBaseAndDefinitions = inputByLines[i].trim().split(":");
            if(lineByBaseAndDefinitions.length !== 2){
                setBulkInputValid(false);
                return;
            }
            const baseWord = lineByBaseAndDefinitions[0].trim();
            if(baseWord.length <=0){
                setBulkInputValid(false);
                return;
            }
            const definitionsString = lineByBaseAndDefinitions[1].trim();
            const definitions = definitionsString.split(",");
            if(definitions.length <=0){
                setBulkInputValid(false);
                return;
            }
            for(let j=0; j<definitions.length; j++){
                definitions[j] = definitions[j].trim();
                if(definitions[j].length <=0){
                    setBulkInputValid(false);
                    return;
                }
            }
            newBaseWords.push(baseWord);
            newDefinitions.push(definitions);
        }
        setBaseWords(newBaseWords);
        setDefinitions(newDefinitions);
        setBulkInputValid(true);
    }

    function parseDoubleListInput() {
        console.log("Parse Double List Input");
        const input1ByLines = doubleListInput1.replaceAll("\t", "").replaceAll(".", "").trim().split("\n");
        const input2ByLines = doubleListInput2.replaceAll("\t", "").replaceAll(".", "").trim().split("\n");
        console.log(input1ByLines);
        console.log(input2ByLines);
        if(input1ByLines.length !== input2ByLines.length){
            setBulkInputValid(false);
            return;
        }
        const newBaseWords = [];
        const newDefinitions = [];
        for(let i=0; i<input1ByLines.length; i++){
            newBaseWords.push(input1ByLines[i]);
            newDefinitions.push([input2ByLines[i]]);
        }
        setBaseWords(newBaseWords);
        setDefinitions(newDefinitions);
        setBulkInputValid(true);
    }

    useEffect(() => {
        setShouldTryParse(false);
        const timer = setTimeout(() => setShouldTryParse(true), 1000);
        if (listName == null || listName.length <= 0) {
            setListNameValid(false);
        }
        else{
            setListNameValid(true);
        }
        return () => clearTimeout(timer);
    }, [listName, singleListInput, inputType, doubleListInput1, doubleListInput2]);

    useEffect(() => {
        if(shouldTryParse){
            if(inputType === "Single"){
                parseSingleListInput();
            }
            else if(inputType === "Double"){
                parseDoubleListInput();
            }
        }
    }, [shouldTryParse]);

    useEffect(() => {
        if(isBulkInputValid && isListNameValid){
            setValid(true);
            setError(null);
        }
        else{
            setValid(false);
            if(!isBulkInputValid){
                setError("Error parsing vocabulary list");
            }
            if(!isListNameValid){
                setError("List name cannot be empty");
            }
        }
    }, [isListNameValid, isBulkInputValid]);

    return {baseWords, definitions, isValid, error};
}
export default useBulkVocabInput;