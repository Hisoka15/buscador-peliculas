const API_KEYS = "4287ad07";

export const searchMovies = async ({ search }) => {
  if (search == "") return null;

  try {
    const reponse = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEYS}&s=${search}`
    );
    const json = await reponse.json();

    const movies = json.Search;
    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (e) {
    throw new Error("Error searching movies");
  }
};
