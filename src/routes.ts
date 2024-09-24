import { Request, Response } from 'express';

import { mainpagemiddleware } from "./middlewares";

export const mainpage = (request: Request, response: Response): void => {

    mainpagemiddleware(request, response);

};