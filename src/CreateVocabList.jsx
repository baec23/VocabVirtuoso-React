import {useState} from "react";

const CreateVocabList = () => {
    const [listName, setListName] = useState("");
    const [body, setBody] = useState("");
    const [isPending, setIsPending] = useState('false');

    const handleSubmit = (e) => {
        e.preventDefault();
        const vocabList = {listName, body};

        setIsPending(true);
        fetch('http://localhost:8080/vocab-list', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(vocabList)
        }).then(() => {
            setIsPending(false);
        })
    }

    return (
        <div className="create-vocab-list">
            <h2>Create Vocab List</h2>
            <form onSubmit={handleSubmit}>
                <label>List Name</label>
                <input
                    type="text"
                    required
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                />
                <label>Vocab Words</label>
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    onChange={(e) => setBody(e.target.value)}
                />
                <button>Create</button>
            </form>
        </div>
    );
}
export default CreateVocabList;