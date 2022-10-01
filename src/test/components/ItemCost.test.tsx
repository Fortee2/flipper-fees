import {render} from '@testing-library/react';
import ItemCost from '../../components/shared/ItemCost';
import {store}  from '../../store/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

describe('Item Cost Component', () => {
    test("Intial State Check",
        () => {
            const screen = render(<Provider store={store}><ItemCost handleOnChange={() =>{ return;}}/></Provider>);

            const testInput = screen.getByTestId("sales-input");
            expect(testInput).toBeInTheDocument();
            expect(testInput).toHaveAttribute("type", "number");
            expect(testInput).toHaveValue(0);

            const costInput = screen.getByTestId("item-cost-input");
            expect(costInput).toBeInTheDocument();
            expect(costInput).toHaveAttribute("type", "number");
            expect(costInput).toHaveValue(0);

            const testButton = screen.getByRole("button", {pressed: false});

            expect(testButton).toBeInTheDocument();
            expect(testButton).toHaveAttribute("type", "button");
            expect(testButton).toHaveValue("1");

            const testButton2 = screen.getByRole("button", {pressed: true});

            expect(testButton2).toBeInTheDocument();
            expect(testButton2).toHaveAttribute("type", "button");
            expect(testButton2).toHaveValue("100");
        });
        
    test("Input Cost Ony",  
        () => {
                let totaCost = 0;

                const screen = render(<Provider store={store}><ItemCost handleOnChange={(newValue : number) => {totaCost = newValue}}/></Provider>);

                const itemCostInput = screen.getByLabelText('Item Cost',  {selector: 'input', exact:false});
                userEvent.type(itemCostInput, "8");

                expect(totaCost).toBe(8);
    });

    test("Input Cost with Tax Toggle",
        () => {
            let totaCost = 0;

            const screen = render(<Provider store={store}><ItemCost handleOnChange={(newValue : number) => {totaCost = newValue}}/></Provider>);

            expect(totaCost).toBe(8);

            const salesTaxInput = screen.getByLabelText('Sales Tax',  {selector: 'input', exact:false});
            userEvent.type(salesTaxInput, "10");

            expect(totaCost).toBe(8.8);

            const fixedButton = screen.getByLabelText("fixed", {selector: 'button', exact:false});
            userEvent.click(fixedButton);

            expect(totaCost).toBe(18);
    });
});