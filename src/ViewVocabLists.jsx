import 'bootstrap/dist/css/bootstrap.css';
import useFetch from "./hooks/useFetch";

const ViewVocabLists = () => {
    const {data: allVocabLists, isPending, error} = useFetch("http://localhost:8080/vocab-api/v1/vocab-list/all");

    return (
        <div className="container">
            <div className="col">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {allVocabLists && allVocabLists.map((vocabList) => (
                    <div className="row" key={vocabList.id}>
                        <div className="card" onClick={() => {console.log("Clicked")}}>
                            <div className="card-title">
                                {vocabList.name} - {vocabList.words.length}
                            </div>
                            <div className="card-body">
                                {vocabList.words.map((word) => (
                                    <p>{word.text} - {word.definitions[0].text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default ViewVocabLists;