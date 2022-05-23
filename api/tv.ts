import { API_KEY, BASE_URL } from "../constants";

export const trending = () =>
  fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

export const airingToday = () =>
  fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

export const topRated = () =>
  fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
