import { useEffect, useState } from "react";

const apiKey = '9c44b842';

const searchMovie = async function(searchKey) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s='${searchKey}'`);
    const data = await res.json();
    console.log(data);
    if (data && data.totalResults)
        return data.Search;
    throw new Error("Movie not found");
}

const getMovieDetails = async function(id) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
    console.log(res);
    if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data;
    }
    throw new Error("Movie not found");
}


export function useMovies(searchQuery, preSearchCallback, preSearchCallbackParam) {
    const [movieList, setMovieList] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // useEffect(() => {
    //   const initialMovie = 'Inception';
    //   setSearchQuery(initialMovie);
    //   onSearchHndl(initialMovie);
    // }, [onSearchHndl]);

    useEffect(() => {
        console.log(searchQuery);
        async function handleSearch(searchQuery) {
            if (searchQuery && searchQuery.length > 0)
                {
                try {
                    setMovieList([]);
                    setErrorMessage('');
                    setIsSearching(true);
                    preSearchCallback(preSearchCallbackParam);
                    const data = await searchMovie(searchQuery);
                    setMovieList(data);
                }
                catch (err) {
                    setErrorMessage(err.message);
                } finally {
                    setIsSearching(false);
                }
            }
        }
        try {
            handleSearch(searchQuery);
        } catch (err) {
            setErrorMessage(err.message);
        }
    }, [searchQuery, preSearchCallback, preSearchCallbackParam]);
    
    return {movieList, isSearching, errorMessage};
}

export function useMovieDetails(movie) {
    const [movieDetails, setMovieDetails] = useState(movie);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        async function getData(id) {
            try {
                setIsLoading(true);
                const details = await getMovieDetails(id);
                setMovieDetails(details);
            } catch (err) {
                console.error(err.message);
                setMovieDetails({});
            } finally {
                setIsLoading(false);
            }
        }
        if (!movie.Director)
            getData(movie.imdbID);
        else {
            console.log(movie);
        }
    }, [movie]);
    
    return {isLoading, movieDetails};
}
