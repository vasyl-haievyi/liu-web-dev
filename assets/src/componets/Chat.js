import React from "react";
import { Container, Row, Col} from 'react-bootstrap'

import NavBar from './NavBar'
import Contacts from './Contacts'
import ChatHistory from "./ChatHistory"
import MessageEditor from './MessageEditor'
import Authorized from "./Authorized";

function Chat () {
    return (
    <Authorized> 
        <Container fluid className="vh-100 overflow-hidden ">
            <Row>
                <NavBar />  
            </Row>
            <Row >
                <Col md="5" ld="6" xl="3">
                    <Contacts />
                </Col>
                <Col>
                    <Row  > 
                            <ChatHistory />
                    </Row>
                    <Row >
                        <MessageEditor />
                    </Row>
                </Col>
            </Row>
        </Container>
    </Authorized>
    )
}

export default Chat;