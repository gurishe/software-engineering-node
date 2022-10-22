/**
 * @file Implementation of a User which is someone who has signed up to use Tuiter.
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * A class representing a Tuiter user.
 * @property {string} id A unique ID for object
 * @property {string} username The text-based public name chosen by the User
 * @property {string} password The User chosen account password
 * @property {string} firstName The User's first name
 * @property {string} lastName The User's last name
 * @property {string} email The User's email address
 * @property {string} profilePhoto The URL of the User's profile photo
 * @property {string} headerImage The URL of the User's image displayed at the top of their profile
 * @property {AccountType} accountType The enum type of User's account
 * @property {MaritalStatus} maritalStatus The enum status indicating if the User is married
 * @property {string} biography The User's chosen personal bio
 * @property {Date} dateOfBirth The User's date of birth
 * @property {Date} joined The date the User created their account
 * @property {Location} location The User's home location
 */
export default class User {
    private id: string;
    private username: string = ''
    private password: string = '';
    private firstName: string | null = null
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;

    /**
     * Creates a new User object.
     * @param {string} id A unique ID for this object
     * @param {string} username The text-based public name chosen by the User
     * @param {string} password The User chosen account password
     */
    constructor(id: string, username: string, password: string) {
        this.id = id; this.username = username; this.password = password;
    }

    /**
     * Gets the username of the by User
     * @return {string} The username of the User
     */
    get uName() { return this.username; }

    /**
     * Gets the password set the by User
     * @return {string} The password set by the User
     */
    get pass() { return this.password; }

    /**
     * Gets the unique ID of the User
     * @return {string} The unique ID of the User
     */
    get idUser() { return this.id; }
}
