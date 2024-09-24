import validator from "validator";

function verifyStrings (

    value: string,
    min: number,
    max: number,

): boolean {

    return value.length < min && value.length > max;

};

export function analyzeComponents (

    name: string,
    task: string,
    date: string,

): void {

    if (!validator.isDate(date)) throw new Error ("Insert a valid date");

    if (!name && !task) throw new Error ("Name and task are required");

};

export function sendComponents (

    name: string,
    task: string,

): void {

    if (!verifyStrings(name, 1, 50)) return;

    if (!verifyStrings(task, 4, 100)) return;

};