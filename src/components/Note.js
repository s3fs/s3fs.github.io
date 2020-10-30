import React from 'react'

const Note = ({ content }) => {
    return (
        <li className='note'>
            <div className="span_wrapper">
                <span className='note_name'>{content.name}</span>
                <span className='note_descr'>{content.description}</span>
            </div>
            <div className="link_wrapper">
                <a className="note_span" href={content.html_url}>&gt;Repo</a> 
                <a className='note_span' href={`https://s3fs.github.io/${content.name}`}>&gt;Build</a>
            </div>
        </li>
    )
}

export default Note