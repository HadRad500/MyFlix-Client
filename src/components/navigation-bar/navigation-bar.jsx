import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form } from "react-bootstrap";
import Img from "../img/MyFlix Img.jpeg";



export function NavigationBar({ user, onLoggedOut, setSearch }) {
    return (
        <Navbar
            expand="md"
            className="mb-5 justify-content-end navbar-style"
        >
            <Container className="align-bottom navbar-style">
                <img
                    alt=""
                    src={Img}
                    width="80px"
                    height="auto"
                    className="d-inline-block align-top"
                />

                <Navbar.Brand className="align-bottom navbar-style">
                    List
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end d-flex flex-grow-1">
                        {!user ? (
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/login"> Login </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/signup"> Signup </Nav.Link>
                                </Nav.Item>
                            </>
                        ) : (
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/movies"> Home </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/profile"> Profile </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/login" onClick={onLoggedOut}>
                                        Logout </Nav.Link>
                                </Nav.Item>
                                {/*<Nav.Item>
                                <Nav.Link href="/login" onClick={onLoggedOut}> Logout </Nav.Link>
    </Nav.Item>*/}
                                <Form className="d-flex navbar-style">
                                    <Form.Control
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                </Form>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}