import { AppBar } from "@mui/material";
import ItemCost from "../../components/shared/ItemCost";
import EbaySellingCost from "../../components/channels/EbaySellingCost";
import SellingTarget from "../../components/shared/SellingTarget";
import MeracariSellingCost from "../../components/channels/MercariSellingCost";

const CalculatorPage =  () => {

    return(
        
        <div >
            <AppBar position="static">    
                Fee Calculator
            </AppBar>

            <div className="calculatorContent" >
                <ItemCost />
                <SellingTarget/>
                <EbaySellingCost />
                <MeracariSellingCost />
            </div>
        </div>
    );

}


export default CalculatorPage;