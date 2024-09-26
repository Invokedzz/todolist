import { Request, Response } from 'express';

import { mainpagemiddleware, mainpagePOSTmiddleware, gatherdatabaseinformation, deletetaskmethod } from "./middlewares";

export const mainpage = (request: Request, response: Response): void => {

    mainpagemiddleware(request, response);

};

export const mainpagePOST = async (request: Request, response: Response): Promise <void> => {

    await mainpagePOSTmiddleware(request, response);

};

export const viewDatabasetasks = async (request: Request, response: Response): Promise <void> => {

    await gatherdatabaseinformation(request, response);

};

export const deletetask = async (request: Request, response: Response): Promise <void> => {

    await deletetaskmethod(request, response);

};