import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";


export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Card.Text>{movie.genre}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
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
    onMovieClick: PropTypes.func.isRequired
};