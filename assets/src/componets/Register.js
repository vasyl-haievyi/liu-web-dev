import React, { useState } from 'react';
import { Container, Row, Form, FloatingLabel, Button, Toast } from 'react-bootstrap'
import { useFormik } from 'formik'
import { Navigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './NavBar'
import { logIn } from '../slices/userSlice';


function Register() {
    let [loadingShow, setLoadingShow] = useState(false)
    let loggedInUser = useSelector(state => state.user)
    let [searchParams] = useSearchParams();
    let dispatch = useDispatch()
    const validate = values => {
        const errors = {};

        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if(!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 8) {
            errors.password = 'Minimum 8 symbols'
        } else if (!/[A-Z]/.test(values.password)) {
            errors.password = 'Minimum 1 uppercase'
        } else if (!/[a-z]/.test(values.password)) {
            errors.password = 'Minimum 1 lowercase'
        } else if (!/[0-9]/.test(values.password)) {
            errors.password = 'Minimum 1 digit'
        } else if (!/[^A-Za-z0-9]+/.test(values.password)) {
            errors.password = 'Minimum 1 special character'
        }

        if(!values.repeatPassword) {
            errors.repeatPassword = 'Required'
        } else if (values.repeatPassword !== values.password) {
            errors.repeatPassword = 'Please, repeat your password'
        }
        
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        validate,
        onSubmit: values => {
            setLoadingShow(true)
            axios.post('/auth/register', {
                email: formik.values.email,
                password: formik.values.password,
                confirm_password: formik.values.repeatPassword
            })
            .catch(({ response }) => {
                if (response.data.status !== 'success') {
                    alert(JSON.stringify({
                        ...response.data,
                        request: 'logIn'
                    }))
                    setLoadingShow(false)
                    return
                }
                axios.get('/api/currentUser')
                .then(response => {
                    const user = response.data.user
                    dispatch(logIn(user) )
                }).catch(error => {
                    alert(JSON.stringify({
                        error: error,
                        request: 'currentUser'
                    }))
                }).then(() => {
                    setLoadingShow(false)
                })
            })
        },
    });
    
    if (loggedInUser) {
        if (searchParams.get('redirect')) {
            return <Navigate to={searchParams.get('redirect')}/>
        } else {
            return <Navigate to='/'/>
        }
    }

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            <Row md='3' lg="5" className='justify-content-center mt-4'>
                <Form onSubmit={formik.handleSubmit}>
                    <FloatingLabel
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            id="email" 
                            type="email" 
                            placeholder="name@example.com" 
                            name="email"
                            onChange={formik.handleChange} 
                            value={formik.values.email} 
                            isValid={formik.touched.email && !formik.errors.email}
                            isInvalid={!!formik.errors.email}/>
                            {formik.errors.email ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.email}</Form.Control.Feedback> : null}
                    </FloatingLabel>
                    <FloatingLabel label="Password">
                        <Form.Control
                            id="password"
                            type="password" 
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            isValid={formik.touched.password && !formik.errors.password}
                            isInvalid={formik.touched.password && !!formik.errors.password}/>
                            {formik.errors.password ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback> : null}
                    </FloatingLabel> 
                    <FloatingLabel label="Repeat Password">
                        <Form.Control
                            id="repeatPassword"
                            type="password" 
                            placeholder="Repeat Password"
                            name="repeatPassword"
                            onChange={formik.handleChange}
                            value={formik.values.repeatPassword}
                            isValid={formik.touched.repeatPassword && !formik.errors.repeatPassword}
                            isInvalid={formik.touched.repeatPassword && !!formik.errors.repeatPassword}/>
                            {formik.errors.repeatPassword ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.repeatPassword}</Form.Control.Feedback> : null}
                    </FloatingLabel>
                    <Button type="submit" className='w-100 mt-2'>Register</Button> 
                    <h5>Already have an account? <Link to={'/login' + (searchParams.get('redirect')? '/?redirect=' + searchParams.get('redirect') : '')}>Log In</Link></h5>
                </Form>
            </Row>
            <Row>
                <Toast className="d-inline-block m-1" bg="info" onClose={() => {setLoadingShow(false)}} show={loadingShow} position="top-end">
                    <Toast.Body>
                        <strong className="me-auto">Loading...</strong>
                    </Toast.Body>
                </Toast>
            </Row>
        </Container>
    )
}

export default Register;