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
    
    try {

        await database.query(`INSERT INTO public."todoTABLE" (name, task, date) VALUES ($1, $2, $3)`, [name, task, date]);

        response.render("sendsuccess")

    } catch (error) {

        console.error("Something went wrong while connecting with the database: ", error);
        throw new Error("Database error");

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

export async function editmethodGET (request: Request, response: Response): Promise <void> {

    const id = request.params.id;

    try {

      const overall = await database.query(`SELECT * FROM public."todoTABLE" WHERE id = $1`, [id]);
      const results = overall.rows;
      response.render("editpage", { results });

    } catch (error) {

        console.error("Something went wrong while connecting with the database: ", error);
        throw new Error("Please, try again.");

    };

};

export async function editmethodPOST (request: Request, response: Response): Promise <void> {

    const name = request.body.name;

    const task = request.body.task;

    const id = request.params.id;
    
    try {

        await database.query(`UPDATE public."todoTABLE" SET name = $1, task = $2 WHERE id = $3`, [name, task, id]);

        response.render("editsuccess");

    } catch (error) {

        console.error("Something went wrong while connecting with the database: ", error);
        throw new Error("Please, try again.");

    };

};

export async function deletetaskmethod (request: Request, response: Response): Promise <void> {

    const id = request.params.id;
    
    try {

        await database.query(`DELETE FROM public."todoTABLE" WHERE id = $1`, [id]);

        response.redirect("/viewtasks");

    } catch (error) {

        console.error("Something went wrong while connecting with the database: ", error);
        throw new Error("Please, try again.");

    };

};

export async function donetaskGET (request: Request, response: Response): Promise <void> {

    response.render("donetasks");

};

export async function donetaskPOST (request: Request, response: Response): Promise <void> {



};