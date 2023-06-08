import React from 'react'


/**Imported components */
import styles from './Header.module.scss'
function HeaderPage() {
  return (
    <>
    <div className={styles['my-component']}>
      <h1>Hello, World!</h1>
      <p className="subtext">This is a subtext.</p>
    </div>


  </>
  )
}

export default HeaderPage