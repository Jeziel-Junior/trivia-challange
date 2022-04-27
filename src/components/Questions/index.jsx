import '../../scss/Questions.scss';
import { useState, useEffect } from 'react';
import { FinalScore } from '../FinalScore';
import UIfx from 'uifx';
import CorrectAnswer from '../../sounds/correctAnswer.mp3';
import IncorrectAnswer from '../../sounds/incorrectAnswer.wav';
import BackgroundMusic from '../../sounds/backgroundMusic.mp3';
import Congrats from '../../sounds/congrats.wav';
const axios = require('axios').default;


export function Questions() {

    // Criação de estados
    const [questions, setQuestions] = useState([]);
    const [category, setCategory] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState([]);
    const [score, setScore] = useState(0);
    const [secondsCounter, setSecondsCounter] = useState(0);
    const [minutesCounter, setMinutesCounter] = useState(0);
    const [questionCounter, setQuestionCounter] = useState(1);
    const [finalScore, setFinalScore] = useState([]);
    const [step, setStep] = useState(0);
    const [scoreMensage, setScoreMensage] = useState('');
    const [btnColorTrue, setBtnColorTrue] = useState('');
    const [btnColorFalse, setBtnColorFalse] = useState('');

    // Efeitos Sonoros do jogo
    const soundCorrectAnswer = new UIfx(
        CorrectAnswer,
        {
            volume: 0.1, // number between 0.0 ~ 1.0
            throttleMs: 100
        }
    )
    const soundIncorrectAnswer = new UIfx(
        IncorrectAnswer,
        {
            volume: 0.15, // number between 0.0 ~ 1.0
            throttleMs: 100
        }
    )
    const backgroundMusic = new UIfx(
        BackgroundMusic,
        {
            volume: 0.15, // number between 0.0 ~ 1.0
            throttleMs: 100
        }
    )
    const congrats = new UIfx(
        Congrats,
        {
            volume: 0.5, // number between 0.0 ~ 1.0
            throttleMs: 100
        }
    )


    // Puxar perguntas e definir os estados
    useEffect(() => {
        setTimeout(() => {
            axios.get('https://opentdb.com/api.php?amount=1&type=boolean').then(({ data }) => {
                setQuestions(data.results[0].question)
                setCategory(data.results[0].category)
                setCorrectAnswer(data.results[0].correct_answer)
            });
        }, 800);
    }, [questionCounter]);

    // Tocar musica de fundo
    useEffect(() => {
        setTimeout(() => {
            backgroundMusic.play();
        }, 800);
    }, [0]);

    // Contagem de tempo (segundos)
    useEffect(() => {
        setTimeout(() => secondsCounter < 60 && setSecondsCounter(secondsCounter + 1), 1000);
    }, [secondsCounter])

    // Contagem de tempo (minutos)
    useEffect(() => {
        if (secondsCounter === 60) {
            setSecondsCounter(0);
            setMinutesCounter(minutesCounter + 1);
        }
    }, [secondsCounter, minutesCounter])

    // Mostrar resultado final
    useEffect(() => {
        setTimeout(() => {
            if (questionCounter > 10) {
                alert('Fim de jogo Você acertou ' + score + ' questões em ' + minutesCounter + ' minutos e ' + secondsCounter + ' segundos');
                setFinalMensage()
                congrats.play();
                setStep(1);
            }
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionCounter])

    // Mensagem Final
    function setFinalMensage() {
        if (score === 10) {
            setScoreMensage('Parabéns, você acertou todas as questões! 😍')
        } else if (score <= 3) {
            setScoreMensage('Você realmente tentou? Você acertou ' + score + ' questões! 😓')
        } else if (score <= 7) {
            setScoreMensage('Nada mal, mas você consegue melhorar! Você acertou ' + score + ' questões! 👍')
        } else if (score <= 9) {
            setScoreMensage('Quase lá, você acertou ' + score + ' questões! 💪')
        }
    }

    // Validação de resposta (true) e atualização do score
    function rightAnswerTrue() {
        if (correctAnswer === 'True' && questionCounter <= 10) {
            setTimeout(() => {
                setQuestionCounter(questionCounter + 1);
                setScore(score + 1);
                setFinalScore([...finalScore, [<p style={{ color: '#4BBE5E' }}>True</p>]])
                setBtnColorTrue('btn-green');
                soundCorrectAnswer.play();
                setTimeout(() => setBtnColorTrue(''), 1000);
            }, 500);

        } else {
            setTimeout(() => {
                setQuestionCounter(questionCounter + 1);
                setFinalScore([...finalScore, [<p style={{ color: '#FF4242' }}>False</p>]])
                setBtnColorTrue('btn-red')
                soundIncorrectAnswer.play();
                setTimeout(() => setBtnColorTrue(''), 1000);
            }, 500);
        }
    }

    // Validação de resposta (false) e atualização do score
    function rightAnswerFalse() {
        if (correctAnswer === 'False' && questionCounter <= 10) {
            setTimeout(() => {
                setQuestionCounter(questionCounter + 1);
                setScore(score + 1);
                setFinalScore([...finalScore, [<p style={{ color: '#4BBE5E' }}>False</p>]])
                setBtnColorFalse('btn-green')
                soundCorrectAnswer.play();
                setTimeout(() => setBtnColorFalse(''), 1000);
            }, 500);
        } else {
            setTimeout(() => {
                setQuestionCounter(questionCounter + 1);
                setFinalScore([...finalScore, [<p style={{ color: '#FF4242' }}>True</p>]])
                setBtnColorFalse('btn-red')
                soundIncorrectAnswer.play();
                setTimeout(() => setBtnColorFalse(''), 1000);
            }, 500);
        }
    }


    // Renderização das perguntas
    function RenderQuestions() {
        return (
            <>
                <div className="trivia-questions-container">
                    <nav>
                        <ul>
                            <div className='question-score-container'>
                                <li>Question: {questionCounter} of 10</li>
                                <li>Score: {score}</li>
                            </div>
                            <li className='question-category'>Question Category</li>
                            <li>TIME: {minutesCounter}:{secondsCounter}</li>
                        </ul>
                        <p>{category}</p>
                    </nav>
                    <section className="trivia-questions">
                        <div className='trivia-question-title'>
                            <h2 dangerouslySetInnerHTML={{ __html: questions }}></h2>
                        </div>
                        <div className='trivia-questions-btn'>
                            <button id='btn-true' className={btnColorTrue} onClick={rightAnswerTrue}>True</button>
                            <button id='btn-false' className={btnColorFalse} onClick={rightAnswerFalse}>False</button>
                        </div>
                    </section>
                </div >
            </>
        )
    }

    // Switch entre tela do jogo e tela do resultado
    function renderContent() {
        switch (step) {
            case 0:
                return (
                    <>
                        <RenderQuestions />
                    </>
                )
            case 1:
                return (
                    <>
                        <FinalScore finalScore={finalScore} score={score} mensage={scoreMensage} />
                    </>
                )
            default:
                return '';
        }
    }

    // Renderização do jogo
    return (
        <>
            {
                renderContent()
            }
        </>
    )
}
