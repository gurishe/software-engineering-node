/**
 * @file https://github.com/expressjs/session/issues/792
 */

import { SessionData } from 'express-session'

declare module 'express-session' {
    export interface SessionData {
        profile: { [key: string]: any };
    }
}
