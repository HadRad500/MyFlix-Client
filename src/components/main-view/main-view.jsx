import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export function MainView() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // if (!token) {
        //     return
        // }

        fetch("https://had-movies-d81b2962e1bc.herokuapp.com/movies",
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // }
        ).then(res => res.json())
            .then(result => {
                setMovies(result)
                console.log(result)

            })

    }, [])


    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </>
        );
    }

    if (movies.length === 0) {
        return <div> The list is empty!</div>;
    }

    if (selectedMovie) {
        return (
            <>
                <button
                    onClick={() => {
                        setUser(null);
                    }}
                >
                    Logout
                </button>

                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
            </>
        );
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
}


// export const MainView = () => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const storedToken = localStorage.getItem("token");
//     const [user, setUser] = useState(storedUser ? storedUser : null);
//     const [token, setToken] = useState(storedToken ? storedToken : null);
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         if (!token) {
//             return;
//         }
//         fetch("https://had-movies-d81b2962e1bc.herokuapp.com/movies", {
//             headers: { Authorization: `Bearer ${token}` }
//         })

//             .then((response) => response.json())
//             .then((movies) => {
//                 setMovies(movies);
//             });
//     }, [token]);
// // }
// {/* <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//     }, []) */}
//                 /*const moviesFromApi = data.docs.map((doc) => {
//                     return {
//                         id: doc.key,
//                         title: doc.title,
//                         genre: doc.genre,
//                         image: ``,
//                         director: doc.director_name?.[0]
//                     };
//                 });
//                 setMovies(moviesFromApi);
//             });
//     }, [])*/;

// const [selectedMovie, setSelectedMovie] = useState(null);

// const [token, setToken] = useState(null);
// if (!user) {
//     return (
//         <>
//             <LoginView
//                 onLoggedIn={(user, token) => {
//                     setUser(user);
//                     setToken(token);
//                 }}
//             />
//             or
//             <SignupView />
//         </>
//     );
// }

// if (selectedMovie) {
//     return (
//         <>
//             <button
//                 onClick={() => {
//                     setUser(null);
//                 }}
//             >
//                 Logout
//             </button>

//             <MovieView
//                 movie={selectedMovie}
//                 onBackClick={() => setSelectedMovie(null)}
//             />
//         </>
//     );
// }

// if (movies.length === 0) {
//     return <div> The list is empty!</div>;
// }

// return (
//     <div>
//         {movies.map((movie) => (
//             <MovieCard
//                 key={movie._id}
//                 movie={movie}
//                 onBookClick={(newSelectedMovie) => {
//                     setSelectedMovie(newSelectedMovie);
//                 }}
//             />
//         ))}
//     </div>
// );
// };