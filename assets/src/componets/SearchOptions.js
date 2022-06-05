import { useSelector } from 'react-redux';
import { Form, Container, Row, Col } from 'react-bootstrap'

function SearchOptions ({ checked, onCheckedChange }) {
    let categories = useSelector(state => state.categories)

    let items = categories.map((category) => {
        return (
            <Row className="align-items-center">
                <Col>
                    <Form>
                        <Form.Check
                        type="checkbox"
                        variant="primary"
                        label={category.title}
                        id={category.id}
                        checked={checked.includes(category.id)}
                        onChange={(e) => {onCheckedChange(category.id, e.target.checked)}}
                        />
                    </Form>
                </Col>
            </Row>
        )
    });

    return (
        <Container className="border border-primary rounded pe-0">
            {items}
        </Container>
    )
}


export default SearchOptions;