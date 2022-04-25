import '../../scss/FinalScore.scss';




export function FinalScore() {


    function handleClick() {
        window.location.assign('http://localhost:3000/questions');
    }


    return (
        <>
            <div className="final-score-container">
                <h1>Result:</h1>
                <ol>
                    <li>True</li>
                    <li>True</li>
                    <li>True</li>
                    <li>True</li>
                    <li>True</li>
                    <li>True</li>
                    <li>True</li>
                    <li>True</li>
                    <li>True</li>
                    <li>True</li>
                </ol>
                <h2>You Scored 3/10</h2>
                <button type="button" onClick={handleClick}>Play Again</button>
            </div>
        </>
    )
}