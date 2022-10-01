import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {  setSellPrice, setShippingChrgd } from "../../Slices/CalculatorSlice"

const SellingTarget = () => {

    const dispatch = useAppDispatch();
    const sellPrice = useAppSelector(state => state.calculator.sellPrice);
    const shippingChrgd = useAppSelector(state => state.calculator.shippingChrgd);
    
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
                    </div>  
            </CardContent>
        </Card>
    </>
    )
}

export default SellingTarget;