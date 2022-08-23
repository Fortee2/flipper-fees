import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import FeeTypes from "../../../enums/FeeTypes";
import { PrecentageInput } from "../../shared/PrecentageInput";

interface ItemCostProps {
    handleOnChange: (itemPrice : number, taxValue: number,  taxType :  FeeTypes)    => void;
}

const ItemCost = (props: ItemCostProps ) => {
    const [itemPrice, setItemPrice] = useState<number>(0);
    const [salesTax, setSalesTax] = useState<number>(0);
    const [salesTaxType , setSalesTaxType] = useState<number>(FeeTypes.PERCENTAGE);

    useEffect(() => {
        props.handleOnChange(itemPrice, salesTax, salesTaxType);
    },[itemPrice, salesTax]);

    return (
        <>
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
                <div className="col-6">
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
                <div className="col-6">
                    <span>Tax Amount</span>
                        <br></br>
                        <span>${salesTax}</span>
                </div>
            </div>
        </>
    );
}   

export default ItemCost;