import {render} from '@testing-library/react';
import EbaySellingCost from '../../components/channels/EbaySellingCost';
import {store}  from '../../store/store';
import { Provider } from 'react-redux';
//import userEvent from '@testing-library/user-event';

describe('Selling Cost Component', () => {
    test('Component Loads',
        () => {
            const screen = render(<Provider store={store}><EbaySellingCost /></Provider>);

            const testInput = screen.getByTestId("sales-input");
            expect(testInput).toBeInTheDocument();
            expect(testInput).toHaveAttribute("type", "number");
            expect(testInput).toHaveValue(0);

        }); 
});