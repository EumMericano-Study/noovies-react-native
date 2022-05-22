const API_KEY = "78623a14ff23a512a97109e77e1151dc";
const BASE_URL = "https://api.themoviedb.org/3";

export const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

export const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((res) => res.json());

export const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((res) => res.json());
