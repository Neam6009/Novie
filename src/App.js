import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import searchButton from './search.svg';
import MovieCard from "./Components/MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=12be321e';


const App = () => {

    const [movies, setMovies] = useState([]);
    const[searchValue,setSearchValue] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
        console.log(data.Search);
    }

    useEffect(() => {
        searchMovies('');
    }, [])

    return (
        <div className="app">
            <h1>Ebomma</h1>

            <div className="search">
                <input
                    placeholder="Search for Cinema"
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }} />
                <img src={searchButton} alt="searchButton" onClick={() => { searchMovies(searchValue)}} />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>no movies found</h2>
                </div>
            )}


        </div>
    );
}

export default App;