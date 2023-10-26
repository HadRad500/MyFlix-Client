import { useState, useEffect } from "react";
import { Button, Card, CardGroup, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ userName, movies, token, getUser, user: userProfile }) => {

    const [Username, setUsername] = useState(userProfile.Username || "");
    const [Password, setPassword] = useState(userProfile.Password || "");
    const [Email, setEmail] = useState(userProfile.Email || "");
    const [Birthday, setBirthday] = useState(userProfile.Birthday || "");

    console.log("userProfile: ", userProfile.FavoriteMovies)
    console.log("movies: ", movies)

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(JSON.stringify(user));

        let data = {
            Username,
            Password,
            Email,
            Birthday,
        };


        fetch(`https://movie-api-r6ua.onrender.com/users/${user.Username}`,
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

    // function getFavoriteMovies(movies) {
    //     // const arr = []
    //     // for (let index = 0; index < movies.length; index++) {
    //     //     for (let y = 0; y < userProfile.FavoriteMovies.length; y++) {
    //     //         if (movies[index].id == userProfile.FavoriteMovies[y]) {
    //     //             arr.push(movies[index])
    //     //         }
    //     //     }
    //     // }
    //     return movies.filter(movie => userProfile.FavoriteMovies.includes(movie.id))
    // }


    // const favoriteMovies = getFavoriteMovies(movies)

    const deleteAccount = () => {
        fetch(`https://movie-api-r6ua.onrender.com/users/${user.Username}`,
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
                    <Col md={6}>
                        <div>{userProfile.Username}</div>
                        <div>{userProfile.Email}</div>
                        <div>{userProfile.Birthday}</div>
                    </Col>
                    <Col md={6}>
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
                    {(userProfile.FavoriteMovies).map((movie) => {
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





