import { useState } from "react";
import { Card, CardGroup, Col, Container, Form, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://had-movies-d81b2962e1bc.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((data) => {
                console.log("Login Response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);

                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went Wrong");
            });
    };


    return (
        <Container className="margin-top-custom">
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <CardGroup classname="">
                        <Card classname="mb-5 border border-0">
                            <Card.Body>
                                <Card.Title> Have an Account? Login:</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>
                                            Username:
                                            <Form.Control
                                                type="text"
                                                value={username}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                                required
                                                placeholder="Enter Username"
                                            />
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>
                                            Password:
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                required
                                                placeholder="Enter Password"
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="text-white"
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

    );
};