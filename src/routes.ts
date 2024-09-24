import { request, Request, Response } from 'express';

import { mainpagemiddleware, testing } from "./middlewares";

export const mainpage = (request: Request, response: Response): void => {

    mainpagemiddleware(request, response);

};

export const test = (request: Request, response: Response): void => {
  
    testing(request, response);

};