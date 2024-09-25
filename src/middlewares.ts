import { Request, Response } from "express";

import { database } from "./database/database";

export function mainpagemiddleware (request: Request, response: Response): void {

    response.render("home");

};

export async function mainpagePOSTmiddleware (request: Request, response: Response): Promise <void> {
    
    const name = request.query.name;

    const task = request.query.task;

    const date  = request.query.date;
    
    try {

        await database.query(`INSERT INTO public."todoTABLE" (name, task, date) VALUES ($1, $2, $3)`, [name, task, date]);

        response.render("sendsuccess")

    } catch (error) {

        console.error("Something went wrong while connecting with the database: ", error);
        throw new Error("Please, try again.");

    };

};

export function testing (request: Request, response: Response): void {

    response.render("sendsuccess");

};