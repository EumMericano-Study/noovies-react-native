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
import { useQuery } from "react-query";
import { moviesApi } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: nowPlayingRefetch,
    isRefetching: isNowPlayingRefetching,
  } = useQuery("nowPlaying", moviesApi.nowPlaying);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: trendingRefetch,
    isRefetching: isTrendingRefetching,
  } = useQuery("trending", moviesApi.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: upcomingRefetch,
    isRefetching: isUpcomingRefetching,
  } = useQuery("upcoming", moviesApi.upcoming);

  const isLoading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const refreshing =
    isNowPlayingRefetching || isTrendingRefetching || isUpcomingRefetching;
  const onRefresh = async () => {
    nowPlayingRefetch();
    trendingRefetch();
    upcomingRefetch();
  };

  return isLoading ? (
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
            {nowPlayingData.results.map((movie) => (
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
              data={trendingData.results}
              keyExtractor={keyExtractor}
              renderItem={renderVMedia}
            />
          </ListContianer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      ItemSeparatorComponent={HSeparator}
      data={upcomingData.results}
      keyExtractor={keyExtractor}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
