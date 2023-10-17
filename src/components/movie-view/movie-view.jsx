import React from 'react'
import { useParams } from "react-router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../movie-view/movie-view.scss";

export const MovieView = ({ movies }) => {
    const [movie, setMovie] = React.useState(undefined)
    const { movieTitle } = useParams() //https://reactrouter.com/en/main/hooks/use-params
    //http://localhost:3000/movie/{movieId}


    React.useEffect(() => {
        if (!movieTitle) {
            return
        }

        function getMovie() {
            fetch(
                `https://had-movies-d81b2962e1bc.herokuapp.com/movies/${movieTitle}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    setMovie(result);
                }).catch(e => {
                    console.log(e)
                });
        }

        getMovie()

    }, [movieTitle])


    if (!movie) {
        return <div>Not found</div>
    }

    return (
        <>
            <Container className="">
                <Row className="justify-content-md-center">
                    <Col className="col-lg-6">
                        <Card className="border-0 moviePoster mx-auto">
                            <Card.Img src={movie.ImagePath} className="rounded-4" />
                        </Card>
                    </Col>
                    <Col className="col-lg-6 mt-5 mt-md-0">
                        <Card className="movie-infos border-0 h-100 card-custom">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="fs-2">{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                                <Card.Title>Director:</Card.Title>
                                <Card.Text>{movie.Director.Name}</Card.Text>
                                <Card.Title>Genre:</Card.Title>
                                <Card.Text>{movie.Genre.Name}</Card.Text>
                            </Card.Body>
                            <Link to="/movies">
                                <Button className="mt-auto m-4" variant="primary">
                                    Back
                                </Button>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};






/*<div>
            <div>
                <img className="w-100" src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <Link to={'/'}>
                <button className="back-button"> Back </button>
            </Link>
        </div>
    );
};*/