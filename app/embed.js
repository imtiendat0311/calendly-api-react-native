import React from "react";
import { Text, View, Pressable, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { WebView } from "react-native-webview";
export default function Page() {
  const calendlyHtml = `
  <body style="display: flex;justify-content: center;align-items: center;">
  <div class="calendly-inline-widget" data-url="https://calendly.com/datnguyen0311?hide_gdpr_banner=1" style="min-width:100%;height:700px;"></div>
  <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
  </body>`;
  return (
    <View style={{ flex: 1 }}>
      <Text>Embedded</Text>
      <Link href="/" asChild>
        <Pressable>
          <Text style={{ color: "blue" }}>Home</Text>
        </Pressable>
      </Link>
      <WebView
        style={{
          flex: 1,
        }}
        scrollEnabled={false}
        source={{ html: calendlyHtml }}
      />
    </View>
  );
}
