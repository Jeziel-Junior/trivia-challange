import '../../scss/FinalScore.scss';




export function FinalScore({ finalScore, score }) {


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
                <h2>You Scored {score}/10</h2>
                <button type="button" onClick={handleClick}>Play Again</button>
            </div>
        </>
    )
}