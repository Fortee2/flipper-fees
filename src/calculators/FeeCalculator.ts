import Expense from "../model/Expense";

class FeeCalculator {
    public sellPrice: number;
    public shippingAmt: number;
    public fees: Expense[] = [];
    
    constructor(sellPrice:number, shippingAmt:number, fees: Expense[]){
        this.sellPrice = sellPrice;
        this.shippingAmt = shippingAmt;
        this.fees = fees;
    }
    
    public calculateFees = (): number => {
        let totalFees = 0;
        this.fees.forEach(fee => {
            totalFees += fee.amount;
        } );
        return totalFees;
    }
}

export default FeeCalculator;