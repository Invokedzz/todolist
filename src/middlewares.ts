import { Request, Response } from "express";

import { database } from "./database/database";

export function mainpagemiddleware (request: Request, response: Response): void {

    response.render("home");

};

export async function mainpagePOSTmiddleware (request: Request, response: Response): Promise <void> {
    
};

export function testing (request: Request, response: Response): void {

    response.render("sendsuccess");

};