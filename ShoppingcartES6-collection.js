const { map,reduce }=require('@laufire/utils/collection');

const rates = {
    Carrot: 10,
    Apple: 200,
    Guava: 50,
  };
  
  const discounts = {
    // values are in percentages.
    Apple: 10,
  };
  
  const taxes = {
    // values are in percentages.
    Carrot: 5,
    Guava: 10,
  };
  
  const purchases = [
  {
    item: 'Carrot',
    units: 20,
  },
  {
    item: 'Apple',
    units: 2,
  },
  {
    item: 'Guava',
    units: 1,
  }
];

const getDiscountPercent=(productName)=>(discounts[productName] || 0)/100;

const getTaxPercent=(productName)=>(taxes[productName] || 0)/100;

const getUnitPrice=(itemName)=> {
  const discount= rates[itemName]*getDiscountPercent(itemName);
  const tax= rates[itemName]*getTaxPercent(itemName);
  const unitPrice= (rates[itemName]- discount) + tax;
  return unitPrice;
};

const getLineItemPrice =(lineItem)=> {
  return lineItem.units * getUnitPrice(lineItem.item);
}

const getSum=(purchases)=>map(purchases,(getLineItemPrice)).reduce((prevValue,currValue)=>prevValue+currValue,0);

const main=()=>  {
  console.log(getSum(purchases));
}
 main();