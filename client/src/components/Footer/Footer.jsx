import './Footer.css'
import { Row, Col, Container, Nav } from 'react-bootstrap'
import { Facebook, Twitter, Instagram, Tiktok, Linkedin } from 'react-bootstrap-icons'
import { Cloudinary } from '@cloudinary/url-gen'

const Footer = () => {
    return (
        <footer>
            <Container className="text-light py-4">
                <Row className="text-center mb-3">
                    <Col md={9} className='d-flex' >
                        <Nav>
                            <Nav.Link href="#" className="text-light mx-2">Centro de ayuda</Nav.Link>
                            <Nav.Link href="#" className="text-light mx-2">Aviso Legal</Nav.Link>
                            <Nav.Link href="#" className="text-light mx-2">Prensa</Nav.Link>
                            <Nav.Link href="#" className="text-light mx-2">¿Quiénes somos?</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={3} className="d-flex justify-content-start">
                        <Nav className='social-icons'>
                            <a href="#" className="text-white me-3">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-white me-3">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="text-white me-3">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-white me-3">
                                <Tiktok size={24} />
                            </a>
                            <a href="#" className="text-white me-3">
                                <Linkedin size={24} />
                            </a>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer