import React, { useState, useRef } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

function MessageEditor ({ onSend }) {
    let [message, setMessage] = useState("")
    const textareaRef = useRef(null)

    return (
        <Container>
            <Row className="align-items-center">
                <Col >
                    <textarea className="w-100" onChange={(e) => {setMessage(e.target.value)}} ref={textareaRef}/>
                </Col>
                <Col md="auto">
                    <Button onClick={() => {onSend(message); textareaRef.current.value = ""}}>Send</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default MessageEditor;