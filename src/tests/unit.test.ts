import { sendComponents } from "../validation/postValidation";

describe("Sending informations - expect nothing", (): void => {

    it ("When we have empty strings", (): void => {

        const name = "";
        const task = "";

        const ourSpy = jest.spyOn(global.console, "log");

        sendComponents(name, task);

        expect(ourSpy).not.toHaveBeenCalled();

        ourSpy.mockRestore();

    });

});
