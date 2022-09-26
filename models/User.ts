import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import maritalStatus from "./MaritalStatus";

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

    public constructor(
        username: string,
        password: string,
        firstName: string | null,
        lastName: string | null,
        email: string
    ) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    get uname(): string {
        return this.username;
    }

    get pwd(): string {
        return this.password;
    }

    get fName(): string | null {
        return this.firstName
    }

    get lName(): string | null {
        return this.lastName
    }

    get emailAddr(): string {
        return this.email
    }

    get photo(): string | null {
        return this.profilePhoto
    }

    get headerImg(): string | null {
        return this.headerImage
    }

    get acctType(): AccountType {
        return this.accountType
    }

    get mStatus(): maritalStatus {
        return this.maritalStatus
    }

    get bio(): string | null {
        return this.biography
    }

    get dob(): Date | null {
        return this.dateOfBirth
    }

    get joinDate(): Date {
        return this.joined
    }

    get userLocation(): Location | null {
        return this.location
    }
}
