import React from 'react'
import '../App.css'

const Note = ({ content, clearEntry }) => {
    return (
        <li className='note'>
            <div className="word_wrapper">
                <span className="note_span">{content.de}</span> 
                <span className="note_span">{content.en}</span> 
                <span className="note_span">{content.ru}</span> 
            </div>
            <button id={content.id} onClick={clearEntry}>&times;</button>
        </li>
    )
}

export default Note