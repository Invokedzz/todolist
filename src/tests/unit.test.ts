import { sendComponents } from "../validation/postValidation";

import { verifyStrings } from "../validation/postValidation";

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
