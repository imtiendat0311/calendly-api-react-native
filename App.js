import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const calendlyHtml = `
<body style="border-style: solid;border-width: 5px;display: flex;justify-content: center;align-items: center;">
<div class="calendly-inline-widget" data-url="https://calendly.com/datnguyen0311?hide_gdpr_banner=1" style="min-width:100%;height:${
    (screenHeight / 3) * 2
  }px; "></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
</body>`;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
        scrollEnabled={false}
        source={{ html: calendlyHtml }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
