import { body } from "express-validator";


   export const verifyName = [

        body('name')
    
        .isString()
    
        .isLength({ min: 1, max: 50 })
    
        .notEmpty()
    
        .withMessage("Name is required, minimum: 1 and maximum: 50"),
    
    ];
    
   export const verifyTask = [
    
        body('task')
    
        .isString()
    
        .notEmpty()
    
        .isLength({ min: 4, max: 100 })
    
        .withMessage("Task is required, minimum: 4 and maximum: 100"),
    
    ];
    
   export const verifyDate = [
    
        body('date')
    
        .isDate()
    
        .notEmpty()
        
        .withMessage("Date is required"),
    
    ];
