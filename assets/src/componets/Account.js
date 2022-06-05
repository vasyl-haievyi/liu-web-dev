import { Container, Row, Button, Toast } from 'react-bootstrap'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './NavBar';
import Authorized from './Authorized';
import { logOut } from '../slices/userSlice';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';


function Account() {
    let [showLoggedOut, setShowLoggedOut] = useState(false)
    let user = useSelector(state => state.user)
    let dispatch = useDispatch()

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
                dispatch(logOut())
            }, 1500)
            
        })
    }

    if (!user) {
        return <Navigate to='/' />
    }

    return (
        <Authorized>
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
        </Authorized>
    );
}

export default Account;
