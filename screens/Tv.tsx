import { View, Text, ScrollView, FlatList } from "react-native";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia, { renderVMedia } from "../components/VMedia";

const Tv = () => {
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ["tv", "today"],
    tvApi.airingToday
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ["tv", "top"],
    tvApi.topRated
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvApi.trending
  );

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) return <Loader />;
  return (
    <ScrollView>
      <FlatList
        horizontal
        data={todayData.results}
        renderItem={({ item }) => (
          <VMedia
            originalTitle={item.original_name}
            posterPath={item.poster_path}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        horizontal
        data={trendingData.results}
        renderItem={({ item }) => (
          <VMedia
            originalTitle={item.original_name}
            posterPath={item.poster_path}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        horizontal
        data={topData.results}
        renderItem={({ item }) => (
          <VMedia
            originalTitle={item.original_name}
            posterPath={item.poster_path}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ScrollView>
  );
};

export default Tv;
