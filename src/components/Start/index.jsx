import '../../scss/Start.scss';
import light from '../../image/light-bulb.svg';

export function Start() {



    function handleClick() {
        window.location.assign('http://localhost:3000/questions');
    }

    return (
        <>
            <div className="trivia-container">
                <img src={light} className="trivia-ico" alt="light bulb" />
                <h1 className="trivia-title"><span>This is<br></br></span> Trivia Challenge</h1>
                <p className="trivia-description">You will receive 10 questions can you answer all right?</p>
                <button className="trivia-btn" onClick={handleClick}>Start</button>
            </div>
        </>
    )
}