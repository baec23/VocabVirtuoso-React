import 'bootstrap/dist/css/bootstrap.css';
import useBulkVocabInput from "./hooks/useBulkVocabInput";
import {useContext, useState} from "react";
import ListNameInput from "./ListNameInput";
import BulkListInput from "./BulkListInput";
import serverUrl from "../Constants";
import {useNavigate} from "react-router-dom";
import {LoginStateContext} from "../AuthWrapper";
import TwoColumnVocabListInput from "../CreateBulkVocabList2/TwoColumnVocabListInput";

const CreateBulkVocabList = () => {
    const navigate = useNavigate();
    const [listName, setListName] = useState();
    const [inputTypeSelection, setInputTypeSelection] = useState("Single");
    const [singleInput, setSingleInput] = useState("");
    const [doubleInput1, setDoubleInput1] = useState("");
    const [doubleInput2, setDoubleInput2] = useState("");
    const {baseWords, definitions, isValid, error} = useBulkVocabInput({
        listName: listName,
        inputType: inputTypeSelection,
        singleListInput: singleInput,
        doubleListInput1: doubleInput1,
        doubleListInput2: doubleInput2
    });
    const authContext = useContext(LoginStateContext);
    const loginState = authContext.loginState;

    function handleInputTypeSelected(selection) {
        setInputTypeSelection(selection);
    }

    function handleCreateList(e) {
        e.preventDefault();

        let words = [];
        baseWords.map((baseWord, index) => (
                words[index] = {
                    text: baseWord,
                    definitions: definitions[index]
                }
            )
        )
        const vocabList = {name: listName, words: words};

        console.log(vocabList);

        fetch(serverUrl() + '/vocab-list', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + loginState.access_token
            },
            body: JSON.stringify(vocabList)
        }).then(() => {
            navigate("/");
        })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <h2>Create New Vocab List</h2>
                </div>
                <div className="col-auto">
                    <select className="form-select"
                            onChange={(e) => {
                                handleInputTypeSelected(e.target.value);
                            }}>
                        {
                            Object.keys(InputType).map((type) => (
                                <option key={type.toString()}>{type.toString()}</option>
                            ))}
                    </select>
                </div>
            </div>

            <div className="col ms-2 me-2">
                <div className="row">
                    <ListNameInput listName={listName} onListNameChanged={(newValue) => {
                        setListName(newValue)
                    }}/>
                </div>

                <div className="row mt-2">
                    {inputTypeSelection === "Single"
                        ?
                        <BulkListInput bulkInput={singleInput}
                                       onBulkInputChanged={(newValue) => {
                                           setSingleInput(newValue)
                                       }}/>
                        :
                        <TwoColumnVocabListInput input1={doubleInput1} input2={doubleInput2}
                                                 onInput1Changed={(newValue) => {
                                                     setDoubleInput1(newValue)
                                                 }}
                                                 onInput2Changed={(newValue) => {
                                                     setDoubleInput2(newValue)
                                                 }}
                        />
                    }
                </div>

                <div className="row mt-3">
                    {!isValid ? <div className="alert alert-danger">{error}</div> :
                        <div className="btn btn-lg btn-primary text-start" onClick={(e) => {
                            handleCreateList(e)
                        }}>Create List</div>}
                </div>
            </div>
        </div>
    );
}
const InputType = {
    Single: "single",
    Double: "double"
}

export default CreateBulkVocabList;