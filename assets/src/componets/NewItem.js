import NavBar from './NavBar';

import { Container, Row, Form, FloatingLabel, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function NewItem() {
    let categories = useSelector(state => state.categories)
    let user = useSelector(state => state.user)
    let navigate = useNavigate()
    let fileInputRef = useRef()

    const validate = values => {
        const errors = {};

        if (!values.title) {
            errors.title = 'Required'
        } 
        
        if (!values.description) {
            errors.description = 'Required'
        } 
        
        if (!values.price) {
            errors.price = 'Required'
        } else if (!/^([0-9]+)(\.{1}[0-9]{1,2}){0,1}$/.test(values.price)) {
            errors.price = 'Enter valid price'
        } 
        
        if (!values.state || values.state === '-') {
            errors.state = 'Please, select state'
        }
        
        if (!values.category || values.category === '-') {
            errors.category = 'Please, select category'
        }
        
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            state: '-',
            price: '0.0',
            category: '-',
            file: ''
        },
        validate,
        onSubmit: async values => {
            let file = fileInputRef.current?.files ? fileInputRef.current.files[0] : null
            let publicID = ""

            if (file) {
                const signResp = await axios.get('/api/signImageUpload')
                const signData = signResp.data
                const formData = new FormData();
    
                formData.append("file", file);
                formData.append("api_key", signData.apiKey);
                formData.append("timestamp", signData.timestamp);
                formData.append("signature", signData.signature);
                formData.append("folder", "signed_upload");
    
                const uploadResp = await axios.post("https://api.cloudinary.com/v1_1/" + signData.cloudName + "/auto/upload", formData)
                if (uploadResp.status === 200) {
                    publicID = uploadResp.data.public_id
                }
            }


            const data = {
                item: {
                    title: values.title,
                    description: values.description,
                    state: values.state,
                    price: values.price,
                    category: categories.find(c => c.id === formik.values.category),
                    seller: user,
                    image: publicID
                }
            }

            axios.post('/api/items', data)
            .then(response => {
                navigate('/items/' + response.data.id)
            }).catch(error =>{
                alert(JSON.stringify(error))
            })
        },
    });
    return (
        <Container fluid>
            <Row><NavBar/></Row>
            <Row md='3' lg="5" className='justify-content-center mt-4'>
                    <Form onSubmit={formik.handleSubmit}>
                        <FloatingLabel label="Title" className="mb-3">
                            <Form.Control
                                id="title" 
                                name="title"
                                onChange={formik.handleChange} 
                                value={formik.values.title} 
                                isValid={formik.touched.title && !formik.errors.title}
                                isInvalid={!!formik.errors.title}
                            />
                            {formik.errors.email ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.email}</Form.Control.Feedback> : null}
                        </FloatingLabel>
                        <FloatingLabel label="Description" className="mb-3">
                            <Form.Control 
                                as="textarea" 
                                rows={12}
                                id="description" 
                                name="description"
                                onChange={formik.handleChange} 
                                value={formik.values.description} 
                                isValid={formik.touched.description && !formik.errors.description}
                                isInvalid={!!formik.errors.description}
                            />
                            {formik.errors.description ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.description}</Form.Control.Feedback> : null}
                        </FloatingLabel>
                        <FloatingLabel label="Price in SEK" className="mb-3">
                            <Form.Control
                                id="price"
                                type="text" placeholder="Large text"
                                name="price"
                                onChange={formik.handleChange} 
                                value={formik.values.price}
                                isValid={formik.touched.price && !formik.errors.price}
                                isInvalid={!!formik.errors.price}
                            />
                            {formik.errors.price ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.price}</Form.Control.Feedback> : null}
                        </FloatingLabel>
                        <Form.Label htmlFor="state">State</Form.Label>
                        <Form.Select
                            id="state" 
                            name="state"
                            onChange={formik.handleChange} 
                            value={formik.values.state} 
                            isValid={formik.touched.state && !formik.errors.state}
                            isInvalid={!!formik.errors.state}
                        >
                            <option value="-">-</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </Form.Select>
                        <Form.Label htmlFor="category">Category</Form.Label>
                        <Form.Select
                            id="category" 
                            name="category"
                            onChange={formik.handleChange} 
                            value={formik.values.category} 
                            isValid={formik.touched.category && !formik.errors.category}
                            isInvalid={!!formik.errors.category}
                        >
                            <option value={null}>-</option>
                            {categories.map(c => <option value={c.id}>{c.title}</option> )}
                        </Form.Select>
                        <Form.Group className="mt-3">
                            <Form.Label>Select Images</Form.Label>
                            <Form.Control 
                                type="file" 
                                id="file" 
                                name="file"
                                accept="image/*"
                                ref={fileInputRef}
                            />
                        </Form.Group>  
                        <Button type="submit" className='w-100 mt-2'>Add Item</Button> 
                    </Form>
                </Row>
        </Container>
    );
}

export default NewItem;