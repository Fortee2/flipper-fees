import { Card, CardContent, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FeeTypes from "../../enums/FeeTypes";
import Expense from "../../model/Expense";
import { PrecentageInput } from "./PrecentageInput";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setShippingPaid } from "../../Slices/CalculatorSlice"
import {setIntialFees, updateFee, selectSepecificFee } from "../../Slices/FeeSlice";
import SellingFee from "../../model/SellingFee";

interface SellingCostProps {
    handleOnChange: (fees : Expense[], sellPrice: number, shippingChrg: number)    => void;
}

const SellingCost = (props: SellingCostProps) => {
    const dispatch = useAppDispatch();
    const fees = useAppSelector(state => state.fees.platformFee.fees);
    const sellPrice = useAppSelector(state => state.calculator.totalSellPrice);
    const shippingPaid = useAppSelector(state => state.calculator.shippingPaid );
    const belowStdFee = useAppSelector(state => {return selectSepecificFee(state,  "Below Std. Fee")} );
    const [estimatedPacking, setEstimatedPacking] = useState<number>(0);
    const baseFee = useAppSelector(state => {return selectSepecificFee(state,  "Base Fee")} );

    const [salesTax, setSalesTax] = useState<number>(8);
    const [salesTaxType , setSalesTaxType] = useState<FeeTypes>(FeeTypes.PERCENTAGE);
    const [totalTax, setTotalTax] = useState<number>(0);

    const loadIntialFees = () => {
        const updatedFees = new SellingFee(
            "eBay",
            [
                {
                    name: "Listing Fee",
                    amount: 0.3,
                    rate: 0.3,
                    rateType: FeeTypes.FIXED
                },
                {
                    name: "Shipping",
                    amount: shippingPaid,
                    rate: 0,
                    rateType: FeeTypes.FIXED
                },
                {
                    name: "Packing",
                    amount: estimatedPacking,
                    rate: 0,
                    rateType: FeeTypes.FIXED
                },
                { 
                    name: "Base Fee",
                    amount: 0,
                    rate: 12.9,
                    rateType: FeeTypes.PERCENTAGE
                },
                {
                    name: "Below Std. Fee",
                    amount: 0,
                    rate: 6,
                    rateType: FeeTypes.PERCENTAGE
                }
            ]);

        dispatch(setIntialFees(updatedFees));
    }

    const onHandleChange = () => {    

        props.handleOnChange(fees, sellPrice, 0);
    }

    //Component did mount
    useEffect(() => {
        loadIntialFees();
    }, []);


    useEffect(() => {
        dispatch(
            updateFee(
                {
                ...baseFee,
                ...{ amount:  ((FeeTypes.PERCENTAGE === baseFee.rateType && baseFee.rate !==0) 
                    ? ( (totalTax + sellPrice) * baseFee.rate) : baseFee.rate)}
                }
            )
        );
                
        onHandleChange();   
    } ,[shippingPaid, estimatedPacking, baseFee, sellPrice, salesTax]);

    useEffect(() => {
        dispatch(
            updateFee(
               {
                ...belowStdFee, 
                ...{ amount:  ((FeeTypes.PERCENTAGE === belowStdFee.rateType && belowStdFee.rate !== 0) 
                        ? ( (totalTax +sellPrice ) * belowStdFee.rate) : belowStdFee.rate)}
               }
            )
        );
        
        onHandleChange();   
    }, [ shippingPaid, estimatedPacking, belowStdFee, sellPrice, salesTax]);

    useEffect(() => {
        setTotalTax((salesTaxType === FeeTypes.PERCENTAGE) ? (sellPrice * salesTax) : salesTax);
    }, [salesTax, salesTaxType, sellPrice]);

    return (
        <>

            <Card variant="outlined">
                <CardContent>
                    <Divider>Ebay Selling Costs</Divider>
                    <div className="row">
                        <div className="col-6">
                            <TextField
                                label="Actual Postage"     
                                type={'number'}
                                onChange={(event)=>{
                                    dispatch(setShippingPaid(Number(event.target.value)));
                                }
                                }
                                value={shippingPaid}
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
                            <span>Total + Tax ${totalTax + sellPrice}</span>
                            <br/>
                            <span>Tax Amt:${totalTax}</span>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-9">
                            <PrecentageInput
                                label="Seller Fees"
                                amtType={baseFee.rateType}
                                value={baseFee.amount}
                                handleOnChange={(value, amtType)=>{
                                    const updateFeeRate = {
                                        rate: value,
                                        rateType: amtType
                                    }

                                    const updateExpense = {
                                        ...baseFee, ...updateFeeRate
                                    }

                                    dispatch(updateFee(updateExpense));
                                }}
                            /> 
                        </div>
                        <div className="col-3">
                            <span>${baseFee.amount}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <PrecentageInput
                                label="Below Std. Fee"
                                amtType={belowStdFee.rateType}
                                value={belowStdFee.rate}
                                handleOnChange={(value, amtType)=>{
                                    const updateFeeRate = {
                                        rate: value,
                                        rateType: amtType
                                    }

                                    const updateExpense = {
                                        ...belowStdFee, ...updateFeeRate
                                    }

                                    dispatch(updateFee(updateExpense));
                                }}
                            /> 
                        </div>
                        <div className="col-3">
                            <span>${belowStdFee.amount}</span>
                        </div>
                    </div>

                </CardContent>    
            </Card>
     

        </>
    )
}

export default SellingCost;