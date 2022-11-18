import 'bootstrap/dist/css/bootstrap.css';
import useBulkVocabInput from "./hooks/useBulkVocabInput";
import {useEffect, useState} from "react";
import ListNameInput from "./CreateBulkVocabList/ListNameInput";
import BulkListInput from "./CreateBulkVocabList/BulkListInput";
import serverUrl from "./Constants";
import {useNavigate} from "react-router-dom";

const CreateBulkVocabList = () => {
    const navigate = useNavigate();
    const [listName, setListName] = useState();
    const [bulkInput, setBulkInput] = useState("");
    const {baseWords, definitions, isValid, error} = useBulkVocabInput(listName, bulkInput);

    function handleCreateList(e){
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

        console.log(JSON.stringify(vocabList));

        fetch(serverUrl() + '/vocab-list', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(vocabList)
        }).then(() => {
            navigate("/");
        })
    }

    return (
        <div className="container mt-5">
            <h2>Create New Bulk Vocab List</h2>
            <div className="col ms-2 me-2">
                <div className="row">
                    <ListNameInput listName={listName} onListNameChanged={(newValue) => {
                        setListName(newValue)
                    }}/>
                </div>
                <div className="row mt-2">
                    <BulkListInput bulkInput={bulkInput} onBulkInputChanged={(newValue) => {
                        setBulkInput(newValue)
                    }}/>
                </div>
                <div className="row mt-3">
                    {!isValid ? <div className="alert alert-danger">{error}</div> : <div className="btn btn-lg btn-primary text-start" onClick={(e) => {handleCreateList(e)}}>Create List</div> }
                </div>
            </div>
        </div>
    );
}

export default CreateBulkVocabList;