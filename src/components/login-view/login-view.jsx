import { useState } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState("")

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
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login Response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);

                } else {
                    setIsError("No such user")

                    //the below code will hide the alert after 2secs
                    setTimeout(() => {
                        setIsError("")
                    }, 2000)
                }
            })
            .catch((e) => {
                setIsError("Something went Wrong")

                //the below code will hide the alert after 2secs
                setTimeout(() => {
                    setIsError("")
                }, 2000)
            });
    };


    return (
        <>
        {isError.length > 0 && <Alert variant={"danger"} dismissible>
           {isError}
        </Alert>}
        <Row>
            <Col md={4} className="mx-auto">
                <h4> Have an Account? Login:</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Username:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            required
                            placeholder="Enter Username"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Password:
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                            placeholder="Enter Password"
                        />
                    </Form.Group>
                    <div className="d-grid gap-2 mt-4">
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                            className="text-white"
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
</>
    );
};