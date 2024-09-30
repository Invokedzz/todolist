import { Request, Response } from 'express';

import { mainpagemiddleware, mainpagePOSTmiddleware, gatherdatabaseinformation, deletetaskmethod, editmethodGET, editmethodPOST, donetaskGET, donetaskPOST, deletetaskPOST } from "./middlewares";

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

export const getEdit = async (request: Request, response: Response): Promise <void> => {
  
    await editmethodGET(request, response);

};

export const postEdit = async (request: Request, response: Response): Promise <void> => {

    await editmethodPOST(request, response);

};

export const gettaskMiddleware = async (request: Request, response: Response): Promise <void> => {

    await donetaskGET(request, response);

};

export const posttaskMiddleware = async (request: Request, response: Response): Promise <void> => {

    await donetaskPOST(request, response);

};

export const deletetaskMiddleware = async (request: Request, response: Response): Promise <void> => {

    await deletetaskPOST(request, response);

};