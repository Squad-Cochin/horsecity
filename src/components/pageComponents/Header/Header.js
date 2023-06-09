import React from 'react'
import { AiOutlineBell, AiOutlineUser } from 'react-icons/ai';

/**Imported components */
import styles from './Header.module.scss'

function HeaderPage() {
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header-left"]}>
          <img src={process.env.PUBLIC_URL + '/images/icon-36x36.png'} alt="Logo" className={styles["logo"]} />
          {/* <h3>Horscity</h3> */}
        </div>
        <div className={styles["header-right"]}>
          <select className={styles["language-select"]}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
          <div className={styles["notification-icon"]}>
            <AiOutlineBell />
          </div>
          <div className={styles["profile-icon"]}>
            <AiOutlineUser />
          </div>
        </div>
      </header>

    </>
  )
}

export default HeaderPage