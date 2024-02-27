import { Text, View, Pressable, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import Schedule from "../component/schedule";
import UserInfo from "../component/userinfo";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const code = process.env.EXPO_PUBLIC_PA;
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useState("");
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.calendly.com/users/me",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${code}`,
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
  }, []);

  useEffect(() => {
    if (user !== "") {
      const options = {
        method: "GET",
        url: "https://api.calendly.com/user_availability_schedules",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${code}`,
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
        <Text>Personal Access</Text>
        <Link href="/" asChild>
          <Pressable>
            <Text style={{ color: "blue" }}>Home</Text>
          </Pressable>
        </Link>
        <View style={{ padding: 5 }}>
          <Schedule data={data} />
          <UserInfo data={userInfo} />
        </View>
      </View>
    </SafeAreaView>
  );
}
