import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "../styled-components";

//높이를 알기 위해 Dimensions 이용
import { ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

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
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        >
          {trending.map((movie) => (
            <VMedia
              key={`trending-${movie.id}`}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
            />
          ))}
        </TrendingScroll>
      </ListContianer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMedia
          key={`upcoming-${movie.id}`}
          posterPath={movie.poster_path}
          originalTitle={movie.original_title}
          releaseDate={movie.release_date}
          overview={movie.overview}
        />
      ))}
    </Container>
  );
};

export default Movies;

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;

  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const ListContianer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;
