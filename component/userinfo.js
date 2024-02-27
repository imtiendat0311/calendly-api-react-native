import React from "react";
import { Text, View } from "react-native";

const UserInfo = ({ data }) => {
  return (
    <View>
      <Text>Name: {data.name}</Text>
      <Text>Email: {data.email}</Text>
      <Text>Timezone: {data.timezone}</Text>
    </View>
  );
};

export default UserInfo;
