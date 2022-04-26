import '../../scss/Questions.scss';
import { useState, useEffect } from 'react';
import { FinalScore } from '../FinalScore';
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


    // Função para pegar as perguntas e definir os estados
    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=1&type=boolean').then(({ data }) => {
            setQuestions(data.results[0].question)
            setCategory(data.results[0].category)
            setCorrectAnswer(data.results[0].correct_answer)
        });
    }, [questionCounter]);


    // Função de contagem de tempo (segundos)
    useEffect(() => {
        secondsCounter < 60 && setTimeout(() => setSecondsCounter(secondsCounter + 1), 1000);
    }, [secondsCounter])


    // Função de contagem de tempo (minutos)
    useEffect(() => {
        if (secondsCounter === 60) {
            setSecondsCounter(0);
            setMinutesCounter(minutesCounter + 1);
        }
    }, [secondsCounter, minutesCounter])

    // Função para exibir o resultado final
    useEffect(() => {
        if (questionCounter === 11) {
            alert('Fim de jogo Você acertou ' + score + ' questões em ' + minutesCounter + ' minutos e ' + secondsCounter + ' segundos');
            setFinalMensage()
            setStep(1);
        }
    }, [questionCounter])


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
            setQuestionCounter(questionCounter + 1);
            setScore(score + 1);
            setFinalScore([...finalScore, [<p style={{ color: '#4BBE5E' }}>True</p>]])
        } else {
            alert('Ahh... Não foi dessa vez! Vamos para a próxima.')
            setQuestionCounter(questionCounter + 1);
            setFinalScore([...finalScore, [<p style={{ color: '#FF4242' }}>False</p>]])
        }
    }



    // Validação de resposta (false) e atualização do score
    function rightAnswerFalse() {
        if (correctAnswer === 'False' && questionCounter <= 10) {
            setQuestionCounter(questionCounter + 1);
            setScore(score + 1);
            setFinalScore([...finalScore, [<p style={{ color: '#4BBE5E' }}>False</p>]])
        } else {
            alert('Ahh... Não foi dessa vez! Vamos para a próxima.')
            setQuestionCounter(questionCounter + 1);
            setFinalScore([...finalScore, [<p style={{ color: '#FF4242' }}>True</p>]])
        }
    }




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
                            <h2>{questions}</h2>
                        </div>
                        <div className='trivia-questions-btn'>
                            <button id='btn-true' onClick={rightAnswerTrue}>True</button>
                            <button id='btn-false' onClick={rightAnswerFalse}>False</button>
                        </div>
                    </section>
                </div >
            </>
        )
    }

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


    return (
        <>
            {
                renderContent()
            }
        </>
    )
}
