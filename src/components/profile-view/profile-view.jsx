import { useState } from "react";
import { Button, Card, CardGroup, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ userName, token, }) => {

    function getUser() {
        console.log(userName)
        return fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${userName}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("user", JSON.stringify(result));
                return result
            });
    }

    function init() {
        getUser()
        return JSON.parse(localStorage.getItem("user"));

    }
    const [user, setUser] = useState(init());
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(JSON.stringify(user));

        let data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };


        fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${user.Username}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            }).then(async (response) => {
                console.log("response:", response);
                if (response.ok) {
                    alert("update successful");
                    const data = await response.json();
                    localStorage.setItem("user", JSON.stringify(data));
                    window.location.reload();
                } else {
                    const errorText = await response.text();

                    console.log("Error response body:", errorText);
                    alert("update failed");
                }
            })
            .catch((err) => console.log("error", err));
    };

    const deleteAccount = () => {
        fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${user.Username}`,
            {
                method: "DELETE",
                "Content-Type": "application/json",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                if (response.ok) {
                    setUser(null);
                    localStorage.clear();
                    alert("Account Deleted");
                    window.location.reload("/login");
                } else {
                    alert("Account could not be Deleted")
                }
            });
    };

    return (
        <>
            <Container className="">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <CardGroup>
                            <Card className="mb-5 border border-0 card-custom">
                                <Card.Body>
                                    <Card.Title>My Profile</Card.Title>
                                    <Card.Text>Change your Infos</Card.Text>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <Form.Label>
                                                username:
                                                <Form.Control
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                    }}
                                                    placeholder={user?.username}
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
                                                />
                                            </Form.Label>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                email:
                                                <Form.Control
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                    placeholder={user?.email}
                                                />
                                            </Form.Label>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                birth:
                                                <Form.Control
                                                    type="date"
                                                    value={birthday}
                                                    onChange={(e) => {
                                                        setBirthday(e.target.value);
                                                    }}
                                                />
                                            </Form.Label>
                                        </Form.Group>
                                        <Link to="/movies">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                onClick={handleSubmit}
                                                className="text-white mt-4" >
                                                Update Yo Profile
                                            </Button>
                                        </Link>
                                    </Form>
                                    <Button
                                        variant="danger"
                                        type=""
                                        onClick={deleteAccount}
                                        className="text-white mt=3">
                                        Delete Yo Account
                                    </Button>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className="justify-content-md-center align-items-center">
                    {user?.FavoriteMovies?.map((movie) => {
                        return (
                            <Col
                                key={movie._id}
                                className="mb-4 justify-content-center align-items-center d-flex"
                            >
                                <MovieCard
                                    movie={movie}
                                    setUser={setUser}
                                    user={user}
                                >
                                </MovieCard>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};





