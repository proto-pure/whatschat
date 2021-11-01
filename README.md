# WhatsChat Demo App

### Realtime, Firebase and React.js based chat app

### [Demo version](https://whatschat-app.netlify.app)

### Uses:

- Firebase (firestore) backend as a realtime base for the app
- React.js for frontend implementation with Function Components and hooks
- Redux for state management
- CSS modules for styling and scoping of styles
- JSDoc for basic type checking
- Dark mode support
- Client side geolocation data fetching for information purposes
- Error boundary in case of an app failure to provide feedback to the user and provide the best UX

### Key points:

- When used for the first time, the app anonymously registers itself in `Firebase` to perform basic authentication and access the database, and if successful, downloads and displays all existing messages. If there is nothing to download, a notification is displayed in the main window.

- If the user is not registered, the app displays the nickname registration field without the field for sending messages.

- If a user registers by entering the nickname in the appropriate field, the app generates a new user id based on already registered users, thereby preventing user name collisions, queries a third-party service trying to obtain additional `geolocation` data about the user, and stores the collected data in the database. The message field is then displayed.

- Later, the user has the opportunity to update the nickname. In this case, the app makes an additional request to the `geolocation` service and stores the updated data in the user object in the database. If the user has already sent messages before changing their nickname, the nickname of the corresponding messages will be updated automatically.

- The current nickanem is displayed as a placeholder inside a field where the user can change it.

- The header of messages left by the current user will display a `(You)` mark to make it easier to spot your messages.

- The message window displays the message content itself, the nickname and the date/time (based on the server timestamp) when the message was left.

- When the user sends a message, the app queries the `geolocation` service and stores the received information in the message object stored in the database.

- The user can place a `YouTube` link to the video in the message and it will automatically be converted into an embedded YouTube video block. Various forms of `YouTube` links are supported.

- The message window has an `Avatar` placeholder that displays the first letter of the nickname.

- Supports both desktop and mobile devices.

- A preloader is used to improve the UX.
