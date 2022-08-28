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
        expect(testValue).toBe(0.07);
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
        const screen = render(<PrecentageInput label={"Test Percentage"} value={7} amtType={FeeTypes.FIXED} handleOnChange={() =>{ return;}}/>);
        
        const testInput = screen.getByLabelText('Test Percentage',  {selector: 'input', exact:false});
        userEvent.type(testInput, "8");

        //expect(testValue).toBe(8);
        expect(testInput).toBeInTheDocument();
        expect(testInput).toHaveAttribute("type", "number");
    });
});

test("Dollar Button",
    () => {
        const screen = render(<PrecentageInput label={"Test Percentage"} value={7} amtType={FeeTypes.PERCENTAGE} handleOnChange={() =>{ return;}}/>);
        
        const testButton = screen.getByRole("button", {pressed: false});

        expect(testButton).toBeInTheDocument();
        expect(testButton).toHaveAttribute("type", "button");
        expect(testButton).toHaveValue("1");
    }
);

test("Percentage Button",
    () => {
        const screen = render(<PrecentageInput label={"Test Percentage"} value={7} amtType={FeeTypes.PERCENTAGE} handleOnChange={() =>{ return;}}/>);
        
        const testButton = screen.getByRole("button", {pressed: true});

        expect(testButton).toBeInTheDocument();
        expect(testButton).toHaveAttribute("type", "button");
        expect(testButton).toHaveValue("100");
    }
);

test("Button Presses",
    () => {
        let testValue = 0;
        let testType = 0;

        const screen = render(<PrecentageInput label={"Test Input"} value={7} amtType={FeeTypes.PERCENTAGE} handleOnChange={(newValue : number, valueType :  number) => {testValue = newValue; testType = valueType}}/>);
        
        const testButton = screen.getByRole("button", {pressed: false});
        userEvent.click(testButton);

        expect(testType).toBe(FeeTypes.FIXED)
        expect(testValue).toBe(7);

        const percentButton = screen.getByRole("button", {pressed: false});
        userEvent.click(percentButton);

        expect(testType).toBe(FeeTypes.PERCENTAGE)
        expect(testValue).toBe(0.07);
    }
);