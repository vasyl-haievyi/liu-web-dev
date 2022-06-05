import { Container, Row, Button, Toast } from 'react-bootstrap'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import NavBar from './NavBar';
import { logOut } from '../slices/userSlice';



function Account() {
    let [showLoggedOut, setShowLoggedOut] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const doLogout = () => {
        axios.delete('/auth/logout',{
            headers: {
                'content-type': 'application/json'
            },
            data: {}
        })
        .catch(({ response }) => {
            if (response.data.status !== 'success') {
                alert(JSON.stringify({
                    data: response.data,
                    request: 'logOut'
                }))
                return
            }
            setShowLoggedOut(true)
            setTimeout(() => {
                navigate('/')
                setTimeout(() => {
                    dispatch(logOut())
                }, 100)
            }, 1500)
            
        })
    }

    return (
        <Container fluid>
            <Row>
                <NavBar/>
                </Row>
            <Row md='3' lg="5" className='justify-content-center mt-4'>
                <Button variant="danger" onClick={ doLogout }>Log Out</Button>
            </Row>
            <Row>
                <Toast className="d-inline-block m-1" 
                bg="info" 
                show={ showLoggedOut }
                onClose={() => setShowLoggedOut(false)}
                position="top-end"
                delay={3000} 
                autohide
                >
                    <Toast.Body>
                        <strong className="me-auto">Logged out</strong>
                    </Toast.Body>
                </Toast>
            </Row>
        </Container>
    );
}

export default Account;
