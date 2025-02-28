import "./App.css";

import { useMovies } from "./hooks/useMovies.js";
import { Movies } from "./components/Movies.jsx";
import { useState, useEffect, useRef } from "react";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search == "";
      return;
    }
    if (search == "") {
      setError("no se puede buscar una pelicula con el campo vacio");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda tiene que contener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);
  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const handleSubmit = event => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = event => {
    updateSearch(event.target.value);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent ",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Avengers,Arcane,One Piece, HxH ..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
