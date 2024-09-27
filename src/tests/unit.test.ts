import { verifyStrings, analyzeComponents, sendComponents } from "../validation/postValidation";

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

