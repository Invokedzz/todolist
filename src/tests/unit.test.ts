import { verifyStrings, analyzeComponents, sendComponents } from "../validation/postValidation";

import { Request, Response } from "express";

import { database } from "../database/database";

import { mainpagemiddleware, mainpagePOSTmiddleware, gatherdatabaseinformation, deletetaskmethod, editmethodGET, editmethodPOST, donetaskGET, donetaskPOST, deletetaskPOST } from "../middlewares";
import { mock } from "node:test";

describe("Validating our primal strings length", (): void => {

    it ("Should return false", (): void => {

        const value = "";

        const min = 1;

        const max = 50;

        const ourSpy = jest.spyOn(global.console, "log");

        const result = verifyStrings(value, min, max);

        expect(ourSpy).toHaveBeenCalledWith("The string is too short or too long");

        expect(result).toBe(false);

        ourSpy.mockRestore();

    });

    it ("Should return true", (): void => {

        const value = "Hm";

        const min = 1;

        const max = 50;

        const resultTrue = verifyStrings(value, min, max);

        expect(resultTrue).toBe(true);

    });

});

describe("Analyzing our components", (): void => {

    it ("Should throw an error", (): void => {

        const name = "";

        const task = "";

        expect(() => analyzeComponents(name, task)).toThrow();

    });

    it ("Should not throw an error", (): void => {

        const name = "Hello";

        const task = "Whazzup";

        expect(() => analyzeComponents(name, task)).not.toThrow();

    });

});

describe("Sending our components", (): void => {

    it ("Should return something, I guess? (false)", (): void => {

        const name = "";

        const task = "";

        const result = sendComponents(name, task);

        expect(result).toBe(false);

    });

    it ("Should return something, I guess? (true)", (): void => {

        const name = "something";

        const task = "analysis";

        const otherResult = sendComponents(name, task);

        expect(otherResult).toBe(true);

    });

});

describe("mainpagerender", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    beforeEach((): void => {

        Response = {

            render: jest.fn(),

        };

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should render the home page", (): void => {

        mainpagemiddleware(Request as Request, Response as Response);

        expect(Response.render).toHaveBeenCalledWith("home");

    });

});

describe("mainpagePOSTmiddleware", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {
          
            body: {

                name: "Hello",

                task: "Whazzup",

                date: "2024-09-27",

            },

        };

        Response = {

            render: jest.fn(),

        };

        (database.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Database success", async (): Promise <void> => {

        mockQuery.mockResolvedValue(undefined);

        await mainpagePOSTmiddleware(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith(`INSERT INTO public."todoTABLE" (name, task, date) VALUES ($1, $2, $3)`, ["Hello", "Whazzup", "2024-09-27"]);

        expect(Response.render).toHaveBeenCalledWith("sendsuccess");

    });

    it ("Should return database error", async (): Promise <void> => {

        mockQuery.mockRejectedValueOnce(new Error("Database error"));

        await expect (mainpagePOSTmiddleware(Request as Request, Response as Response)).rejects.toThrow("Database error");

    });

});

describe("gatherdatabaseinformation", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Response = {

            render: jest.fn(),

        };

        (database.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should gather all elements", async (): Promise <void> => {

        const mockTests = [{id: 1, name: "Hello", task: "Whazzup", date: "2024-09-27"}];

        mockQuery.mockResolvedValueOnce({ rows: mockTests });

        await gatherdatabaseinformation(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith(`SELECT * FROM public."todoTABLE"`);

        expect(Response.render).toHaveBeenCalledWith("viewtasks", { tasks: mockTests });

    });

    it ("Should return a database error", async (): Promise <void> => {

        mockQuery.mockRejectedValueOnce(new Error("Please, try again."));

        await expect (gatherdatabaseinformation(Request as Request, Response as Response)).rejects.toThrow("Please, try again.");

    });

});

describe("Testing database DELETE method", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    let mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            params: {
            
                id: "10",

            },

        };
        
        Response = {

            redirect: jest.fn(),

        };

        (database.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should delete a task", async (): Promise <void> => {

        mockQuery.mockResolvedValueOnce(undefined);

        await deletetaskmethod(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith(`DELETE FROM public."todoTABLE" WHERE id = $1`, ["10"]);

        expect(Response.redirect).toHaveBeenCalledWith("/viewtasks");

    });

    it ("Should return a database error", async (): Promise <void> => {

        mockQuery.mockRejectedValueOnce(new Error("Please, try again."));

        await expect (deletetaskmethod(Request as Request, Response as Response)).rejects.toThrow("Please, try again.");

    });

});

describe("Post edit method test", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    let mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            body: {

                name: "Proto",

                task: "Eat lunch",

            },

            params: {

                id: "10",

            },

        };

        Response = {

            render: jest.fn(),

        };

        (database.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should post an edited task", async (): Promise <void> => {

        mockQuery.mockResolvedValueOnce(undefined);

        await editmethodPOST(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith(`UPDATE public."todoTABLE" SET name = $1, task = $2 WHERE id = $3`, ["Proto", "Eat lunch", "10"]);

        expect(Response.render).toHaveBeenCalledWith("editsuccess");

    });

    it ("Should return a database error", async (): Promise <void> => {

        mockQuery.mockRejectedValueOnce(new Error("Please, try again."));

        await expect (editmethodPOST(Request as Request, Response as Response)).rejects.toThrow("Please, try again.");

    });

});

describe("Get edit method test", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    let mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            params: {

                id: "10",

            },

        };

        Response = {

            render: jest.fn(),

        };

        (database.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should return the get method alongside the database", async (): Promise <void> => {

        const mockTests = [{id: 10, name: "Protos", task: "Eat lunch"}];

        mockQuery.mockResolvedValueOnce({ rows: mockTests });

        await editmethodGET(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith(`SELECT * FROM public."todoTABLE" WHERE id = $1`, ["10"]);

        expect(Response.render).toHaveBeenCalledWith("editpage", { results: mockTests });

    });

    it ("Should return a database error", async (): Promise <void> => {

        mockQuery.mockRejectedValueOnce(new Error("Please, try again."));

        await expect (editmethodGET(Request as Request, Response as Response)).rejects.toThrow("Please, try again.");

    });

});

describe ("Done task test method", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            params: {

                id: "10",

            },

        };

        Response = {

            render: jest.fn(),

        };

        (database.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should return the information successfully", async (): Promise <void> => {

        const results = [{name: "Protos", task: "Eat lunch"}];

        mockQuery.mockResolvedValueOnce({ rows: results });

        await donetaskGET(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith(`SELECT * FROM public."todoTABLE" WHERE id = $1`, ["10"]);

        expect(Response.render).toHaveBeenCalledWith("donetasks", { results });

    });

    it ("Should return the try/catch error", async (): Promise <void> => {

        mockQuery.mockRejectedValueOnce(new Error("Please, try again."));

        await expect (donetaskGET(Request as Request, Response as Response)).rejects.toThrow("Please, try again.");

    });

});

describe ("Done task post method test", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            params: {

                id: "10",

            },

        };

        Response = {

            render: jest.fn(),

        };

        (database.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should return the information successfully", async (): Promise <void> => {

        const results = [{name: "Protos", task: "Eat lunch"}];

        mockQuery.mockResolvedValueOnce({ rows: results });

        await donetaskPOST(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith(`SELECT * FROM public."todoTABLE" WHERE id = $1`, ["10"]);

        expect(Response.render).toHaveBeenCalledWith("donesuccess", { results });

    });

    it ("Should return the try/catch error", async (): Promise <void> => {

        mockQuery.mockRejectedValueOnce(new Error("Please, try again."));

        await expect (donetaskPOST(Request as Request, Response as Response)).rejects.toThrow("Please, try again.");

    });

});

describe ("Delete task post method test", (): void => {

    let Request: Partial <Request>;

    let Response: Partial <Response>;

    const mockQuery = jest.fn();

    beforeEach((): void => {

        Request = {

            params: {

                id: "10",

            },

        };

        Response = {

            redirect: jest.fn(),

        };

        (database.query as jest.Mock) = mockQuery;

    });

    afterEach((): void => {

        jest.clearAllMocks();

    });

    it ("Should return the informations correctly", async (): Promise <void> => {

        await deletetaskPOST(Request as Request, Response as Response);

        expect(mockQuery).toHaveBeenCalledWith(`DELETE FROM public."todoTABLE" WHERE id = $1`, ["10"]);

        expect(Response.redirect).toHaveBeenCalledWith("/viewtasks");

    });

    it ("Should return the try/catch error", async (): Promise <void> => {

        mockQuery.mockRejectedValueOnce(new Error("Please, try again."));

        await expect (deletetaskPOST(Request as Request, Response as Response)).rejects.toThrow("Please, try again.");

    });

});