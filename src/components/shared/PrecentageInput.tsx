import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import FeeTypes from "../../enums/FeeTypes";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

interface PrecentageInputProps {
    label: string;
    value: number;
    amtType: FeeTypes;
    dataTestId?: string;
    handleOnChange: (newValue : number, valueType :  number)    => void;   
}

export const PrecentageInput = (props: PrecentageInputProps) => {
    const [controlValue, setControlValue] = useState<number>(props.value);
    const [amtType, setAmtType] = useState<number>(props.amtType);

    const calculateNewValue = () => {
        const newValue: number = (amtType == FeeTypes.PERCENTAGE) ? controlValue / FeeTypes.PERCENTAGE : controlValue;
        props.handleOnChange(newValue,amtType);
    }

    const onHandleClick = (
            event: React.MouseEvent<HTMLElement>,
            newAlignment: FeeTypes,
        ) => {
            setAmtType(newAlignment);
        }

    useEffect(() => {
        calculateNewValue();
    } , [controlValue, amtType]);

    return (
        <>
            <div className="float-left width-30" >
                <TextField
                    required
                    type={"number"}
                    inputProps={{ 'data-testid': ((props.dataTestId === null) ? 'item-price-input' : props.dataTestId) }}
                    label={props.label}
                    onChange={(event)=>{
                        setControlValue(parseFloat(event.target.value));
                        calculateNewValue();
                    } }
                    value={controlValue}
                />
            </div>
            <div className="float-left">
                <ToggleButtonGroup
                    value={amtType}
                    exclusive
                    onChange={onHandleClick}
                    aria-label="precentage-toggle-button"
                >
                    <ToggleButton value={FeeTypes.PERCENTAGE} aria-label="percentage">
                        <PercentIcon />
                    </ToggleButton>
                    <ToggleButton value={FeeTypes.FIXED} aria-label="fixed">
                        <AttachMoneyIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
    );
}