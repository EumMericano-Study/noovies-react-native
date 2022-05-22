import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//높이를 알기 위해 Dimensions 이용
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import { renderVMedia } from "../components/VMedia";
import { renderHMedia } from "../components/HMedia";
import { HSeparator, VSeparator } from "../components/Separators";
import { keyExtractor } from "../utils";
import {
  ComingSoonTitle,
  ListContianer,
  ListTitle,
  Loader,
  TrendingScroll,
} from "./Movies.styles";

const API_KEY = "78623a14ff23a512a97109e77e1151dc";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();

    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();

    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 3.5,
              marginBottom: 30,
            }}
          >
            {nowPlaying.map((movie) => (
              <Slide
                key={`nowPlaying-${movie.id}`}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
                originalTitle={movie.original_title}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContianer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 30 }}
              ItemSeparatorComponent={VSeparator}
              data={trending}
              keyExtractor={keyExtractor}
              renderItem={renderVMedia}
            />
          </ListContianer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      ItemSeparatorComponent={HSeparator}
      data={upcoming}
      keyExtractor={keyExtractor}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
