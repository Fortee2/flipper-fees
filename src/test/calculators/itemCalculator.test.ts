import ItemCalculator from "../../calculators/ItemCalculator";
import FeeTypes from "../../enums/FeeTypes";

describe("ItemCalculator Fixed", () => {
    const itemCalculator = new ItemCalculator(100, 0.1, FeeTypes.FIXED, 10, 10);

    it("should calculate tax amount", () => {
        expect(itemCalculator.calculatedTax).toBe(.1);
    });

    it("should calculate total item cost", () => {
        expect(itemCalculator.totalItemCost).toBe(120.1);
    });

    it("should return estimated packing", () => {
        expect(itemCalculator.estimatedPackingMaterials).toBe(10);
    });
    
    it("should return estimated postage", () => {
        expect(itemCalculator.estimatedPostage).toBe(10);
    }); 
});

describe("ItemCalculator Percentage", () => {
    const itemCalculator = new ItemCalculator(200, 0.1, FeeTypes.PERCENTAGE, 15, 20);

    it("should calculate tax amount", () => {
        expect(itemCalculator.calculatedTax).toBe(20);
    });

    it("should calculate total item cost", () => {
        expect(itemCalculator.totalItemCost).toBe(255);
    });

    it("should return estimated packing", () => {
        expect(itemCalculator.estimatedPackingMaterials).toBe(20);
    });
    
    it("should return estimated postage", () => {
        expect(itemCalculator.estimatedPostage).toBe(15);
    }); 
});

describe("ItemCalculator 0 Percent Tax", () => {
    const itemCalculator = new ItemCalculator(100, 0, FeeTypes.PERCENTAGE, 10, 10);

    it("should calculate tax amount", () => {
        expect(itemCalculator.calculatedTax).toBe(0);
    });

    it("should calculate total item cost", () => {
        expect(itemCalculator.totalItemCost).toBe(120);
    });
});