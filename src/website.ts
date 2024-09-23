import { test, test2 } from "./routes"; 

import express from "express";

const application = express();

const port = process.env.PORT || 8443;

export class server {

    private expressSettings (): void {

        application.use(express.static("public"));

        application.use(express.json());

        application.use(express.urlencoded({ extended: true }));

    };

    private GETroutes (): void {

        application.get('/', test);

        application.get('/test', test2);

    };

    private POSTroutes (): void {



    };

    public listen (): void {

        this.expressSettings();

        this.GETroutes();

        application.listen(port, (): void => {

            console.log(`http://localhost:${port}`);

        });

    };

};

export default server;