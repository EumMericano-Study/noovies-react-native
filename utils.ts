import { Movie } from "./api/movie";

export const makeImgPath = (img: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;

export const keyExtractor = (item: Movie) => `${item.id}`;
