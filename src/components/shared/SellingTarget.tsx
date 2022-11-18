import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {  setSellPrice, setShippingChrgd,  setShippingPaid , setPackingMaterials} from "../../Slices/CalculatorSlice"
import { useState } from "react";



const SellingTarget = () => {

    const dispatch = useAppDispatch();
    const sellPrice = useAppSelector(state => state.calculator.sellPrice);
    const shippingChrgd = useAppSelector(state => state.calculator.shippingChrgd);
    const shippingPaid = useAppSelector(state => state.calculator.shippingPaid);
    const packingMaterials = useAppSelector(state => state.calculator.packingMaterials);

    return(
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
                                    dispatch(setSellPrice(Number( event.target.value)));
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
                                    dispatch(setShippingChrgd(Number( event.target.value)));        
                                }   
                                }
                                value={shippingChrgd}
                            />
                        </div>
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
                                        dispatch(setPackingMaterials(Number(event.target.value)));
                                        }
                                    }
                                    value={packingMaterials}
                                />
                            </div>
                        </div>
                    </div>  
            </CardContent>
        </Card>
    </>
    )
}

export default SellingTarget;