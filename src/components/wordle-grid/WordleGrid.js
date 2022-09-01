import React from 'react'
import Row from '../row/Row'

function WordleGrid({ currentGuess, guesses, turn, invalidAnimation, isCorrect }) {
  return (
    <div className="WordleGrid">
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} invalidAnimation={invalidAnimation} isCorrect={isCorrect} />
        }
        return <Row key={i} guess={g} invalidAnimation={invalidAnimation} /> 
      })}
    </div>
  )
}

export default WordleGrid