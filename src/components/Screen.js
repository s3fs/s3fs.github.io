import React from 'react'
import './Screen.css'

const Screen = ({ screenState }) => {
    if (!screenState) {
        return null
    } else {
        return (
            <div className='screen'>
                <div className='screen_track'>
                    <div className='screen_track-bit'></div>
                </div>
            </div>
        )
    }
}

export default Screen