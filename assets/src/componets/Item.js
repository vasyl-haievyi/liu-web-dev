import { Container, Row, Col, Carousel, Badge, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AdvancedImage } from '@cloudinary/react';
import axios from 'axios'
import { useSelector } from 'react-redux'

import NavBar from './NavBar'
import SearchBar from './SearchBar'
import { CloudinaryContext } from '../context'


function Item() {
    let { itemId } = useParams();
    let [item, setItem] = useState(null)
    let user = useSelector(state => state.user)
    let cld = useContext(CloudinaryContext)
    let content = <h2>Loading...</h2>

    useEffect(() => {
        axios.get('/api/items/' + itemId)
        .then(response => {
            setItem(response.data.item)
        })
        .catch(error => {
            alert(JSON.stringify(error))
        })
    }, [itemId])

    let followItem = () => {
        if (!user || !item) { return }
        axios.post('/api/user/followItem/' + item.id)
        .catch(error => {
            alert(JSON.stringify(error))
        })
    }

    if (item) {
        content = (
            <Row>
                <Row className='justify-content-md-center'>
                    <Col lg="6">
                        <Carousel interval={null} variant="dark">
                            {item.image? 
                            <Carousel.Item>
                                <Row className='justify-content-md-center'>
                                    <AdvancedImage cldImg={cld.image(item.image)}></AdvancedImage>
                                </Row>
                            </Carousel.Item>  
                            :
                            null
                            }
                            {new Array(5).fill(undefined).map(() => { 
                                return (
                                    <Carousel.Item>
                                        <Row className='justify-content-md-center'>
                                        <img src="..." height="500px" width="800px" alt=""/>
                                        </Row>
                                    </Carousel.Item>    
                                )
                            })}
                        </Carousel>
                    </Col>
                </Row>
                <Row className='justify-content-md-center mt-2'>
                    <Col lg="6">
                        <h2>{item.title}</h2>
                        <p style={{whiteSpace: 'pre-line'}}>{item.description}</p>
                        <p className="fs-2"><b>{item.price} SEK</b></p>
                        <Badge bg="primary" className="fs-5">State: {item.state}</Badge>
                    </Col>
                </Row>
                <Row className='justify-content-md-center mt-2'>
                    <Col lg="6" >
                       <Row>
                            <Link 
                                to={"/messages/" + item.seller.id}
                                className="btn btn-primary"
                            >
                                Chat with the Seller
                            </Link>
                            {user? <Button variant="dark" className='mt-2' onClick={followItem}>Follow the item</Button> : null}
                       </Row>
                    </Col>
                </Row>
            </Row>
        )
    }
    return (
        <Container fluid>
        <Row>
            <NavBar />
        </Row>
        <Row>
            <SearchBar />
        </Row>
        {content}
    </Container>
    )
}

export default Item;