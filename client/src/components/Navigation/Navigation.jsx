import { Container, Nav, Navbar, NavDropdown, Button, Form } from 'react-bootstrap'

const Navigation = () => {
    return (
        <div className="Navigation">
            <Navbar expand="lg" className="text-white fw-normal" bg="black" variant="dark" >
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Logotipo_Filmin_2023.png"
                            width="100"
                            height="auto"
                            className="d-inline-block align-top"
                        />{''}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="text-white" href="#home">Comunidades</Nav.Link>
                            <Nav.Link className="text-white" href="#link">Reseñas</Nav.Link>
                            <NavDropdown variant="light" title="Más" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Nuevas comunidaddes</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Top Reseñas
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Recomendador</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Buscar..."
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                        <Button variant="outline-light">Iniciar sesión</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation