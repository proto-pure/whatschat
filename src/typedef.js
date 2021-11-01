/**
 * @typedef {Object} Message Message object
 * @prop {string} message Message to display
 * @prop {Date} timestamp Date and time of the message
 * @prop {User} user User object, containing user details
 */

/**
 * @typedef {Object} User User object
 * @prop {string} displayName Name displayed on UI
 * @prop {string} userName Username, used for internal purposes
 */

/**
 * @typedef {Object} GeoData Geo Data object
 * @prop {string} city City, eg `New York`
 * @prop {string} country Country, eg `USA`
 * @prop {string} hostname Hostname, eg `m180-101-98-88.cust.verizon.com`
 * @prop {string} ip IP, eg `180-101-98-88`
 * @prop {string} loc Coordinates, eg `50.3214,14.7315`
 * @prop {string} org Provider name, eg `Verizon Corp`
 * @prop {string} postal Postal code, eg `10020`
 * @prop {string} readme Readme link
 * @prop {string} region Region name
 * @prop {string} timezone Timezone
 */
