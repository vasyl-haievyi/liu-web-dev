import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'

function Contacts ({ contacts, onContactClicked }) {
    if (!contacts.length) {
        return <Container><h2>No Conversations</h2></Container>
    }

    let contactElems = contacts.map((contact) => {
        return (
            <Row className="my-1">
                <Card border="primary" onClick={ () => onContactClicked(contact) }>
                    <Row className="align-items-center">  
                        <Col md="auto">
                            <Card.Img src="..." height="50px" width="50px"/>
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>{contact.id}</Card.Title>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Row>
        )
    });

    return (
        <Container className="overflow-scroll" style={{maxHeight: "80vh"}}>
            {contactElems}
        </Container>
    )
}

function getContacts() {
    let res = []

    for (let i = 0; i < 25; i++) {
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