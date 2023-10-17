import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'


export const MovieCard = ({ movie, getUser, user }) => {
    const token = localStorage.getItem("token");

    //     useEffect(() => {
    //         console.log(user);
    //         if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
    //             setIsFavorite(true);
    //         }
    //     }, []);

    const addFavoriteMovie = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        console.log("Add FavoriteMovies")
        fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => response.json())
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
        fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => response.json())
            .then((response) => {
                getUser()
                console.log("Removed from List!")
            }).catch(e => {
                console.log(e)
                console.log("it didnt work")
            })
    }

    const isFave = (user.FavoriteMovies || []).includes(movie.id)

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Card.Text>{movie.genre}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <Button variant="link"> More Info </Button>
                </Link>

                {isFave ? <Button
                    className="btn-fav-movie"
                    variant="link"
                    onClick={removeFavoriteMovie}
                >
                    <svg
                        baseProfile="full"
                        width="30"
                        height="30"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="150" cy="100" r="90" fill="red" />
                        <path
                            fill-rule="evenodd"
                        />
                    </svg>
                </Button>
                    :
                    <Button
                        className="btn-fav-movie"
                        variant="link"
                        onClick={addFavoriteMovie}
                    >
                        <svg
                            baseProfile="full"
                            width="30"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="150" cy="100" r="90" fill="white" />
                        </svg>
                    </Button>
                }
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