import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "../styled-components";
import Poster from "../components/Poster";

//높이를 알기 위해 Dimensions 이용
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";

const API_KEY = "78623a14ff23a512a97109e77e1151dc";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
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
    <Container>
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
            key={movie.id}
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
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 12)}
                {movie.original_title.length > 12 && "..."}
              </Title>
              <Votes>
                {movie.vote_average > 0
                  ? `⭐️ ${movie.vote_average} / 10`
                  : "Coming soon"}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContianer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HorizontalMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HorizontalColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Release>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 100
                ? movie.overview.slice(0, 100).trim() + "..."
                : movie.overview}
            </Overview>
          </HorizontalColumn>
        </HorizontalMovie>
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

const Movie = styled.View`
  margin-right: 15px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const ListContianer = styled.View`
  margin-bottom: 40px;
`;

const HorizontalMovie = styled.View`
  flex-direction: row;
  padding: 0px 39px;
  margin-bottom: 30px;
`;

const HorizontalColumn = styled.View`
  width: 80%;
  margin-left: 20px;
`;

const Overview = styled.Text`
  width: 80%;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;
