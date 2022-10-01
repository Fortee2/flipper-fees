import {  useState } from "react";
import { AppBar } from "@mui/material";
import Expense from "../../model/Expense";
import FeeCalculator from "../../calculators/FeeCalculator";
import ItemCost from "../../components/shared/ItemCost";
import SellingCost from "../../components/shared/SellingCost";
import SellingTarget from "../../components/shared/SellingTarget";
import { useAppSelector } from "../../store/hooks";

const CalculatorPage =  () => {
   
    const sellPrice = useAppSelector(state => state.calculator.totalSellPrice);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [totalFee, setTotalFee] = useState<number>(0);

    const handleItemCostChange = (itemPrice : number) => {
        setTotalCost(itemPrice);
    }

    const handleSellingFeesChange = (sellingFees : Expense[]) => {
       calculateTotalFees(sellingFees);
      // setShippingChrg(shippingChrg);
      // setSellPrice(sellPrice);
    }

    const calculateTotalFees = (fees:Expense[]) => {

        const feeCalculator = new FeeCalculator(
            fees
        );
        
        setTotalFee(feeCalculator.calculateFees());
    }

    return(
        
        <div >
            <AppBar position="static">    
                Fee Calculator
            </AppBar>

            <div className="calculatorContent" >
                <ItemCost handleOnChange={handleItemCostChange} />
                <SellingTarget/>
                <SellingCost handleOnChange={handleSellingFeesChange} />
            </div>
            <br />                    
            <div className="row" >
                <div className="col-12">
                    <span>Total Fees</span>
                    <br></br>
                    <span>${totalFee.toPrecision()}</span>
                </div>
                </div>
                <div className="row" >
                <div className="col-12">
                    <span>Expected Profit</span>
                    <br></br>
                    <span>${ (sellPrice - totalFee - totalCost).toPrecision(3)}</span>
                </div>
                </div>
            </div>

    );

}


export default CalculatorPage;