import { Card, CardContent, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import ItemCalculator from "../../../calculators/ItemCalculator";
import FeeTypes from "../../../enums/FeeTypes";
import { PrecentageInput } from "../../shared/PrecentageInput";

interface ItemCostProps {
    handleOnChange: (itemPrice : number)    => void;
}

const ItemCost = (props: ItemCostProps ) => {
    const [itemPrice, setItemPrice] = useState<number>(0);
    const [salesTax, setSalesTax] = useState<number>(0);
    const [salesTaxType , setSalesTaxType] = useState<number>(FeeTypes.PERCENTAGE);
    const [totalTax, setTotalTax] = useState<number>(0);
    const [totaCost, setTotalCost] = useState<number>(0);

    const setCalculatedAmount = (itemPrice : number, salesTax :number, salesTaxType: FeeTypes ) => {
        const Item = new ItemCalculator( itemPrice, salesTax, salesTaxType, 0, 0 );
        setTotalTax(Item.calculatedTax)
        setTotalCost(Item.totalItemCost);
    }

    useEffect(() => {
        setCalculatedAmount(itemPrice, salesTax, salesTaxType);
        
    },[itemPrice, salesTax]);

    useEffect(() => {
        props.handleOnChange(totaCost);
    } ,[totaCost]);
    
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
                                data-testid = "item-price-input"
                                id="item-price"
                                type={"number"}
                                onChange={(event)=>{
                                    setItemPrice( Number(event.target.value));
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
                                    amtType={FeeTypes.PERCENTAGE}
                                    value={salesTax}
                                    handleOnChange={(value, amtType)=>{ 
                                        setSalesTax(value);
                                        setSalesTaxType(amtType);
                                    }}
                                />
                            </div>
                       
                    </div>
                    <div className="row"> 
                        <div className="col-6">
                            <span>Tax Amount</span>
                                <br></br>
                                <span>${totalTax}</span>
                        </div>
                        <div className="col-6">
                            <span>Total Cost</span>
                            <br></br>
                            <span>${totaCost}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            
        </>
    );
}   

export default ItemCost;