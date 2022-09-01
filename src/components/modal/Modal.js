import React from 'react'
import './Modal.css'
import Confetti from 'react-confetti'

function Modal({ isCorrect, turn, solution, restartWordle }) {
  return (
    <div className="Modal">
        {isCorrect && (
            <> 
                <Confetti className="Confetti" />
                <div className="Modal_content">
                    <h3 className="heading heading--3 Modal_heading_turns">{turn} turns</h3>
                    <div class="ribbon">
                        <h3 className="heading heading--3 ribbon_heading">You Win</h3>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>

                    <div>
                        <button onClick={restartWordle} className="button paragraph--2 Modal_button--restart_blue">Play Again</button>
                    </div>
                </div>
            </>
        )}
        {(!isCorrect && turn > 5) && (
            <div className="Modal_content">
            <h3 className="heading heading--3 Modal_heading_solution">{solution}</h3>
            <div class="ribbon ribbon--lost">
                <h3 className="heading heading--3 ribbon_heading">You Lose</h3>
                <i id="ribbon--lost"></i>
                <i id="ribbon--lost"></i>
                <i id="ribbon--lost"></i>
                <i id="ribbon--lost"></i>
            </div>

            <div>
                <button onClick={restartWordle} id="button--lost" className="button paragraph--2 Modal_button--restart_red">Try Again</button>
            </div>
        </div>
        )}
    </div>
  )
}

export default Modal