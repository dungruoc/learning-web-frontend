import { useState } from "react";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [movieList, setMovieList] = useState(tempMovieData);
  const [watchedList, setWatchedList] = useState(tempWatchedData);

  return (
    <>
    <NavBar>
      <Logo />
      <Search />
      <Results movieList={movieList} />
    </NavBar>
    <Main>
      <ToggleBox>
        <List>
          {movieList.map(mov => (
            <MovieThump movie={mov} key={mov.imdbID}>
              <MovieParams releasedYear={mov.Year} />
            </MovieThump>
          ))}
        </List>
      </ToggleBox>
      <ToggleBox>
        <WatchedSummary watchedList={watchedList} />
        <List>
          {watchedList.map(mov => (
            <MovieThump movie={mov} key={mov.imdbID}>
              <MovieParams imdbRating={mov.imdbRating} userRating={mov.userRating} duration={mov.runtime}/>
            </MovieThump>
          ))}
        </List>
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

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <input className="search" type="text"
      placeholder="Search movies ..."
      value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

function Results({movieList}) {
  return (
    <p className="num-results">
      Found <strong>{movieList.length}</strong> results
    </p>
  )
}

function MovieThump({children, movie}) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <div>{children}</div>
    </li>
  )
}

function MovieParams({quantity, releasedYear, imdbRating, userRating, duration}) {
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
  return itemList.reduce((a, b) => a + b, 0) / itemList.length;
}

function WatchedSummary({watchedList}) {

  const avgRating = average(watchedList.map(mv => mv.imdbRating));
  const avgUserRating = average(watchedList.map(mv => mv.userRating));
  const avgDuration = average(watchedList.map(mv => mv.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <MovieParams quantity={watchedList.length} imdbRating={avgRating} userRating={avgUserRating} duration={Math.trunc(avgDuration)}/>
      </div>
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