import { useEffect, useState, useRef } from "react";
import StarRating from "./StarRating";
import { useMovieDetails, useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKeyDownListener } from "./useKeyListener";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelected] = useState(null);
  const [watchedList, setWatchedList] = useLocalStorageState([], 'watched_movies');
  
  const {movieList, isSearching, errorMessage} = useMovies(searchQuery, setSelected, null);
  
  useEffect(() => {
    console.log(watchedList);
  }, [watchedList])
  
  function onSelectMovie(id) {
    let watched = watchedList.find((m) => m.imdbID === id);
    if (!watched)
      watched = {imdbID: id}
    
    setSelected(selected => (selected?.imdbID === id ? null : watched))
  }
  
  function handleAddWatched(movie) {
    const watched = watchedList.find((m) => m.imdbID === movie.imdbID);
    if (watched) {
      setWatchedList(l => l.map(m => m.imdbID === movie.imdbID ? movie : m));
    } else {
      setWatchedList(l => [...l, movie]);
    }
    setSelected(null);
  }
  
  function handleRemoveWatched(id) {
    setWatchedList(l => l.filter(m => m.imdbID !== id));
    setSelected(null);
  }
  
  return (
    <>
    <NavBar>
    <Logo />
    <Search onSearchHndl={setSearchQuery}/>
    <Results movieList={movieList} />
    </NavBar>
    <Main>
    <ToggleBox>
    {isSearching ? <Loader /> :
      (errorMessage.length > 0 ? <ErrorMessage message={errorMessage} /> :
        <List>
        {movieList.map(mov => (
          <MovieThump movie={mov} key={mov.imdbID} onSelectMovie={onSelectMovie}>
          <MovieParams releasedYear={mov.Year} />
          </MovieThump>
        ))}
        </List>
      )
    }
    </ToggleBox>
    <ToggleBox>
    {selectedMovie ?
      <MovieDetails key={selectedMovie.imdbID} movie={selectedMovie}
      onCloseDetails={() => setSelected(null)}
      onAddWatched={handleAddWatched}
      onRemoveWatched={handleRemoveWatched}/>
      :
      <>
      <WatchedSummary watchedList={watchedList} />
      <List>
      {watchedList.map(mov => (
        <MovieThump movie={mov} key={mov.imdbID} onSelectMovie={onSelectMovie}>
        <MovieParams imdbRating={mov.imdbRating} userRating={mov.userRating} duration={mov.runtime}/>
        </MovieThump>
      ))}
      </List>
      </>
    }
    </ToggleBox>
    </Main>
    </>
  );
}

function Main({children}) {
  return (
    <div className="main">
    {children}
    </div>
  );
}

function NavBar({children}) {
  
  return (
    <div className="nav-bar">
    {children}
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
    </div>
  );
}

function Search({onSearchHndl}) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputEl = useRef(null);
  
  function enterKeyListener() {
    if (document.activeElement === inputEl.current)
      return;
    
    inputEl.current.focus();
    setSearchQuery('');
  }
  
  useKeyDownListener('Enter', enterKeyListener);
  
  function handleSearch(e) {
    if (e.key.toLowerCase() === 'enter')
      onSearchHndl(searchQuery)
  }
  
  return (
    <input className="search" type="text"
    placeholder="Search movies ..."
    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={handleSearch} ref={inputEl}
    />
  );
}

function Loader() {
  return (<p className="loader">Loading...</p>);
}

function ErrorMessage({message}) {
  return (
    <p className="error">⛔️ Something went wrong: {message}</p>
  );
}

function Results({movieList}) {
  return (
    <p className="num-results">
    Found <strong>{movieList.length}</strong> results
    </p>
  )
}

function MovieThump({children, movie, onSelectMovie}) {
  return (
    <li key={movie.imdbID} onClick={() => (onSelectMovie && onSelectMovie(movie.imdbID))}>
    <img src={movie.Poster} alt={movie.Title} />
    <h3>{movie.Title}</h3>
    <div>{children}</div>
    </li>
  )
}

function MovieParams({quantity, releasedYear, genre, imdbRating, userRating, duration}) {
  return (
    <>
    {quantity && (
      <p>
      <span>#️⃣</span>
      <span>{quantity} movies</span>
      </p>
    )}
    {releasedYear && (
      <p>
      <span>🗓️</span>
      <span>{releasedYear}</span>
      </p>
    )}
    {genre && (
      <p>
      {genre}
      </p>
    )}
    {imdbRating && (
      <p>
      <span>⭐️</span>
      <span>{imdbRating}</span>
      </p>
    )}
    {userRating && (
      <p>
      <span>🤩</span>
      <span>{userRating}</span>
      </p>
    )}
    {duration && (
      <p>
      <span>⏳</span>
      <span>{duration} mins</span>
      </p>
    )}
    </>
  );
}

const average = function(itemList) {
  return itemList.reduce((a, b) => (Number(a) || 0) + (Number(b) || 0), 0) / itemList.length;
}

function WatchedSummary({watchedList}) {
  
  const avgRating = average(watchedList.map(mv => mv.imdbRating));
  const avgUserRating = average(watchedList.map(mv => mv.userRating));
  const avgDuration = average(watchedList.map(mv => mv.Runtime.split(' ').at(0)));
  
  return (
    <div className="summary">
    <h2>Movies you watched</h2>
    {watchedList.length &&
      <div>
      <MovieParams quantity={watchedList.length} imdbRating={avgRating.toFixed(1)} userRating={avgUserRating.toFixed(1)} duration={Math.trunc(avgDuration)}/>
      </div>
    }
    </div>
  );
}

function List({children}) {
  return (
    <ul className="list">
    {children}
    </ul>
  )
}

function ToggleBox({children}) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="box">
    <button className="btn-toggle" onClick={() => setIsOpen(io => !io)}>
    {isOpen ? '−' : '+' }
    </button>
    {isOpen && children}
    </div>
  )
}

function MovieDetails({movie, onCloseDetails, onAddWatched, onRemoveWatched}) {
  const [userRating, setUserRating] = useState(movie.userRating);
  const {isLoading, movieDetails} = useMovieDetails(movie);
  const ratingsRef = useRef(movie && movie.ratingHist ? movie.ratingHist : []);
  
  useKeyDownListener('Escape', onCloseDetails);
  
  const {
    imdbID,
    Title,
    Poster,
    Released,
    Runtime,
    Genre,
    imdbRating,
    Plot,
    Actors,
    Director
  } = movieDetails;
  
  useEffect(() => {
    if (userRating && (ratingsRef.current.at(-1) !== userRating))
      ratingsRef.current = [...ratingsRef.current, userRating];
  }, [userRating]);
  
  useEffect(() => {
    document.title = `Movie | ${Title}`;
    
    return function() {
      document.title = 'usePopcorn';
    }
  }, [Title]);
  
  function handleAddWatched() {
    const watchedMovie = {
      imdbID: imdbID,
      Title: Title,
      Poster: Poster,
      Released: Released,
      Runtime: Runtime,
      Genre: Genre,
      imdbRating: imdbRating,
      Plot: Plot,
      Actors: Actors,
      Director: Director,
      userRating: userRating,
      ratingHist: ratingsRef.current
    }
    console.log(watchedMovie);
    onAddWatched(watchedMovie);
  }
  
  return (
    <div className="details">
    {isLoading && <Loader />}
    {movieDetails &&
      <>
      <header>
      <button className="btn-back" onClick={onCloseDetails}>&larr;</button>
      <img src={Poster} alt={Title} />
      <div className="details-overview">
      <h2>{Title}</h2>
      <p>
      {Released} &bull; {Runtime}
      </p>
      <MovieParams genre={Genre}
      imdbRating={imdbRating}/>
      </div>
      </header>
      <section>
      <div className="rating">
      <StarRating maxRating={10} defaultRating={userRating || 0} size={24} onSetRating={setUserRating}/>
      <div className="rating actions">
      <button className="btn-action btn-add" onClick={handleAddWatched}>
      {movie.Director ? '🤩 Update Rating' : '✚ Add to Watched'}
      </button>
      {movie.Director && <button className="btn-action btn-remove" onClick={() => onRemoveWatched(imdbID)}>╳ Remove</button>}
      </div>
      </div>
      <p><em>{Plot}</em></p>
      <p>Starring {Actors}</p>
      <p>Directed by {Director}</p>
      </section>
      </>
    }
    </div>
  )
}