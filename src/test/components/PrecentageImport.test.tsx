import {render, getByRole, Screen} from '@testing-library/react';
import { PrecentageInput } from '../../components/shared/PrecentageInput';
import FeeTypes from '../../enums/FeeTypes';
import userEvent from '@testing-library/user-event';

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

test("Input Number",
    () => {
        let testValue = 0;
        let testType = 0;

        const screen = render(<PrecentageInput label={"Test Percentage"} value={7} amtType={FeeTypes.FIXED} handleOnChange={(newValue : number, valueType :  number) => {testValue = newValue; testType = valueType}}/>);
        
        const testInput = screen.getByTestId("item-price-input");
        userEvent.type(testInput, "8");

        //expect(testValue).toBe(8);
        expect(testInput).toBeInTheDocument();
        expect(testInput).toHaveAttribute("type", "number");
    });