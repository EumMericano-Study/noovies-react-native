import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import { renderHMedia } from "../components/HMedia";
import { HSeparator } from "../components/Separators";
import { keyExtractor } from "../utils";
import { ComingSoonTitle } from "./Movies.styles";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import { MovieResponse } from "../api/movie";
import Loader from "../components/Loader";
import HList from "../components/HList";

//높이를 알기 위해 Dimensions 이용
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isNowPlayingRefetching,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isTrendingRefetching,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isUpcomingRefetching,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);

  const isLoading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const refreshing =
    isNowPlayingRefetching || isTrendingRefetching || isUpcomingRefetching;

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  return isLoading ? (
    <Loader />
  ) : (
    upcomingData && (
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
              {nowPlayingData?.results.map((movie) => (
                <Slide
                  key={`nowPlaying-${movie.id}`}
                  backdropPath={movie.backdrop_path || ""}
                  posterPath={movie.poster_path || ""}
                  voteAverage={movie.vote_average}
                  originalTitle={movie.original_title}
                  overview={movie.overview}
                />
              ))}
            </Swiper>
            {trendingData && (
              <HList title="Treanding Movies" data={trendingData.results} />
            )}
            <ComingSoonTitle>Coming soon</ComingSoonTitle>
          </>
        }
        ItemSeparatorComponent={HSeparator}
        data={upcomingData.results}
        keyExtractor={keyExtractor}
        renderItem={renderHMedia}
      />
    )
  );
};

export default Movies;
