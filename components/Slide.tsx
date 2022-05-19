import { BlurView } from "expo-blur";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

interface Props {
  backdropPath: string;
  posterPath: string;

  voteAverage: number;
  originalTitle: string;
  overview: string;
}

const Slide: React.FC<Props> = ({
  backdropPath,
  posterPath,
  voteAverage,
  originalTitle,
  overview,
}: Props) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        source={{ uri: makeImgPath(backdropPath) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={10}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster source={{ uri: makeImgPath(posterPath) }} />
          <Column>
            <Title>{originalTitle}</Title>
            {voteAverage !== 0 && <Votes>⭐️ {voteAverage} / 10</Votes>}
            <OverView>
              {overview.slice(0, 90).trim()}
              {overview.length > 90 ? "..." : ""}
            </OverView>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;

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
