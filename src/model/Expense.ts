import FeeTypes from "../enums/FeeTypes";

class Expense{
    public name: string;
    public amount: number;
    public rate: number;
    public rateType: FeeTypes;

    constructor(name: string, amount: number){
        this.name = name;
        this.amount = amount;
        this.rate = 0;
        this.rateType = FeeTypes.PERCENTAGE;
    }
}
export default Expense;