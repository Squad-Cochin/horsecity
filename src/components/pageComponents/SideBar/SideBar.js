import React from 'react';
import styles from './SideBar.module.scss'
const SideBar = () => {
    return (
        <>

            <div className={styles['sidebar']}>
                <div className={styles['total-results']}>Total Results: 100</div>
                <div className={styles['filters']}>
                    <label> <input type="checkbox" /> Private </label>
                    <label> <input type="checkbox" /> GCC </label>
                    <label> <input type="checkbox" /> Sharing </label>
                </div>
            </div>


        </>
    );
};

export default SideBar;