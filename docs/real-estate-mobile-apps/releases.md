# Release Notes

## 1.1.0

**Added**

- Notification inbox: a dedicated screen listing every notification sent from your Botble
  backend, with unread badges, pull-to-refresh, infinite scroll, and mark-all-read. Reachable
  from the bell in the home header and from an Inbox row in the profile tab.
- Tapping a push notification now deep-links straight to the relevant screen (inquiry, car,
  blog post), including when the app is launched from a cold start.
- The app icon badge now reflects the unread notification count.
- Write a review: customers can rate a property (1-5 stars) and leave a comment from the inquiry
  detail screen, for inquiries that are confirmed or completed.

**Fixed**

- **Push notifications could never be delivered.** The app registered an Expo push token, but
  the backend sends via Firebase Cloud Messaging (FCM HTTP v1), which only accepts an FCM
  registration token. The app now mints a real FCM token via `@react-native-firebase/messaging`
  and re-registers it when the token rotates. See [Push notifications](push_notifications.md)
  for the Firebase setup this requires.
- Signing out never unregistered the device token (it called a route that does not exist), so a
  signed-out device kept receiving notifications intended for the previous account.
- Review submissions that the server rejected (for example, reviewing a property you have not booked)
  were reported to the user as successful even though nothing was created.

## 1.0.0

- Car-rental mobile app for the FlexHome platform, built with Expo SDK 54 / React Native, connecting to a Botble backend running the real-estate API.
- Browse properties, search and filter, view property details, agents, and blog.
- Inquiry flow with guest inquiry and one-way rental support; WebView checkout against the backend's hosted payment page.
- Customer auth via Laravel Sanctum, plus Google, Apple, and Facebook social login.
- Localization in English, Vietnamese, Arabic (RTL), and French.
- Favorites, reviews, profile management, and push notifications.

For the latest changes, check the CodeCanyon portfolio: https://codecanyon.net/user/botble/portfolio
