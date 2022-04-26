import '../../scss/FinalScore.scss';




export function FinalScore({ finalScore, score, mensage }) {


    function handleClick() {
        window.location.assign('http://localhost:3000/questions');
    }


    return (
        <>
            <div className="final-score-container">
                <h1>Result:</h1>
                <ol>
                    {finalScore.map(score => <li>{score}</li>)}
                </ol>
                <h3>{mensage}</h3>
                <h2>You Scored {score}/10</h2>
                <button type="button" onClick={handleClick}>Play Again</button>
            </div>
        </>
    )
}