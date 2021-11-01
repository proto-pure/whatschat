import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';

/**
 * Initial firebase config
 * @enum {string | undefined}
 */
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);
firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();
export const usersRef = db.collection('users');
export const messagesRef = db.collection('messages');

/**
 * Function that anonymously signs in current instance
 * of the application to Firebase
 * @returns {Promise<firebase.auth.UserCredential | undefined>} Authenticated user
 */
export const signInAnonymously = async () => {
  try {
    return await firebase.auth().signInAnonymously();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Function that gets geo data of current user
 * @returns {Promise<GeoData>} Geo data
 */
const fetchGeoData = async () => {
  let response;

  try {
    const data = await fetch('https://ipinfo.io/json');
    response = await data.json();
  } catch (error) {
    console.log('Request to `ipinfo.io` has failed');
  }

  return response || {};
};

/**
 * Function that creates and saves new user in Firebase db
 * @param {string} enteredUserName Display username
 */
export const createUser = async enteredUserName => {
  const geoData = await fetchGeoData();
  const querySnapshot = await usersRef.orderBy('userName', 'asc').get();
  const queryDocsSnapshot = querySnapshot.docs;
  const newUser = {};
  let index, userId;

  if (queryDocsSnapshot.length) {
    const lastQueryDocsSnapshot = queryDocsSnapshot.slice(-1).pop();
    const lastDocData = lastQueryDocsSnapshot?.data();
    index = Number(lastDocData?.userName.match(/\d+/gi).pop()) + 1;
  }

  Object.assign(newUser, {
    userName: 'user_#' + (index || 1),
    displayName: enteredUserName,
    registration: {
      geoData: { ...geoData },
      device: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        appVersion: navigator.appVersion,
      },
      date: new Date(),
    },
  });

  userId = (await usersRef.add(newUser)).id;
  Object.assign(newUser, { userId });

  return newUser;
};

/**
 * Function that updates display name of current user in Firebase db
 * @param {import('./typedef').UpdateUser} user User object
 */
export const updateUser = async user => {
  const { userId, displayName } = user;

  const geoData = await fetchGeoData();
  const docRef = usersRef.doc(userId);
  await docRef.update({
    displayName,
    update: {
      geoData: { ...geoData },
      device: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        appVersion: navigator.appVersion,
      },
      date: new Date(),
    },
  });
  const docSnapshot = await docRef.get();

  return { ...docSnapshot.data(), userId: docSnapshot.id };
};

/**
 * Function that saves message to Firebase DB
 * @param {import('./typedef').SendMessage} message Message object
 */
export const sendMessage = async message => {
  const { message: userMessage, userName, userId } = message;

  const geoData = await fetchGeoData();

  messagesRef.add({
    userName,
    message: userMessage,
    userId: usersRef.doc(userId),
    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    messageGeoData: { ...geoData },
  });
};

/**
 * Function that gets all messages from Firebase DB
 * @param {import('./typedef').GetMessages} props Props object
 * @returns {Promise<any>}
 */
export const getMessages = async props => {
  const { querySnapshot } = props;
  const queryDocSnapshots = querySnapshot.docs;

  if (queryDocSnapshots.length) {
    const usersDocSnapshots = [];

    /** @type {Promise<any>[]} */
    const queryDocPromises = [];

    /** @type {Object<string, any>[]} */
    const messages = [];

    /** @type {Object<string, any>} */
    const users = {};

    queryDocSnapshots.forEach(async queryDocSnapshot => {
      const docData = queryDocSnapshot.data();
      queryDocPromises.push(docData.userId.get());
    });

    usersDocSnapshots.push(...(await Promise.all(queryDocPromises)));

    usersDocSnapshots.forEach(
      userDoc => (users[userDoc.data()?.userName] = userDoc.data())
    );

    queryDocSnapshots.forEach(queryDocSnapshot => {
      const { message, timestamp, userName } = queryDocSnapshot.data();
      const Timestamp = new firebase.firestore.Timestamp(
        timestamp.seconds,
        timestamp.nanoseconds
      );

      messages.push({
        message,
        timestamp: Timestamp.toDate(),
        user: users[userName],
      });
    });

    return messages;
  }
};
