import session from "express-session";

import compression from "compression";

import csurf from "csurf";

import helmet from "helmet";

import morgan from "morgan";

import express, { Request, Response } from "express";

const application = express();

export function securityComponents (): void {

    application.use(helmet({

        contentSecurityPolicy: false,

        dnsPrefetchControl: { allow: false },

        frameguard: { action: 'deny' },

        hidePoweredBy: true,

        referrerPolicy: { policy: 'no-referrer' },

        xssFilter: true,

        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        
        ieNoOpen: true,

        noSniff: true,

    }));

    application.use(session({

        secret: 'ILOVELINKINPARKANDTHEIRNEWSINGERHAHAHA',

        resave: false,

        saveUninitialized: true,

        cookie: { secure: true, httpOnly: true },

    }));

    application.use(compression({

        level: 9, 

        threshold: 1024,

        filter: (request: Request, response: Response) => {

            return /text\/html/.test(response.getHeader('Content-Type') as string);

        },

        memLevel: 9, 

        chunkSize: 16384, 

    }));

    const csrf = csurf({ 

        cookie: { httpOnly: true, secure: true },

    });

    application.use(csrf);

    application.use(morgan('combined'));

};