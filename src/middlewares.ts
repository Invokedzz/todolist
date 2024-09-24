import { Request, Response } from "express";

export function mainpagemiddleware (request: Request, response: Response): void {

    response.render("home");

};