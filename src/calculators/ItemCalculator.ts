class ItemCalculator {
    price: number;
    tax: number;
    calculatedTax: number;
    estimatedPostage: number;
    estimatedPackingMaterials: number;
    totalItemCost: number ;


    constructor(price: number, tax: number, estimatedPostage: number, estimatedPackingMaterials: number){
        this.price = price;
        this.tax = tax;
        this.calculatedTax = 0;
        this.estimatedPostage = estimatedPostage;
        this.estimatedPackingMaterials = estimatedPackingMaterials;
        this.totalItemCost = 0;

        this.calculateTaxAmount();
        this.calculateTotalItemCost();
    }
    
     protected calculateTaxAmount = (): number => {

        this.calculatedTax = this.convertTaxToPrecentage()  * this.price;
        return this.calculatedTax;
    }

    protected calculateTotalItemCost = (): number => {
        this.totalItemCost = this.price + this.calculatedTax + this.estimatedPostage + this.estimatedPackingMaterials;
        return this.totalItemCost;
    }

    protected convertTaxToPrecentage = () : number => {
        if(this.tax === 0) return 0;

        return this.tax / 100;
    }
}

export default ItemCalculator;