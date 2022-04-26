import React from 'react';

import styles from './ChatDialog.module.css';


class ChatDialog extends React.Component {
    render() {
        let messages = getMessages().map((message) => {
            return (
                <li key={message.id} className={ `${styles.message} ${message.incoming? styles.incomingMessage : styles.sentMessage}`}>
                    {message.message}
                </li>
            )
        });

        return (
            <div className={styles.container}>
                <ul className={styles.messageHistory}>
                    {messages}
                </ul>
                <div className={styles.messageEditor}>
                    <textarea></textarea>
                    <button>Send</button>
                </div>
            </div>
        )
    }
}

export default ChatDialog;

function getMessages() {
    let res = [];

    for (let i = 0; i < 40; i++) {
        let message = "";
        for(let j = 0; j < Math.random()*10; j++) {
            message += " " + randomStr();
        }
        res.push({
            id: i,
            message: message.slice(1),
            incoming: Math.random() < 0.5,
        });
    }

    return res;
}

function randomStr(length = 10) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}