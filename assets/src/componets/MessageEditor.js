import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

function MessageEditor () {
    return (
        <Container>
            <Row className="align-items-center">
                <Col >
                    <textarea className="w-100"></textarea>
                </Col>
                <Col md="auto">
                    <Button>Send</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default MessageEditor;