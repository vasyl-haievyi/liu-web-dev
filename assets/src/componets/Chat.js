import React, { useState, useEffect } from "react";
import { Container, Row, Col} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from 'react-use-websocket';

import NavBar from './NavBar'
import Contacts from './Contacts'
import ChatHistory from "./ChatHistory"
import MessageEditor from './MessageEditor'
import Authorized from "./Authorized";

function Chat () {
    let port = window.location.port !== ""? ":" + window.location.port : "";
    let protocol = window.location.protocol === "https:"? "wss://" : "ws://";
    const { sendMessage, lastMessage, readyState } = useWebSocket(protocol + window.location.hostname + port + '/api/chatws');
    
    const connectionStatus = readyState?  
        {
            [ReadyState.CONNECTING]: 'Connecting',
            [ReadyState.OPEN]: 'Open',
            [ReadyState.CLOSING]: 'Closing',
            [ReadyState.CLOSED]: 'Closed',
            [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
        }[readyState] 
        :
        'Unknown'


    let { userId } = useParams();
    let [messages, setMessages] = useState([])
    let sendMessageHandler = (text) => {
        setMessages(messages.concat({
            incoming: false,
            message: text
        }))

        sendMessage(JSON.stringify({
            to: userId,
            text: text
        }))
    }

    useEffect(() => {
        if (lastMessage !== null) {
            let newMessage = JSON.parse(lastMessage.data)
            setMessages((prev) => prev.concat({
                incoming: true,
                message: newMessage.text
            }))
        }
      }, [lastMessage, setMessages]);

    

    return (
    <Authorized> 
        <Container fluid className="vh-100 overflow-hidden ">
            <Row>
                <NavBar />  
            </Row>
            <Row >
                <Col md="5" ld="6" xl="3" className='h-100'>
                    <Contacts />
                </Col>
                <Col>
                    <Row className='h-100'> 
                        <ChatHistory messages={messages}/>
                    </Row>
                    <Row>
                        <MessageEditor onSend={sendMessageHandler} />
                        <span>The WebSocket is currently {connectionStatus}</span>
                    </Row>
                </Col>
            </Row>
        </Container>
    </Authorized>
    )
}

export default Chat;