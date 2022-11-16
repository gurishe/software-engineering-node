/**
 * @file The interface that all of our controllers dealing with Authentication must implement
 */

import {Request, Response} from "express";

/**
 * The interface for our Authentication controllers
 * @interface AuthenticationControllerI
 */
export default interface AuthenticationControllerI {
    signup(req: Request, res: Response): void;
    profile(req: Request, res: Response): void;
    logout(req: Request, res: Response): void;
    login(req: Request, res: Response): void;
}