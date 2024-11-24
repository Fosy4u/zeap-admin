export const productTypeOptions = [
  {
    name: 'Ready Made Cloth',
    value: 'readyMadeCloth',
  },
  {
    name: 'Ready Made Shoe',
    value: 'readyMadeShoe',
  },
  {
    name: 'Accessory',
    value: 'accessory',
  },
  {
    name: 'Bespoke Cloth',
    value: 'bespokeCloth',
  },
  {
    name: 'Bespoke Shoe',
    value: 'bespokeShoe',
  },
];

export const getProductTypeLabel = (type: string) => {
  const found = productTypeOptions.find((option) => option.value === type);
  return found?.name;
};
