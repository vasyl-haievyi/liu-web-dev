import { Container, Row, Col, Carousel, Badge } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import NavBar from './NavBar'
import SearchBar from './SearchBar'
import axios from 'axios'

function Item() {
    let { itemId } = useParams();
    let [item, setItem] = useState(null)
    let content = <h2>Loading...</h2>

    useEffect(() => {
        axios.get('/api/items/' + itemId)
        .then(response => {
            setItem(response.data.item)
        })
        .catch(error => {
            alert(JSON.stringify(error))
        })
    }, [])

    if (item) {
        content = (
            <Row>
                <Row className='justify-content-md-center'>
                    <Col lg="6">
                        <Carousel interval={null} variant="dark">
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
                                to={{
                                    pathname: "/messages",
                                    search: `?user=${item.seller.id}`
                                }}
                                className="btn btn-primary"
                            >
                                Chat with the Seller
                            </Link>
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