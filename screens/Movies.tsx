import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "../styled-components";
//높이를 알기 위해 Dimensions 이용
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Swiper from "react-native-swiper";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";

const API_KEY = "78623a14ff23a512a97109e77e1151dc";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();

    setNowPlaying(results);
    setLoading(false);
  };

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
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3.5 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              source={{ uri: makeImgPath(movie.backdrop_path) }}
              style={StyleSheet.absoluteFill}
            />
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={10}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  {movie.vote_average !== 0 && (
                    <Votes>⭐️ {movie.vote_average} / 10</Votes>
                  )}
                  <OverView>
                    {movie.overview.slice(0, 90).trim()}
                    {movie.overview.length > 90 ? "..." : ""}
                  </OverView>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image`
  width: 100%;
  height: 100%;

  position: absolute;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const OverView = styled.Text`
  color: rgba(255, 255, 255, 0.8);

  margin-top: 10px;
`;

const Votes = styled(OverView)`
  font-size: 12px;
`;
