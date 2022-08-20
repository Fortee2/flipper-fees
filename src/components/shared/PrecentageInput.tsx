import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface PrecentageInputProps {
    label: string;
    value: number;
    handleOnChange: (newValue : number)    => void;   
}

export const PrecentageInput = (props: PrecentageInputProps) => {
    const [controlValue, setControlValue] = useState<number>(props.value);
    const [amtType, setAmtType] = useState<number>(100);

    const calculateNewValue = () => {
        const newValue: number = (amtType == 100) ? controlValue / 100 : controlValue;
        props.handleOnChange(newValue);
    }

    useEffect(() => {
        calculateNewValue();
    } , [controlValue, amtType]);

    return (
        <div>
            <TextField
                required
                type={"number"}
                label={props.label}
                onChange={(event)=>{
                    setControlValue(parseFloat(event.target.value));
                    calculateNewValue();
                } }
                value={controlValue}
            />
            <FormControl fullWidth>
                <Select
                    value={amtType}
                    label="Precentage?"
                    onChange={(event)=>{
                        setAmtType(event.target.value as number);
                        calculateNewValue() ;
                    }}
                >
                <MenuItem value={100}>Precentage</MenuItem>
                <MenuItem value={1}>Fixed Amt.</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}