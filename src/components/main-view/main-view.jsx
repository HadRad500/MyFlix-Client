import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export function MainView() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    function getUser() {
        console.log(storedUser.Username)
        fetch(`https://had-movies-d81b2962e1bc.herokuapp.com/users/${storedUser.Username}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("user", JSON.stringify(result));
                setUser(result)
            });
    }

    function onUserLogin(user, token) {
        setUser(user),
            setToken(token)
    }

    function onUserLogout() {
        setUser(null)
        setToken(null)
        localStorage.clear()
    }

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://had-movies-d81b2962e1bc.herokuapp.com/movies",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => res.json())
            .then((result) => {
                //console.log(result)

                const formattedResult = result.map((res) => ({
                    title: res.Title,
                    genre: res.Genre.Name,
                    director: res.Director.Name,
                    image: res.ImagePath,
                    id: res._id
                }));
                console.log("formatted", formattedResult)
                setMovies(formattedResult)
            });

    }, [token]);


    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={onUserLogout}
            />
            <Routes>
                <Route
                    path="/signup"
                    element={
                        <SignupView />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <LoginView onLoggedIn={onUserLogin} />
                            )}
                        </>
                    }
                />
                <Route
                    path="/movies/:movieTitle"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <MovieView movies={movies} />
                            )}
                        </>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProfileView
                            user={user}
                            token={token}
                            movies={movies}
                            setuser={setUser}
                        />
                    }
                />

                <Route
                    path="/"
                    element={
                        <Row>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The List is Empty</Col>
                            ) : (
                                <>
                                    {movies.map((movie) => (
                                        <Col className="mb-4" key={movie.id} md={3}>
                                            <MovieCard
                                                movie={movie}
                                                getUser={getUser}
                                                user={user}
                                            />
                                        </Col>
                                    ))}
                                </>
                            )}
                        </Row>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}



/*if (!user) {
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
}*/
