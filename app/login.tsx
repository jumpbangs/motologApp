import { useToastController } from "@tamagui/toast";
import {
  Button,
  Form,
  H2,
  Input,
  View,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import { router } from "expo-router";
import { useAuthStore } from "./store/authStore";

const LoginScreen = () => {
  const theme = useTheme();
  const toast = useToastController();

  const { login } = useAuthStore();

  const handleSubmit = () => {
    toast.show("Successfully Logged in!", {
      message: "Don't worry, we've got your data.",
    });

    login("XXX");
    router.replace("/Home");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      backgroundColor={theme.color2?.val}
    >
      <YStack gap={"$10"}>
        <XStack justifyContent="center">
          <H2>MotoLog App</H2>
        </XStack>
        <XStack justifyContent="center">
          <Form gap={"$4"} minWidth={300}>
            <Input flex={1} minHeight={"$4"} placeholder="Email" />
            <Input
              flex={1}
              minHeight={"$4"}
              placeholder="Password"
              secureTextEntry
            />
            <Button size={"$4"} onPress={handleSubmit}>
              Submit
            </Button>
          </Form>
        </XStack>
      </YStack>
    </View>
  );
};

export default LoginScreen;
