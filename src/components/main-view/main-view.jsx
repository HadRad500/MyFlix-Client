import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Get Shorty",
            description: "The story follows a Miami mobster who goes to LA to collect some outstanding debts, and in the process becomes a movie producer.",
            genre: "Comedy",
            image:
                "https://www.originalfilmart.com/cdn/shop/products/Get_Shorty_1995_original_film_art_56860cce-91f7-43d9-ac4b-e415e6f81c8b.jpg?v=1633380611",
            director: "Barry SonnenFeld"
        },

        {
            id: 2,
            title: "Dune",
            description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
            genre: "Science Fiction",
            image:
                "https://m.media-amazon.com/images/I/61QbqeCVm0L.jpg",
            director: "Denis Villeneuve"
        },

        {
            id: 3,
            title: "Wall-E",
            description: "WALL-E, short for Waste Allocation Load Lifter Earth-class, is the last robot left on Earth. He spends his days tidying up the planet, one piece of garbage at a time.",
            genre: "Animated",
            image:
                "https://m.media-amazon.com/images/I/51RoZRgIHtL._AC_UF894,1000_QL80_.jpg",
            director: "Andrew Stanton"
        },

    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div> The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onBookClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};