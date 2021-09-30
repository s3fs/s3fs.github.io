//TODO: add dependabot to watch deps
//write tests
//styling

import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Trunk from './components/Trunk'
import TelegramIcon from '@material-ui/icons/Telegram'
import GitHubIcon from '@material-ui/icons/GitHub'
import InstagramIcon from '@material-ui/icons/Instagram'


const App = () => {
  const [ repoList, setRepoList ] = useState([])
  const [ content, setContent ] = useState('about')
  const [ screenState, setScreenState ] = useState(true)

  useEffect(() => {
    console.log('useeffect in use!')
  
    axios
      .get('https://api.github.com/users/s3fs/repos')
      .then(r => setRepoList(r.data.filter(i => i.has_pages && i.name !== 's3fs.github.io')))
      .then(() => setScreenState(false))
  }, [])


  return (
    <div className='container'>

      <header>
        <h1><a className='title_a' style={{textDecoration: 'none', color: 'black'}} href='https://s3fs.github.io'><span>s3fs/</span><span>s3fs.github.io</span></a></h1>
        
        <nav>
          <button className='nav_button' onClick={() => setContent('about')}>About</button>
          <button className='nav_button' onClick={() => setContent('projects')}>Projects</button>
          <button className='nav_button' onClick={() => setContent('contact')}>Contact</button>
        </nav>
      </header>

      <section>
        <Trunk content={content} repoList={repoList} screenState={screenState}/>
      </section>

      <footer>
          <a href='https://github.com/s3fs'><GitHubIcon style={{color: 'grey'}} /></a>
          <a href='https://t.me/felipemaersk'><TelegramIcon style={{color: 'grey'}} /></a>
          <a href='https://instagram.com/stayfroste'><InstagramIcon style={{color: 'grey'}} /></a>
      </footer>
    </div>
  )
}

export default App;
