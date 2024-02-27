import { Text, View, Pressable, SafeAreaView, Button } from "react-native";
import { Link } from "expo-router";
import {
  makeRedirectUri,
  useAuthRequest,
  exchangeCodeAsync,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import UserInfo from "../component/userinfo";
import Schedule from "../component/schedule";

import axios from "axios";
WebBrowser.maybeCompleteAuthSession();
const discovery = {
  authorizationEndpoint: "https://auth.calendly.com/oauth/authorize",
  tokenEndpoint: "https://auth.calendly.com/oauth/token",
};
export default function Page() {
  const [authTokens, setAuthTokens] = React.useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_Client_ID,
      usePKCE: true,
      redirectUri: makeRedirectUri({
        native: "myapp://redirect",
      }),
    },
    discovery
  );
  useEffect(() => {
    const exchangeFn = async (exchangeTokenReq) => {
      try {
        const exchangeTokenResponse = await exchangeCodeAsync(
          {
            clientId: process.env.EXPO_PUBLIC_Client_ID,
            code: exchangeTokenReq,
            redirectUri: makeRedirectUri({
              native: "myapp://redirect",
            }),
            extraParams: {
              code_verifier: request.codeVerifier,
            },
          },
          discovery
        );
        setAuthTokens(exchangeTokenResponse);
      } catch (error) {
        console.error("error", error);
      }
    };

    if (response) {
      if (response.error) {
        console.error(
          "Authentication error",
          response.params.error_description || "something went wrong"
        );
        return;
      }
      if (response.type === "success") {
        exchangeFn(response.params.code);
      }
    }
  }, [discovery, request, response]);

  useEffect(() => {
    if (authTokens !== null) {
      const options = {
        method: "GET",
        url: "https://api.calendly.com/users/me",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.accessToken}`,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setUser(response.data["resource"]["uri"]);
          setUserInfo(response.data["resource"]);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [authTokens]);

  useEffect(() => {
    if (user !== "") {
      const options = {
        method: "GET",
        url: "https://api.calendly.com/user_availability_schedules",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.accessToken}`,
        },
        params: { user: user },
      };
      axios
        .request(options)
        .then(function (response) {
          setData(response.data["collection"]);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [user]);
  return (
    <SafeAreaView>
      <View>
        <Text>0Auth2</Text>
        <Link href="/" asChild>
          <Pressable>
            <Text style={{ color: "blue" }}>Home</Text>
          </Pressable>
        </Link>
        <Button
          title="Connect to calendly"
          onPress={() => {
            promptAsync();
          }}
        />
        <View style={{ padding: 5 }}>
          <Schedule data={data} />
          <UserInfo data={userInfo} />
        </View>
      </View>
    </SafeAreaView>
  );
}
