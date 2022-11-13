/**
 * @file Based on: https://stackoverflow.com/questions/65848442/property-user-does-not-exist-on-type-requestparamsdictionary-any-any-pars
 * This allows us to add additional information to the session object in Express requests/responses
 */
import express from "express";

declare global {
    namespace Express {
        interface Request {
            [key: string]: any;
        }
    }
}