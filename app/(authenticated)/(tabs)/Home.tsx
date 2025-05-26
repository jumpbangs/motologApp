import { H2, Text, View, useTheme } from "tamagui";

const Home = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color2?.val, // ✅ inside style
      }}
    >
      <H2>Home</H2>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
