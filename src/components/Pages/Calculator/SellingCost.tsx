import { Card, CardContent, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FeeTypes from "../../../enums/FeeTypes";
import SellingFee from "../../../model/SellingFee";
import { PrecentageInput } from "../../shared/PrecentageInput";

interface SellingCostProps {
    handleOnChange: (fees : SellingFee[], sellPrice: number, shippingChrg: number)    => void;
}

const SellingCost = (props: SellingCostProps) => {
    const [estimatedShipping, setEstimatedShipping] = useState<number>(0);
    const [estimatedPacking, setEstimatedPacking] = useState<number>(0);
    const [sellFee, setSellFee] = useState<number>(12.99);
    const [bLowStdFee, setbLowStdFee] = useState<number>(6);
    const [baseFee, setBaseFee] = useState<number>(0);
    const [baseFeeType, setBaseFeeType] = useState<FeeTypes>(FeeTypes.PERCENTAGE);
    const [extraFee, setExtraFee] = useState<number>(0);
    const [extraFeeType, setExtraFeeType] = useState<FeeTypes>(FeeTypes.PERCENTAGE);
    const [sellPrice, setSellPrice] = useState<number>(0);
    const [shippingChrg, setShippingChrg] = useState<number>(0);
    const [salesTax, setSalesTax] = useState<number>(8);
    const [salesTaxType , setSalesTaxType] = useState<FeeTypes>(FeeTypes.PERCENTAGE);
    const [totalTax, setTotalTax] = useState<number>(0);

    const onHandleChange = () => {    
        const fees : SellingFee[] = [
            {
                name: "Shipping",
                amount: estimatedShipping,
            },
            {
                name: "Packing",
                amount: estimatedPacking,
            },
            {
                name: "Fixed Fee",
                amount: 0.3,
            },
            { 
                name: "Fee",
                amount: baseFee,
            },
            {
                name: "Extra Fee",
                amount: extraFee,
            }
        ];
        props.handleOnChange(fees, sellPrice, shippingChrg);
    }

    useEffect(() => {
        const totalAskingPrice = sellPrice + shippingChrg;
        setTotalTax( (FeeTypes.PERCENTAGE === salesTaxType) ? (totalAskingPrice * salesTax) : salesTax);

        setBaseFee(  ((FeeTypes.PERCENTAGE === baseFeeType) ? ( (totalTax + totalAskingPrice) * sellFee) : sellFee));
        setExtraFee( ((FeeTypes.PERCENTAGE === extraFeeType) ? ( (totalTax + totalAskingPrice) * bLowStdFee) : bLowStdFee));
       
        onHandleChange();   
    } ,[estimatedShipping, estimatedPacking, sellFee, bLowStdFee, sellPrice, shippingChrg,salesTax]);

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Divider>Selling Target</Divider>   
                    <div className="row">
                        <div className="col-6">
                            <TextField
                                required
                                id="selling-price"
                                type={"number"}
                                label="Listing Price"
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
                                label="Shipping Charge"
                                onChange={(event)=>{             
                                    setShippingChrg(Number(event.target.value));
                                }   
                                }
                                value={shippingChrg}
                            />
                        </div>
                    </div>
          
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Divider>Ebay Selling Costs</Divider>
                    <div className="row">
                        <div className="col-6">
                            <TextField
                                label="Actual Postage"     
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
                                label="Packing Cost"
                                type={'number'}
                                onChange={(event)=>{
                                    setEstimatedPacking(Number(event.target.value));
                                    }
                                }
                                value={estimatedPacking}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <PrecentageInput
                                label="Estimated Tax Chrg'd"
                                amtType={salesTaxType}
                                value={salesTax}
                                handleOnChange={(value, amtType)=>{
                                        setSalesTax(value);
                                        setSalesTaxType(amtType);
                                    }
                                }
                            />
                        </div>
                        <div className="col-3">
                            <span>${totalTax}</span>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-9">
                            <PrecentageInput
                                label="Seller Fees"
                                amtType={baseFeeType}
                                value={sellFee}
                                handleOnChange={(value, amtType)=>{
                                    setSellFee(value);
                                    setBaseFeeType(amtType);
                                }}
                            /> 
                        </div>
                        <div className="col-3">
                            <span>${baseFee}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <PrecentageInput
                                label="Below Std. Fee"
                                amtType={extraFeeType}
                                value={bLowStdFee}
                                handleOnChange={(value, amtType)=>{
                                    setbLowStdFee(value);
                                   setExtraFeeType(amtType);
                                }}
                            /> 
                        </div>
                        <div className="col-3">
                            <span>${extraFee}</span>
                        </div>
                    </div>

                </CardContent>    
            </Card>
     

        </>
    )
}

export default SellingCost;