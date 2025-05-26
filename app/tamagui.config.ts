import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "@tamagui/core";
import { themes } from "./themes";

export const config = createTamagui({
  ...defaultConfig,
  themes,
});
