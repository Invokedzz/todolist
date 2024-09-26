import { Request, Response } from "express";

import { database } from "./database/database";

import { analyzeComponents, sendComponents } from "./validation/postValidation";

export function mainpagemiddleware (request: Request, response: Response): void {

    response.render("home");

};

export async function mainpagePOSTmiddleware (request: Request, response: Response): Promise <void> {
    
    const name = request.body.name;

    const task = request.body.task;

    const date  = request.body.date;

    analyzeComponents(name, task, date);

    sendComponents(name, task);
    
    try {

        await database.query(`INSERT INTO public."todoTABLE" (name, task, date) VALUES ($1, $2, $3)`, [name, task, date]);

        response.render("sendsuccess")

    } catch (error) {

        console.error("Something went wrong while connecting with the database: ", error);
        throw new Error("Please, try again.");

    };

};

export async function gatherdatabaseinformation (request: Request, response: Response): Promise <void> {

    try {

        const results = await database.query(`SELECT * FROM public."todoTABLE"`);

        const tasks = results.rows;
        
        response.render("viewtasks", { tasks });

    } catch (error) {

        console.error("Something went wrong while connecting with the database: ", error);
        throw new Error("Please, try again.");

    };

};