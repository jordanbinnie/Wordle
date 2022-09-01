import React, { useEffect, useState } from 'react'
import './Wordle.css'
import useWordle from '../../hooks/useWordle'
import WordleGrid from '../wordle-grid/WordleGrid'
import Modal from '../modal/Modal'

function Wordle({ solution, getRandomWord }) {
    const { invalidAnimation, restartWordle, handleInput, handleSubmit, currentGuess, guesses, isCorrect, turn, deadLetters } = useWordle(solution, getRandomWord)
    const [disabled, setDisabled] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (isCorrect) {
            setTimeout(() => {
                setShowModal(true)
            }, 1300)
        }

        if (!isCorrect) {
            setShowModal(false)
            setDisabled(false)
        }

        if (turn > 5) {
            setTimeout(() => {
                setShowModal(true)
            }, 1300)
            setDisabled(true)
        }

        if (turn < 5) {
            setDisabled(false)
        }

    }, [turn, isCorrect])

    function keyDown(e) {
        var e = window.event || e;
        var key = e.keyCode;
        //space pressed
        if (key == 32) {
          //space
          e.preventDefault();
        } else {
          return (
            (e.charCode >= 65 && e.charCode <= 90) ||
            (e.charCode >= 97 && e.charCode <= 122)
          );
        }
      }

    const isDisabled = isCorrect ? "disabled" : ""


    return (
        <div>
            <WordleGrid currentGuess={currentGuess} guesses={guesses} turn={turn} invalidAnimation={invalidAnimation} isCorrect={isCorrect} />
            <form className="Wordle_form" onSubmit={handleSubmit} >
                <input
                    value={currentGuess}
                    onChange={handleInput}
                    onKeyDown={keyDown}
                    placeholder="guess..."
                    maxLength="5"
                    className="Wordle_form_input heading heading--3"
                    disabled = {isDisabled}
                />
                <button hidden type="submit"></button>
            </form>
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} restartWordle={restartWordle} />}
            <div className="Wordle_dead-letters">
                {deadLetters?.map(l => (
                    <div className="dead-letter heading heading---3">
                        {l}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wordle