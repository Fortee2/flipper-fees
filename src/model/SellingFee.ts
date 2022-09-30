import Expense from "./Expense";

export default class SellingFee {
 
    readonly platformName: string;
    fees: Expense[]; 

    constructor(platformName: string, fees:Expense[]){
        this.platformName = platformName;
        this.fees = fees;
    }

    
}