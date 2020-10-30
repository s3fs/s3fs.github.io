import React from 'react'
import Note from './Note'

const Trunk = ({ content, repoList, screenState }) => {
    const interests = ['extreme sports', 'playing a guitar', 'making music', 'driving cars', 'traveling', 'having fun', 'making bonfires', 'hiking', 'girls']

    if (content === 'projects') {
        return (
            <div>
                <p className='trunk_title'>All repositories: <a href='https://github.com/s3fs'>&gt;Github</a></p>
                <p className='trunk_title'>Repositories with builds:<span style={ {visibility: screenState ? 'visible' : 'hidden'} } className='loading'>...</span></p>
                <ul>
                    {repoList.map(i => <Note content={i} key={i.id}/>)}
                </ul>
                 <i>This list's contents are fetched using Github API.</i>
            </div>
        )
    } else if (content === 'about') {
        return (
            <div>
                <p>Hi! My name is Nikolai. Welcome to my homepage!</p>
                <p>I am a passionate web developer who enjoys doing all kinds of things. For example, {interests[Math.floor(Math.random() * interests.length)]}.</p>
                <p>I write about stuff on my <a href='https://t.me/nohobo'>Telegram blog</a> and I also post cool pics on my <a href='https://instagram.com/stayfroste'>Insta</a>.</p>
            </div>
        )
    } else {
        return (
            <div>
                <div className='contact_div'>
                    <span>Telegram:</span><a href="https://t.me/felipemaersk">@felipemaersk</a>
                </div>
                <div className='contact_div'>
                    <span>Phone:</span><a title="That's not my actual phone number." href="tel:555-555-5555">555-555-5555</a>
                </div>
                <div className='contact_div'>
                    <span>Mail:</span><a href="mailto:northfacebodybags@yahoo.com">northfacebodybags@yahoo.com</a>
                </div>
                <p></p>
            </div>
        )
    }
}

export default Trunk