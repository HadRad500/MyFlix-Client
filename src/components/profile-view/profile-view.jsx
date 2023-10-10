import React, { useEffect, useState } from "react";
import { Button, Card, CardGroup, Col, Container, Form, Row }
import { Link } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";


const ProfileView = ({ user, token, movies, setUser }) => {

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        let result = movies.filter((m) => user.favoriteMovies.includes(m._id));

        fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${user.username}`,
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
        fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${user.username}`,
            {
                method: "DELETE",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

    }
    ).then((response) => {
                if (response.ok) {
                    setUser(null);
                    localStorage.clear();
                    alert("Account Deleted");
                    window.location.reload("/login");
                } else {
                    alert("Account could not be Deleted")
                }
            });

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
                                <Form onSubmit={handleUpdate}>
                                    <Form.Group>
                                        <Form.Label>
                                            username:
                                            <Form.Control
                                                type="text"
                                                value={username}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                                placeholder={user.username}
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
                                                placeholder={user.email}
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

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleUpdate}
                                        className="text-white mt-4" >
                                        Update Yo Profile
                                    </Button>
                                </Form>
                                <Link to="/login">
                                    <Button
                                        variant="danger"
                                        type=""
                                        onClick={deleteAccount}
                                        className="text-white mt=3">
                                        Delete Yo Account
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

        <Container>
            <Row className="justify-content-md-center align-items-center">
                {result.map((movie) => {
                    return (
                        <Col
                            key={movie._id}
                            className="mb-4 justify-content-center align-items-center d-flex"
                        >
                            <MovieCard
                                movie={movie}
                                token={token}
                                setUser={setUser}
                                user={user}
                            />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    </>
);
};




