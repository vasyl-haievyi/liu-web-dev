import React from 'react'

import styles from './Contacts.module.css'

class Contacts extends React.Component {
    render() {
        let contacts = getContacts().map((contact) => {
            return (
                <li key={contact.id} className={styles.contact}>
                    <div className={styles.contactImage}></div>
                    <div className={styles.contactName}>{contact.name}</div>
                </li>
            )
        });

        return (
            <ul className={styles.container}>
                {contacts}
            </ul>
        )
    }
}

function getContacts() {
    let res = []

    for (let i = 0; i < 15; i++) {
        res.push({
            id: i,
            name: randomStr() + " " + randomStr(),
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


export default Contacts;