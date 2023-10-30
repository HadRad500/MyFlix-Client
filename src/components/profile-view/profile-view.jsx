import { useState } from "react";
import { Alert, Button, Card, CardGroup, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import dayjs from "dayjs";

export const ProfileView = ({ token, getUser, user: userProfile }) => {
    const [message, setMessage] = useState({
        message: "",
        variant: ""
    });
    const [Username, setUsername] = useState(userProfile?.Username || "");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState(userProfile?.Email || "");
    const [Birthday, setBirthday] = useState(dayjs(userProfile?.Birthday).format("YYYY-MM-DD") || "");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://movie-api-r6ua.onrender.com/users/${userProfile?.Username}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    Username,
                    Password,
                    Email,
                    Birthday,
                })
            }).then(resp => resp.text())
            .then((response) => {
                getUser()
                setMessage({ variant: "success", message: "User information updated!" })
                setTimeout(() => {
                    setMessage({ variant: "", message: "" })
                }, 3000)
            })
            .catch((err) => {
                setMessage({ variant: "danger", message: "User information failed to update!" })

                setTimeout(() => {
                    setMessage({ variant: "", message: "" })
                }, 3000)
                console.log("error", err)
            });
    };

    const deleteAccount = () => {
        fetch(`https://movie-api-r6ua.onrender.com/users/${userProfile?.Username}`,
            {
                method: "DELETE",
                "Content-Type": "application/json",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                if (response.ok) {
                    //setUser(null);
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
                    <Col md={6}>
                        <div>Username: {userProfile?.Username}</div>
                        <div>Email: {userProfile?.Email}</div>
                        <div>Birthday: {dayjs(userProfile?.Birthday).format("YYYY-MM-DD")}</div>
                    </Col>
                    <Col md={6}>
                        {message.message && <Alert variant={message.variant}>{message.message}</Alert>}
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
                                                    value={Username}
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                    }}
                                                    placeholder={Username}
                                                />
                                            </Form.Label>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                Password:
                                                <Form.Control
                                                    type="password"
                                                    value={Password}
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
                                                    value={Email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                    placeholder={"email@email.com"}
                                                />
                                            </Form.Label>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                birth:
                                                <Form.Control
                                                    type="date"
                                                    value={Birthday}
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
                    {(userProfile?.FavoriteMovies || []).map((movie) => {
                        return (
                            <Col
                                md={3}
                                key={movie._id}
                                className="mb-4 justify-content-center align-items-center d-flex"
                            >
                                <MovieCard
                                    movie={{ id: movie._id, title: movie.Title, director: movie.Director.Name, genre: movie.Genre.Name, image: movie.ImagePath }}
                                    getUser={getUser}
                                    user={userProfile}
                                    isFave={true}
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





