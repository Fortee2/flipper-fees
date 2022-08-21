import SellingFee from "../model/SellingFee";

class FeeCalculator {
    public sellPrice: number;
    public shippingAmt: number;
    public fees: SellingFee[] = [];
    
    constructor(sellPrice:number, shippingAmt:number, fees: SellingFee[]){
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