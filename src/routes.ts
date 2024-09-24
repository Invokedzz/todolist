import { request, Request, Response } from 'express';

import { mainpagemiddleware, mainpagePOSTmiddleware } from "./middlewares";

export const mainpage = (request: Request, response: Response): void => {

    mainpagemiddleware(request, response);

};

export const mainpagePOST = async (request: Request, response: Response): Promise <void> => {

    await mainpagePOSTmiddleware(request, response);

};