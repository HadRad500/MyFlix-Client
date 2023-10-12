import { useParams } from "react-router";
import { Link, useParams } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams() //https://reactrouter.com/en/main/hooks/use-params
    //http://localhost:3000/movie/{movieId}
    const movie = movies.find(mov => mov.id === movieId)

    if (!movie) {
        return <div>Not found</div>
    }

    return (
        <div>
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
};