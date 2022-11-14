import {useNavigate} from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate("/quiz");
    }

    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={() => handleStartQuiz()}>Start Quiz</button>
        </div>
    );
}

export default Home;