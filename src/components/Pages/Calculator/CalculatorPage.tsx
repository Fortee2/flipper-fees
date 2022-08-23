import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import ItemCalculator from "../../../calculators/ItemCalculator";
import { AppBar, Divider } from "@mui/material";
import { Box } from "@mui/system";
import SellingFee from "../../../model/SellingFee";
import FeeTypes from "../../../enums/FeeTypes";
import FeeCalculator from "../../../calculators/FeeCalculator";
import { PrecentageInput } from "../../shared/PrecentageInput";
import ItemCost from "./ItemCost";

const CalculatorPage =  () => {
   
    const [sellPrice, setSellPrice] = useState<number>(0);
    const [shippingChrg, setShippingChrg] = useState<number>(0);
    const [estimatedShipping, setEstimatedShipping] = useState<number>(0);
    const [estimatedPacking, setEstimatedPacking] = useState<number>(0);
    const [feePrct, setFeePrct] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [totalFee, setTotalFee] = useState<number>(0);


    const setCalculatedAmount = (itemPrice : number, salesTax :number, salesTaxType: FeeTypes ) => {
        const Item = new ItemCalculator( itemPrice, salesTax, salesTaxType, 0, 0 );

        setTotalCost(Item.totalItemCost);
    }

    const calculateTotalFees = (fees:SellingFee[]) => {

        const feeCalculator = new FeeCalculator(
            sellPrice,
            shippingChrg,
            fees
        );
        
        setTotalFee(feeCalculator.calculateFees());
    }

    useEffect(() => {
        const fees:SellingFee[]= [];
        fees.push(new SellingFee("selling" , feePrct));
        fees.push(new SellingFee("shipping" , estimatedShipping));
        fees.push(new SellingFee("packing" , estimatedPacking));
        calculateTotalFees(fees);
    },[sellPrice, feePrct, shippingChrg,estimatedShipping,estimatedPacking]);


    return(
        
        <div >
            <AppBar position="static">    
                Fee Calculator
            </AppBar>

            <Box >
                <ItemCost handleOnChange={setCalculatedAmount} />
                <div>
                    <span>Total Cost</span>
                    <br></br>
                    <span>${totalCost}</span>
                </div>
            </Box>
        <br />                    
          
            <Divider>Selling Target</Divider>
        
            <Box>
                <div className="row">
                    <div className="col-6">
                        <TextField
                            required
                            id="selling-price"
                            type={"number"}
                            label="Selling Price"
                            onChange={(event)=>{
                                setSellPrice(Number(event.target.value));
                            }
                            }
                            value={sellPrice}
                        />
                    </div>
                    <div className="col-6">
                        <TextField
                            required
                            id="shipping"
                            type={"number"}
                            label="Shipping Amount"
                            onChange={(event)=>{             
                                setShippingChrg(Number(event.target.value));
                            }   
                            }
                            value={shippingChrg}
                        />
                    </div>
                </div>
            </Box>
            <Divider>Selling Costs</Divider>
                <div className="row">
                    <div className="col-6">
                        <TextField
                            label="Estimated Postage"     
                            type={'number'}
                            onChange={(event)=>{
                                setEstimatedShipping(Number(event.target.value));
                            }
                            }
                            value={estimatedShipping}
                        />
                    </div>
                    <div className="col-6">
                        <TextField
                            label="Estimated Packing"
                            type={'number'}
                            onChange={(event)=>{
                                setEstimatedPacking(Number(event.target.value));
                            }
                            }
                            value={estimatedPacking}
                        />
                    </div>
                </div>
                <div className="row" >
                    <div className="col-12">
                        <PrecentageInput
                            label="Seller Fees"
                            amtType={FeeTypes.PERCENTAGE}
                            value={feePrct}
                            handleOnChange={(value)=>{
                                setFeePrct(value);
                            }}
                        /> 
                    </div>
                </div>
                <div className="row" >
                    <div className="col-12">
                        <span>Total Fees</span>
                        <br></br>
                        <span>${totalFee.toPrecision(2)}</span>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-12">
                        <span>Expected Profit</span>
                        <br></br>
                        <span>${ (sellPrice + shippingChrg - totalFee - totalCost).toPrecision(2)}</span>
                    </div>
                </div>
        </div>

    );

}


export default CalculatorPage;