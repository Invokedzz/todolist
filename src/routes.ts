import { Request, Response } from 'express';

export const test = (request: Request, response: Response): void => {

    response.render('home');

};

export const test2 = (request: Request, response: Response): void => {

    response.send("Testing 2...");

};