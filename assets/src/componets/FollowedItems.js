import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

import NavBar from './NavBar'
import { CloudinaryContext } from '../context'

function FollowedItems() {
    let [followedItems, setFollowedItems] = useState([])
    let cld = useContext(CloudinaryContext)

    useEffect(() => {
        axios.get('/api/user/followedItems')
        .then(response => {
            setFollowedItems(response.data.items)
        }).catch(error => {
            alert(JSON.stringify(error))
        })
    }, [setFollowedItems])

    let unfollowItem = item => {
        axios.delete('/api/user/followedItems/' + item.id)
        .then(() => {
            setFollowedItems(followedItems.filter(i => i.id != item.id))
        }).catch(error => {
            alert(JSON.stringify(error))
        })
    }

    let followedItemsElemes = followedItems.map((item) => {
        return (
            <Row className="mb-2">
                <Card border="primary">
                    <Row>
                        <Col md="auto" className="my-2">
                            {item.image?
                            <Card.Img as={AdvancedImage} cldImg={cld.image(item.image).resize(thumbnail().width(175).height(250))}></Card.Img>
                            :
                            <Card.Img src="..." height="250px" width="175px"/>
                            }
                        </Col>
                        <Col className='flex-grow-1'>
                            <Card.Body className="h-100">
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Link
                                    as={Link} 
                                    to={'/items/' + item.id}
                                />
                            </Card.Body>
                        </Col>
                        <Col className='align-self-end flex-grow-0 mb-2 me-2'>
                            <Row className='mb-2'>
                                <Button variant="primary" as={Link} to={'/items/' + item.id}>
                                    Open
                                </Button>
                            </Row>
                            <Row>
                                <Button variant="danger" onClick={() => { unfollowItem(item) }}>Unfollow</Button>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Row>
        )
    })


    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            <Row lg="2" className='mt-4'>
                <Container>
                    {followedItemsElemes}
                </Container> 
            </Row>
        </Container>
    );
}

export default FollowedItems;
