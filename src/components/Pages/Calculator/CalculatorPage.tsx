import {  useState } from "react";
import { AppBar } from "@mui/material";
import Expense from "../../../model/Expense";
import FeeCalculator from "../../../calculators/FeeCalculator";
import ItemCost from "./ItemCost";
import SellingCost from "./SellingCost";

const CalculatorPage =  () => {
   
    const [sellPrice, setSellPrice] = useState<number>(0);
    const [shippingChrg, setShippingChrg] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [totalFee, setTotalFee] = useState<number>(0);

    const handleItemCostChange = (itemPrice : number) => {
        setTotalCost(itemPrice);
    }

    const handleSellingFeesChange = (sellingFees : Expense[], sellPrice: number, shippingChrg: number ) => {
       calculateTotalFees(sellingFees);
       setShippingChrg(shippingChrg);
       setSellPrice(sellPrice);
    }

    const calculateTotalFees = (fees:Expense[]) => {

        const feeCalculator = new FeeCalculator(
            sellPrice,
            shippingChrg,
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
                    <span>${ (sellPrice + shippingChrg - totalFee - totalCost).toPrecision(3)}</span>
                </div>
                </div>
            </div>

    );

}


export default CalculatorPage;