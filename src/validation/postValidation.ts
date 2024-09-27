import validator from "validator";

export function verifyStrings (

    value: string,
    min: number,
    max: number,

): boolean {

    if (value.length < min || value.length > max) {
        
        console.log("The string is too short or too long");
        return false;

    };


    return true;

};

export function analyzeComponents (

    name: string,
    task: string,

): void {

    if (!name && !task) throw new Error ("Name and task are required");

};

export function sendComponents (

    name: string,
    task: string,

): boolean {

    if (!verifyStrings(name, 1, 50)) return false;

    if (!verifyStrings(task, 4, 100)) return false;

    return true;

};