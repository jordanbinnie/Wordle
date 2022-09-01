import  { useState } from 'react'
import { Words } from '../words'

const useWordle = (solution, getRandomWord) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guesss is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [invalidAnimation, setInvalidAnimation] = useState(false)
    const [deadLetters, setDeadLetters] = useState([])
    const alphabet = [
        "a", "A",
        "b", "B",
        "c", "C",
        "d", "D",   
        "e", "E",   
        "f", "F",
        "g", "G",
        "h", "H",
        "i", "I",
        "j", "J",
        "k", "K",
        "l", "L",
        "m", "M",
        "n", "N",
        "o", "O",
        "p", "P",
        "q", "Q",
        "r", "R",
        "s", "S",
        "t", "T",
        "u", "U", 
        "v", "V",
        "w", "W",
        "x", "X",
        "y", "Y",
        "z", "Z"
      ];

    const restartWordle = () => {
        setTurn(0)
        setCurrentGuess('')
        setGuesses([...Array(6)])
        setHistory([])
        setIsCorrect(false)
        getRandomWord()
        setDeadLetters([])
    }
    
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess.toLowerCase()].map((l) => {
            return {key: l, color: 'wrong'}
        })

        // find any green letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'correct'
                solutionArray[i] = null
            }
        })

        // find any yellow letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'correct') {
                formattedGuess[i].color = 'almost'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        const wrongLetters = () => {
            let newArray = []
            formattedGuess.forEach((l) => {
                if (l.color === "wrong" && !newArray.includes(l.key) && !deadLetters.includes(l.key)) {
                    newArray.push(l.key)
                }
            })
            return newArray
        } 
        setDeadLetters(prevDeadLetters => [...prevDeadLetters, ...wrongLetters()])

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        setInvalidAnimation(false)
        if (currentGuess.toLowerCase() === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory => {
            return [...prevHistory, currentGuess]
        }))
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setCurrentGuess('')
    }


    const handleInput = (e) => {
        setInvalidAnimation(false)
        if (e.nativeEvent.inputType === "deleteContentBackward") {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if(e.nativeEvent.inputType === "insertText") {
            if(alphabet.includes(e.target.value[currentGuess.length])) {
                if (currentGuess.length < 5) {
                    setCurrentGuess((prev) => {
                        return prev + e.target.value[currentGuess.length]
                    })
                }
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (turn > 5) {
            setInvalidAnimation(false)
            return
        }
        if (history.includes(currentGuess.toLowerCase())) {
            setInvalidAnimation(true)
            return
        }
        if (currentGuess.length !== 5) {
            setInvalidAnimation(true)
            return
        }
        if(!Words.includes(currentGuess.toLowerCase())) {
            setInvalidAnimation(true)
            return
        }
        const formatted = formatGuess()
        addNewGuess(formatted)
    }
    
    return { turn, currentGuess, guesses, isCorrect, handleInput, handleSubmit, restartWordle, invalidAnimation, deadLetters }
    
}

export default useWordle