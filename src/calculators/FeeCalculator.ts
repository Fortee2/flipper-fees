import Expense from "../model/Expense";

class FeeCalculator {
    public fees: Expense[] = [];
    
    constructor( fees: Expense[]){
        this.fees = fees;
    }
    
    public calculateFees = (): number => {
        let totalFees = 0;
        this.fees.forEach(fee => {
            totalFees += 0;
        } );
        return totalFees;
    }
}

export default FeeCalculator;