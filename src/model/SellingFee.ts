import FeeTypes from "../enums/FeeTypes";

class SellingFee{
    public name: string;
    public amount: number;
    public type: FeeTypes;

    constructor(name: string, amount: number, type: FeeTypes){
        this.name = name;
        this.amount = amount;
        this.type = type;

        if(this.type === FeeTypes.PERCENTAGE){
            this.amount = this.convertToPrecentage();
        }
    }

    protected convertToPrecentage = (): number => {
        if(this.amount === 0) return 0;

        return this.amount / 100;
    }
}
export default SellingFee;