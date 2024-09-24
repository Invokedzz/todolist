import { Request, Response } from "express";

import { database } from "./database/database";

export function mainpagemiddleware (request: Request, response: Response): void {

    response.render("home");

};