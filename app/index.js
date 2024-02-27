import { Text, View, SafeAreaView, Pressable } from "react-native";
import { Link } from "expo-router";
export default function Page() {
  return (
    <SafeAreaView>
      <View>
        <Text>Home page</Text>
        <Link href="/pa" asChild>
          <Pressable>
            <Text style={{ color: "red" }}>Personal Access</Text>
          </Pressable>
        </Link>
        <Link href="/embed" asChild>
          <Pressable>
            <Text style={{ color: "orange" }}>Embedded</Text>
          </Pressable>
        </Link>
        <Link href="/auth2" asChild>
          <Pressable>
            <Text style={{ color: "blue" }}>0Auth2</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
