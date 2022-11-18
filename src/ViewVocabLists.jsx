import 'bootstrap/dist/css/bootstrap.css';
import useFetch from "./hooks/useFetch";
import serverUrl from "./Constants";

const ViewVocabLists = () => {
    const {data: allVocabLists, isPending, error} = useFetch(serverUrl() + "/vocab-list/all");

    return (
        <div className="container">
            <div className="col">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {allVocabLists && allVocabLists.map((vocabList) => (
                    <div className="row" key={vocabList.id}>
                        <div className="card" onClick={() => {
                        }}>
                            <div className="card-title">
                                {vocabList.name} - {vocabList.words.length}
                            </div>
                            <div className="card-body">
                                {vocabList.words.map((word, index) => (
                                    <p key={index}>{word}</p>
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