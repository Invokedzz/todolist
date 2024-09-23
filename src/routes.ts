import { Request, Response } from 'express';

export const test = (request: Request, response: Response): void => {

    response.send("Testing...");

};

export const test2 = (request: Request, response: Response): void => {

    response.send("Testing 2...");

};