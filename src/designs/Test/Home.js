import React from 'react'

import  styles from  './Home.module.scss'
function HomePage() {
      
                          
  return (
        <div  className={styles['my-component']}>
      <h1>Hello, World!</h1>
      <p className="subtext">This is a subtext.</p>
    </div>
  )
}

export default HomePage