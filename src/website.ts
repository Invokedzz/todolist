import rateLimit from "express-rate-limit";

import { mainpage } from "./routes"; 

import express from "express";

import path from "path";

import { engine } from "express-handlebars";

import { name, task, date } from "./validation/validateComponents";

import { analyzeComponents, sendComponents } from "./validation/postValidation";

const application = express();

const port = process.env.PORT || 3000;

application.engine('handlebars', engine({

    defaultLayout: 'main',

}));

application.set('view engine', 'handlebars');

application.set('views', path.join(__dirname, './views'));

export class server {

    private limiter (): void {

        const limiter = rateLimit({

            windowMs: 15 * 60 * 1000, 

            max: 100,

            standardHeaders: true,

            legacyHeaders: false,

        });

        application.use(limiter);

    };

    private expressSettings (): void {

        application.use(express.static("public"));

        application.use(express.json());

        application.use(express.urlencoded({ extended: true }));

    };

    private GETroutes (): void {

        application.get('/', mainpage);

    };

    private POSTroutes (): void {



    };

    public listen (): void {

        this.limiter();

        this.expressSettings();

        this.GETroutes();

        application.listen(port, (): void => {

            console.log(`http://localhost:${port}`);

        });

    };

};

export default server;