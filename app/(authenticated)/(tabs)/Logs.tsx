import { H2, View, useTheme } from "tamagui";

const Logs = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color2?.val, // ✅ inside style
      }}
    >
      <H2>Logs</H2>
    </View>
  );
};

export default Logs;
