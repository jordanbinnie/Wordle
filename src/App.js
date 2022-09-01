import React, { useState, useEffect } from 'react'
import './App.css'
import Wordle from './components/wordle/Wordle'
import { FaChevronLeft } from 'react-icons/fa'
import { Words } from './words.js'

function App() {

    const [solution, setSolution] = useState("react")
    const [popOut, setPopOut] = useState(false)

    function togglePopOut() {
        setPopOut(prev => !prev)
    }
    
    useEffect(() => {
        getRandomWord()
    }, [])

    function getRandomWord() {
        const randomWord = Words[Math.floor(Math.random()*Words.length)]
        setSolution(randomWord) 
    }

    return (
        <div className="App">
            <div className="WordleProject">
                <div className="WordleProject_main-heading_container"><span className="heading heading--3 WordleProject_main-heading_text">Wordle.</span></div>
                {solution && <Wordle getRandomWord={getRandomWord} solution={solution} />}
                <button className="button paragraph--2 WordleProject_button">
                    Wordle
                </button>
                <button className="button top-right heading paragraph--2 WordleProject_button" onClick={togglePopOut}>
                    <span className="button_top-right_content">{popOut ? <FaChevronLeft className="top-right_left-icon" /> : "?"}</span>
                </button>
                {popOut && <div className="WordleProject_pop-out">
                    <div className="pop-out_container"><div className="pop-out_block blue"></div><div className="pop-out_block_text paragraph--2">Correct place.</div></div>
                    <div className="pop-out_container"><div className="pop-out_block peach"></div><div className="pop-out_block_text paragraph--2">In the word but wrong place.</div></div>
                    <div className="pop-out_container"><div className="pop-out_block gray"></div><div className="pop-out_block_text paragraph--2">Not in the word.</div></div>
                </div>}
            </div>
        </div>
    )
}

export default App