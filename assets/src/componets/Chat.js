import React from "react";

import styles from "./Chat.module.css";

import NavBar from './NavBar'
import Contacts from './Contacts'
import ChatDialog from "./ChatDialog"

class Chat extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <NavBar />
                <div>
                    <div className={styles.contacts}>
                        <Contacts />
                    </div>
                    <div className={styles.dialog}>
                        <ChatDialog />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;