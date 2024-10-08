import rateLimit from "express-rate-limit";

import { mainpage, mainpagePOST, viewDatabasetasks, deletetask, getEdit, postEdit, gettaskMiddleware, posttaskMiddleware, deletetaskMiddleware} from "./routes"; 

import express from "express";

import path from "path";

import { engine } from "express-handlebars";

import { verifyName, verifyTask, verifyDate } from "./validation/validateComponents";

const application = express();

const port = process.env.PORT || 3001;

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

        application.get('/', verifyName, verifyTask, verifyDate, mainpage);

        application.get('/viewtasks', viewDatabasetasks);

        application.get('/edittask/:id', getEdit);

        application.get('/donetask/:id', gettaskMiddleware);

    };

    private POSTroutes (): void {

        application.post('/sendinformations', mainpagePOST);

        application.post('/editsuccess/:id', postEdit);

        application.post('/deletetask/:id', deletetask);

        application.post('/completetask/:id', posttaskMiddleware);

        application.post('/erasedtask/:id', deletetaskMiddleware);

    };

    public listen (): void {

        this.limiter();

        this.expressSettings();

        this.GETroutes();

        this.POSTroutes();

        application.listen(port, (): void => {

            console.log(`http://localhost:${port}`);

        });

    };

};

export default server;