import {render} from '@testing-library/react';
import { PrecentageInput } from '../../components/shared/PrecentageInput';
import FeeTypes from '../../enums/FeeTypes';
import userEvent from '@testing-library/user-event';

describe('PrecentageInput', () => {
//test
test("Intial State Check Precentage",
    () => {
        let testValue = 0;
        let testType = 0;

        render(<PrecentageInput label={"Test Percentage"} value={7} amtType={FeeTypes.PERCENTAGE} handleOnChange={(newValue : number, valueType :  number) => {testValue = newValue; testType = valueType}}/>);
        
        expect(testType).toBe(FeeTypes.PERCENTAGE)
        expect(testValue).toBe(7);
    });

test("Intial State Check Fixed",
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
        const screen = render(<PrecentageInput label={"Test Percentage"} value={7} amtType={FeeTypes.FIXED} handleOnChange={( newValue: number) =>{ testValue = newValue;}}/>);
        
        const testInput = screen.getByLabelText('Test Percentage',  {selector: 'input', exact:false});
        userEvent.type(testInput, "8");

        expect(testValue).toBe(78);
        expect(testInput).toBeInTheDocument();
        expect(testInput).toHaveAttribute("type", "number");
    });
});

test("Button Presses",
    () => {
        let testType = 0;

        const screen = render(<PrecentageInput label={"Test Input"} value={7} amtType={FeeTypes.PERCENTAGE} handleOnChange={(newValue : number, valueType :  number) => { testType = valueType}}/>);
        
        const testButton = screen.getByRole("button", {pressed: false});
        userEvent.click(testButton);

        expect(testType).toBe(FeeTypes.FIXED)


        const percentButton = screen.getByRole("button", {pressed: false});
        userEvent.click(percentButton);

        expect(testType).toBe(FeeTypes.PERCENTAGE)

    }
);