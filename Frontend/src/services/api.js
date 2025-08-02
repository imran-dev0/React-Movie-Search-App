
export const getPopularMovies = async () => {
  const res = await fetch("http://localhost:5000/api/popular");
  const data = await res.json();
  return data;
};

export const searchMovies = async (query) => {
  const res = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data;
};
