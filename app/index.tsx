// app/index.tsx
import { zustandStorage } from "@/app/utils/crossPlatformStorage";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    (async () => {
      const keys = await zustandStorage.getItem("authStore");
      console.log(keys);
      if (keys) {
        const userAuth = JSON.parse(keys);

        if (userAuth?.state.authStore) {
          router.replace("/Home");
        }
      }
    })();
  }, []);

  return <Redirect href="/login" />;
};

export default Index;
