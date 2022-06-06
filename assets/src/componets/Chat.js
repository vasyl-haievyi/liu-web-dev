import React, { useState, useEffect } from "react";
import { Container, Row, Col} from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
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
    let [conversations, setConversations] = useState([])

    if (userId && !conversations.find(c => c.withUserId === userId)) {

    }

    let sendMessageHandler = (text) => {
        sendMessage(JSON.stringify({
            type: "new_message",
            payload: {
                to: userId,
                text: text
            }
        }))

        let conv = conversations.find(c => c.withUserId === userId)
        var index = conversations.indexOf(conv);
        let newMessages = conv?.messages.concat({
            incoming: false,
            text: text
        }) ?? []
        let newConv = {...conv, messages: newMessages}

        if (index !== -1) {
            let newConversations = [...conversations]
            newConversations[index] = newConv
            setConversations(newConversations)
        }
    }

    let navigate = useNavigate()
    let contactClidkedHandler = (contact) => {
        navigate('/messages/' + contact.id)
    }

    useEffect(() => {
        if (lastMessage !== null) {
            let newMessage = JSON.parse(lastMessage.data)
            if (newMessage.type === 'new_message') {
                let conv = conversations.find(c => c.withUserId === newMessage.payload.from)
                var index = conversations.indexOf(conv);

                let newMessages = conv?.messages.concat({
                    incoming: true,
                    text: newMessage.payload.text
                }) ?? []
                let newConv = {...conv, messages: newMessages}
        
                if (index !== -1) {
                    let newConversations = [...conversations]
                    newConversations[index] = newConv
                    setConversations(newConversations)
                }
            } else if (newMessage.type === 'conversations') {
                setConversations(newMessage.payload)
            }
        }
      }, [lastMessage]);

    

    return (
    <Authorized> 
        <Container fluid className="vh-100 overflow-hidden">
            <Row>
                <NavBar />  
            </Row>
            <Row className="">
                <Col md="5" ld="6" xl="3">
                    <Contacts 
                        contacts={conversations.map(c => { return {id : c.withUserId} })} 
                        onContactClicked={contactClidkedHandler}
                    />
                </Col>
                {!userId?.length ? 
                    <Col><h2>Select Contact</h2></Col>  
                    :
                    <Col className="fixed-bottom">
                        <Row> 
                            <ChatHistory conversation={ conversations.find(c => c.withUserId === userId) }/>
                        </Row>
                        <Row>
                            <MessageEditor onSend={sendMessageHandler} />
                            <span>The WebSocket is currently {connectionStatus}</span>
                        </Row>
                    </Col>    
                }

            </Row>
        </Container>
    </Authorized>
    )
}

export default Chat;