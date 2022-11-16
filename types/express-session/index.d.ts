/**
 * @file https://github.com/expressjs/session/issues/792
 */

import { Session } from 'express-session'

declare module 'express-session' {
    export interface Session {
        profile: { [key: string]: any };
    }
}
