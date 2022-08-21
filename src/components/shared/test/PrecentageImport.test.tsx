import {render} from '@testing-library/react';
import { PrecentageInput } from '../PrecentageInput';
import FeeTypes from '../../../enums/FeeTypes';

//test
test("Check Precentage",
    () => {
        let testValue = 0;
        let testType = 0;

        render(<PrecentageInput label={"Test Percentage"} value={7} amtType={FeeTypes.PERCENTAGE} handleOnChange={(newValue : number, valueType :  number) => {testValue = newValue; testType = valueType}}/>);
        
        expect(testType).toBe(FeeTypes.PERCENTAGE)
        expect(testValue).toBe(0.07);
    });

test("Check Fixed",
    () => {
        let testValue = 0;
        let testType = 0;

        render(<PrecentageInput label={"Test Percentage"} value={7} amtType={FeeTypes.FIXED} handleOnChange={(newValue : number, valueType :  number) => {testValue = newValue; testType = valueType}}/>);
        
        expect(testType).toBe(FeeTypes.FIXED)
        expect(testValue).toBe(7);
    });