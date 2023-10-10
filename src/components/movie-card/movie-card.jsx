import PropTypes from "prop-types";
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap";


export const MovieCard = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState();

    useEffect(() => {
        console.log(user);
        if (user.favoriteMovies && user.favoriteMovies.inclludes(movie._id)) {
            setIsFavorite(true);
        }
    });

    const addFavoriteMovie = () => {
        console.log("Add FavoriteMovies")
        fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${user.username}/movies`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log("failed to add movie")
                    }
                })
            })

            .then((response) => {
                if (response.ok) {
                    localStorage.setItem("user", JSON.stringify(response));
                    setIsFavorite(true);
                    console.log("Added to List!")
                }
            })
    }
}

const removeFavoriteMovie = () => {
    console.log("Remove FavoriteMovies")
    fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${user.username}/movies`,
        {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
                        .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("failed to remove movie")
                }
            })
        })

        .then((response) => {
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(response));
                setIsFavorite(true);
                console.log("Removed from List!")
            }
        })
}

return (
    <Card className="h-100">
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director}</Card.Text>
            <Card.Text>{movie.genre}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Button variant="link"> Open </Button>
            </Link>
        </Card.Body>
    </Card>

);
    };

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
        //         Text: PropTypes.string.isRequired,
        //         image: PropTypes.string.isRequired,
        //         director: PropTypes.string,
        //         genre: PropTypes.string
    }).isRequired,
};