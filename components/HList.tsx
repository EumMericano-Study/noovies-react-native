import { FlatList } from "react-native";
import styled from "../styled-components";
import { VSeparator } from "./Separators";
import VMedia from "./VMedia";

interface Props {
  title: string;
  data: any[];
}

const HList = ({ title, data }: Props) => (
  <ListContianer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      ItemSeparatorComponent={VSeparator}
      data={data}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <VMedia
          originalTitle={item.original_title ?? item.original_name}
          posterPath={item.poster_path}
          voteAverage={item.vote_average}
        />
      )}
    />
  </ListContianer>
);

export default HList;

export const ListContianer = styled.View`
  margin-bottom: 40px;
`;

export const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;

  margin-left: 30px;
  margin-bottom: 30px;
`;
