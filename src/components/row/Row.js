import React from 'react'
import './Row.css'

function Row({ guess, currentGuess, invalidAnimation, isCorrect }) {

    if (guess) {
        const winner = isCorrect ? "winner" : ""

        return (
            <div className="Row Row-past">
                {guess.map((l, i) => (
                    <div key={i} className={`Row_box heading heading--3 ${l.color} ${winner}`}>{l.key}</div>
                ))}
            </div>
        ) 
    }

    if (currentGuess) {
        let letters = currentGuess.split('')
        const invalid = invalidAnimation ? "invalid" : ""

        return (
            <div className={`Row Row-current ${invalid}`}>
                {letters.map((letter, i) => (
                    <div key={i} className="Row_box heading heading--3 filled">{letter}</div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i} className="Row_box"></div>
                ))}
            </div>
        )
    }

    return (
        <div className="Row">
            <div className="Row_box heading heading--3"></div>
            <div className="Row_box heading heading--3"></div>
            <div className="Row_box heading heading--3"></div>
            <div className="Row_box heading heading--3"></div>
            <div className="Row_box heading heading--3"></div>
        </div>
    )
}

export default Row