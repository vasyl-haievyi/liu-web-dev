import React from 'react';
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import logo from '../logo.svg'


class NavBar extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to='/'><img  src={logo} alt="logo" /></Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to='messages'>Messages</Link></li>
                        <li><Link to='following'>Following</Link></li>
                        <li><Link to='account'>My Account</Link></li>
                        <li><Link to='add'>Add Advertisiment</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default NavBar;