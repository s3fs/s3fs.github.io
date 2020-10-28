import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'



const App = () => {
  useEffect(() => {
    console.log('useeffect in use!')
  
    axios
      .get('https://s3fs.github.io/api/db.json')
      .then(r => console.log('r', r.data[0]))
  }, [])


  return (
    <>
      <header>
        <h1>This is my page.</h1>
        
        <nav><span>About me</span><span>My projects</span><span>Contact me</span></nav>
      </header>

      <section>

      </section>
    </>
  )
}

export default App;
