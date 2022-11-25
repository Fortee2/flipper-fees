import { Card, CardContent, Divider } from "@mui/material";
import { useEffect } from "react";
import FeeTypes from "../../enums/FeeTypes";
import { addFee, removeFee } from "../../Slices/FeeSlice";
import PaymentFees from "../shared/PaymentFees";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const MeracariSellingCost = () => {
    const dispatch = useAppDispatch();
    const baseFee = useAppSelector(state => state.mercariFees.baseFee);
    const sellPrice = useAppSelector(state => state.calculator.totalSellPrice);

    useEffect(() => {
        let fvFee = 0;

        if(sellPrice > 0) {
            fvFee = (baseFee.rateType === FeeTypes.PERCENTAGE) ? (sellPrice * (baseFee.rate / 100)) : baseFee.rate;
            dispatch(removeFee({name:"Final Value Fee", amount: fvFee}));
            dispatch(addFee({name:"Final Value Fee", amount: fvFee}));
        }
    }, [sellPrice]);

    return(
        <Card variant="outlined">
            <CardContent>
                <Divider>Mercari Selling Costs</Divider>
                <div className="row" >
                    <div className="col-9">
                        <span>Final Value Fee: {baseFee.rate}%</span>
                    </div>
                    <div className="col-3">
                        <span>${0}</span>
                    </div>
                </div>
                <PaymentFees />

            </CardContent>    
        </Card>
    );
}

export default MeracariSellingCost;
