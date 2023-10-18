import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export const SignupView = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");
    const navigate = useNavigate()
    const [isError, setIsError] = useState(false)

    const handleSubmit = (event) => {
        setIsError(false)
        event.preventDefault();

        // const data = {
        //     Username: Username,
        //     Password: Password,
        //     Email: Email,
        //     Birthday: Birthday
        // };

        fetch("https://had-movies-d81b2962e1bc.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify({
                Username,
                Password,
                Email,
                Birthday
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
            .then(res => {
                alert("Signup successful");
                navigate("/login")
            }).catch(err => {
                console.log(err)
                setIsError(true)

                //the below code will hide the alert after 2secs
                setTimeout(() => {
                    setIsError(false)
                }, 2000)
            });
    };

    return (
        <>
            {isError && <Alert variant={"danger"} dismissible>
                Signup failed
            </Alert>}
            <Row>
                <Col md={5} className="mx-auto">
                    <h4> You Gots to Register:</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>
                                Username:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Ex: iKnowDeWay547"
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>
                                Password:
                            </Form.Label>
                            <Form.Control
                                type="password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Ex: 12345goobin"
                            />
                        </Form.Group>

                        <Form.Group control Id="formEmail">
                            <Form.Label>
                                Email:
                            </Form.Label>
                            <Form.Control
                                type="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="iknowdeway@yahoo.com"
                            />
                        </Form.Group>

                        <Form.Group control Id="formBirthday">
                            <Form.Label>
                                Birthday:
                            </Form.Label>
                            <Form.Control
                                type="date"
                                value={Birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 mt-4">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
};