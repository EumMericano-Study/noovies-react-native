import { View, Text, ScrollView, FlatList } from "react-native";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import { VSeparator } from "../components/Separators";

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
    <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
      <HList title="Trending TV">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          ItemSeparatorComponent={VSeparator}
          data={trendingData.results}
          renderItem={({ item }) => (
            <VMedia
              originalTitle={item.original_name}
              posterPath={item.poster_path}
              voteAverage={item.vote_average}
            />
          )}
        />
      </HList>
      <HList title="Airing Today">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          ItemSeparatorComponent={VSeparator}
          data={todayData.results}
          renderItem={({ item }) => (
            <VMedia
              originalTitle={item.original_name}
              posterPath={item.poster_path}
              voteAverage={item.vote_average}
            />
          )}
        />
      </HList>
      <HList title="Top Rated TV">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          ItemSeparatorComponent={VSeparator}
          data={topData.results}
          renderItem={({ item }) => (
            <VMedia
              originalTitle={item.original_name}
              posterPath={item.poster_path}
              voteAverage={item.vote_average}
            />
          )}
        />
      </HList>
    </ScrollView>
  );
};

export default Tv;
