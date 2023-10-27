import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'


export const MovieCard = ({ movie, getUser, isFave }) => {
    const token = localStorage.getItem("token");


    const addFavoriteMovie = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        console.log("Add FavoriteMovies")
        fetch(`https://movie-api-r6ua.onrender.com/users/${storedUser.Username}/movies/${movie.id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => response.json())
            .then((response) => {
                getUser()
                console.log("Added to List!")
            }).catch(e => {
                console.log(e)
                console.log("it didnt work")
            })
    }

    const removeFavoriteMovie = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));


        console.log("Removed FavoriteMovies")
        fetch(`https://movie-api-r6ua.onrender.com/users/${storedUser.Username}/movies/${movie.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => response.json())
            .then((response) => {
                getUser()
                console.log("Removed from List!")
            }).catch(e => {
                console.log(e)
                console.log("it didnt work")
            })
    }



    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Card.Text>{movie.genre}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <Button
                        variant="primary"
                    >
                        More Info
                    </Button>
                </Link>

                <Col className="col-3">
                    {isFave ? (
                        <Button
                            className="btn-fav-movie"
                            variant="link"
                            onClick={removeFavoriteMovie}
                        >
                            <svg
                                width="25"
                                height="25"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="red"
                                className="bi bi-heart-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                />
                            </svg>
                        </Button>
                    ) : (
                        <Button
                            className="btn-fav-movie"
                            variant="link"
                            onClick={addFavoriteMovie}
                        >
                            <svg
                                width="25"
                                height="25"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="red"
                                className="bi bi-heart"
                                viewBox="0 0 16 16"
                            >
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 
                            1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 
                            2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </Button>
                    )}
                </Col>
            </Card.Body>
        </Card>

    );
};

// MovieCard.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired
//         //         Text: PropTypes.string.isRequired,
//         //         image: PropTypes.string.isRequired,
//         //         director: PropTypes.string,
//         //         genre: PropTypes.string
//     }).isRequired,
// };