import { Card, CardContent, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect} from "react";
import ItemCalculator from "../../calculators/ItemCalculator";
import FeeTypes from "../../enums/FeeTypes";
import { PrecentageInput } from "./PrecentageInput";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {setPricePaid, setTaxPaid,setTaxRate, setTaxRateType } from "../../Slices/CalculatorSlice"

const ItemCost = () => {
    const itemPrice = useAppSelector(state => state.calculator.pricePaid);
    const totalTax = useAppSelector(state => state.calculator.taxPaid);
    const salesTaxRate = useAppSelector(state => state.calculator.taxRate);
    const salesTaxRateType = useAppSelector(state => state.calculator.taxRateType);

    const dispatch = useAppDispatch();

    const setCalculatedAmount = (itemPrice : number, salesTax :number, salesTaxType: FeeTypes ) => {
        const Item = new ItemCalculator( itemPrice, salesTax, salesTaxType, 0, 0 );
        dispatch(setTaxPaid(Item.calculatedTax));
    }

    useEffect(() => {
        setCalculatedAmount(itemPrice, salesTaxRate, salesTaxRateType);
        
    },[itemPrice, salesTaxRate, salesTaxRateType]);


    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Divider>
                        Item Cost
                    </Divider>
                    <div className="row">
                        <div className="col-12">
                            <TextField
                                required
                                inputProps={{ 'data-testid': 'item-cost-input' }}
                                id="item-price"
                                type={"number"}
                                onChange={(event)=>{
                                    dispatch((setPricePaid(Number(event.target.value))));

                                } }
                                label="Item Cost"
                                value={itemPrice}
                            />    
                        </div>
                    </div>   
                    <div className="row"  >
                        <div className="col-12 center">
                                <PrecentageInput
                                    label="Sales Tax"
                                    dataTestId={"sales-input"}
                                    amtType={salesTaxRateType}
                                    value={salesTaxRate}
                                    handleOnChange={(value, amtType)=>{ 
                                    
                                        dispatch(setTaxRate(value));
                                        dispatch(setTaxRateType(amtType));
                                    }}
                                />
                            </div>
                       
                    </div>
                    <div className="row"> 
                        <div className="col-6">
                            <span>Tax Amount</span>
                            <br></br>
                            <span  data-testid='spTotalTax'>${parseFloat(totalTax.toFixed(3))}</span>
                        </div>
                        <div className="col-6">
                            <span>Total Cost</span>
                            <br></br>
                            <span data-testid='spTotalCost'>${totalTax + itemPrice}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            
        </>
    );
}   

export default ItemCost;