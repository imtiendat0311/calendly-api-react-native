# Calendly API React Native 

## Get Start

```shell
npm i
```

## Build

To build in IOS

```shell
npx expo run:ios
```

To build in Android

```shell
npx expo run:android
```

## Route

- `/` - Root Route
- `/embed` - Implement Embedding Calendly UI using Webview and JS injection
- `/auth2` - Implement Oauth2 workflow from getting code to token and api call
- `/pa` - Implement Personal Access Token workflow - using PA token to call api


For Auth2 and PA token route, Both are called GET request to `https://api.calendly.com/users/me` and `https://api.calendly.com/user_availability_schedules` as a simple example of how to use calendly API
