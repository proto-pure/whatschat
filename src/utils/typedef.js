// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app';
import 'firebase/firestore';

/**
 * @typedef {Object} UpdateUser User object
 * @prop {string} userId ID of the user
 * @prop {string} displayName User display name
 * @prop {string} userName Username of current user
 */

/**
 * @typedef {Object} SendMessage Message object
 * @prop {string} message Message to save
 * @prop {string} userName Username of current user
 * @prop {string} userId UserId of current user
 */

/**
 * @typedef {Object} GetMessages Object with `querySnapshot`
 * @prop {firebase.firestore.QuerySnapshot} querySnapshot querySnapshot
 */

exports.unused = {};
