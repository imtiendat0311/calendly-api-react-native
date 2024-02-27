import { Text, View, Pressable, SafeAreaView, Button } from "react-native";
import { Link } from "expo-router";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  return (
    <SafeAreaView>
      <View>
        <Text>0Auth2</Text>
        <Link href="/" asChild>
          <Pressable>
            <Text style={{ color: "blue" }}>Home</Text>
          </Pressable>
        </Link>
        <Button title="Connect to calendly" />
      </View>
    </SafeAreaView>
  );
}
