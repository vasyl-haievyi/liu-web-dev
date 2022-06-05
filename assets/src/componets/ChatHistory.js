import React, { useEffect, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';

function ChatHistory ({ messages }) {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, []);

    let messageElems = messages.map((message) => {
        let message_classes = message.incoming? "bg-primary" : "bg-info float-end"
        let paragraph_classes = message.incoming? "" : "text-end"
        return (
            <Row className={"rounded m-2 w-50 p-1 " + message_classes}>
                <p className={paragraph_classes}>{message.message}</p>
            </Row>
        )
    });

    return (
        <Container fluid className="overflow-scroll" style={{maxHeight: "80vh"}}>
            {messageElems}
            <Row> <div ref={messagesEndRef} /></Row>
        </Container>
    )
}

export default ChatHistory;

// function getMessages() {
//     let res = [];

//     for (let i = 0; i < 40; i++) {
//         let message = "";
//         for(let j = 0; j < Math.random()*10; j++) {
//             message += " " + randomStr();
//         }
//         res.push({
//             id: i,
//             message: message.slice(1),
//             incoming: Math.random() < 0.5,
//         });
//     }

//     return res;
// }

// function randomStr(length = 10) {
//     var result           = '';
//     var characters       = 'abcdefghijklmnopqrstuvwxyz';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() * 
//  charactersLength));
//    }
//    return result;
// }