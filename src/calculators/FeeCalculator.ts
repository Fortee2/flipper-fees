import FeeTypes from "../enums/FeeTypes";
import SellingFee from "../model/SellingFee";
import ItemCalculator from "./ItemCalculator";

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
            totalFees += this.calculateFee(fee);
        } );
        return totalFees;
    }

    protected calculateFee = (fee: SellingFee): number => {
        if(fee.amount !== 0){
            switch(fee.type){
                case FeeTypes.PERCENTAGE:
                    return (this.sellPrice + this.shippingAmt) * fee.amount;
                    break;
                case FeeTypes.FIXED: 
                    return fee.amount;
                    break;
            }
        }
        

        return 0;  
    }
}

export default FeeCalculator;