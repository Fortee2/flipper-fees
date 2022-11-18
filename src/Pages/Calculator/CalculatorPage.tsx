import { AppBar } from "@mui/material";
import ItemCost from "../../components/shared/ItemCost";
import EbaySellingCost from "../../components/channels/EbaySellingCost";
import SellingTarget from "../../components/shared/SellingTarget";
import { useAppSelector } from "../../store/hooks";
import { selectTotalFees } from "../../Slices/FeeSlice";
import { selectTotalCost } from "../../Slices/CalculatorSlice";

const CalculatorPage =  () => {
   
    const sellPrice = useAppSelector(state => state.calculator.sellPrice);
    const shippingChrgd = useAppSelector(state => state.calculator.shippingChrgd);
    const shippingPaid = useAppSelector(state => state.calculator.shippingPaid);
    const packingMaterials = useAppSelector(state => state.calculator.packingMaterials);
    const totalCost = useAppSelector (state => selectTotalCost(state))
    const totalFee = useAppSelector(state => selectTotalFees(state));

    return(
        
        <div >
            <AppBar position="static">    
                Fee Calculator
            </AppBar>

            <div className="calculatorContent" >
                <ItemCost />
                <SellingTarget/>
                <EbaySellingCost />
            </div>
            <br />                    
            <div className="row" >
                <div className="col-12">
                    <span>Total Fees</span>
                    <br></br>
                    <span>${totalFee}</span>
                </div>
                </div>
                <div className="row" >
                <div className="col-12">
                    <span>Expected Profit</span>
                    <br></br>
                    <span>${sellPrice + shippingChrgd - shippingPaid- packingMaterials- totalFee - totalCost}</span>
                </div>
                </div>
            </div>

    );

}


export default CalculatorPage;