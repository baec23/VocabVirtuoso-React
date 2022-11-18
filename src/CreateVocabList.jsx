import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import VocabWordInputForm from "./components/VocabWordInputForm";
import {useNavigate} from "react-router-dom";
import serverUrl from "./Constants";

const CreateVocabList = () => {
    const navigate = useNavigate();
    const [listName, setListName] = useState("");
    const [baseWords, setBaseWords] = useState([]);
    const [definitions, setDefinitions] = useState([]);
    const [isPending, setIsPending] = useState('false');

    const handleSubmit = (e) => {
        e.preventDefault();
        let words = [];
        baseWords.map((baseWord, index) => (
                words[index] = {
                    text: baseWord,
                    definitions: [ definitions[index] ]
                }
            )
        )
        const vocabList = {name: listName, words: words};

        setIsPending(true);

        console.log(JSON.stringify(vocabList));
        fetch(serverUrl() + '/vocab-list', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(vocabList)
        }).then(() => {
            setIsPending(false);
            navigate("/");
        })
    }

    return (
        <div className="container mt-5">
            <h2>Create New Vocab List</h2>
            <form>
                <div className="container">
                    <div className="col">

                        <div className="row mb-5 ms-1 me-1">
                            <label className="form-label">List Name</label>
                            <input
                                className="form-control"
                                required
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}/>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="col">
                                    <div className="row gy-2">
                                        {baseWords.map((baseWord, index) => (
                                            <VocabWordInputForm
                                                key={index}
                                                index={index}
                                                baseWord={baseWords[index]}
                                                definition={definitions[index]}
                                                onBaseChanged={(newBaseText) => {
                                                    let newBaseWords = [...baseWords];
                                                    newBaseWords[index] = newBaseText;
                                                    setBaseWords(newBaseWords);
                                                }}
                                                onDefinitionChanged={(newDefinitionText) => {
                                                    let newDefinitions = [...definitions];
                                                    newDefinitions[index] = newDefinitionText;
                                                    setDefinitions(newDefinitions);
                                                }}
                                            />))}
                                        <button className="btn btn-primary"
                                                type="button"
                                                onClick={() => {
                                                    setBaseWords([...baseWords, ""]);
                                                    setDefinitions([...definitions, ""]);
                                                }}>Add Word
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2" onClick={(e) => {
                    handleSubmit(e);
                }}>Create
                </button>
            </form>
        </div>
    );
}


export default CreateVocabList;