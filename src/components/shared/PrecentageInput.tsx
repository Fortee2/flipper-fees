import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import FeeTypes from "../../enums/FeeTypes";

interface PrecentageInputProps {
    label: string;
    value: number;
    amtType: FeeTypes;
    handleOnChange: (newValue : number, valueType :  number)    => void;   
}

export const PrecentageInput = (props: PrecentageInputProps) => {
    const [controlValue, setControlValue] = useState<number>(props.value);
    const [amtType, setAmtType] = useState<number>(props.amtType);

    const calculateNewValue = () => {
        const newValue: number = (amtType == FeeTypes.PERCENTAGE) ? controlValue / FeeTypes.PERCENTAGE : controlValue;
        props.handleOnChange(newValue,amtType);
    }

    useEffect(() => {
        calculateNewValue();
    } , [controlValue, amtType]);

    return (
        <>
            <div className="float-left">
                <TextField
                    required
                    type={"number"}
                    inputProps={{ 'data-testid': 'item-price-input' }}
            
                    onChange={(event)=>{
                        setControlValue(parseFloat(event.target.value));
                        calculateNewValue();
                    } }
                    value={controlValue}
                />
            </div>
            <div className="float-left">
                <FormControl   >
                    <Select
                        value={amtType}
                        data-testid = "amtType-select"
                        onChange={(event)=>{
                            setAmtType(event.target.value as number);
                            calculateNewValue() ;
                        }}
                    >
                    <MenuItem value="100">Precentage</MenuItem>
                    <MenuItem value="1">Fixed Amt.</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </>
    );
}