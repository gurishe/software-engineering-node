import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * This is based on the Assignment 1 documentation:
 * // https://docs.google.com/document/d/1zWYPxurQGwcLcNfDbIq4oBGM-VOSV13LlZgaAbq1Fek/edit
 */
export default class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
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
}
