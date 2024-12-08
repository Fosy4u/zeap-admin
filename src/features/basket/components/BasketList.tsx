import { useState } from 'react';
import { BasketInterface } from '../../../interface/interface';
import BasketCard from './BasketCard';
import { BasketDrawer } from './BasketDrawer';

const BasketList = ({ baskets }: { baskets: BasketInterface[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBasket, setSelectedBasket] = useState<BasketInterface | null>(
    null,
  );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {baskets.map((basket: BasketInterface) => (
        <div
          key={basket?.basketId}
          onClick={() => {
            setIsOpen(!isOpen);
            setSelectedBasket(basket);
          }}
        >
          <BasketCard basket={basket} />
        </div>
      ))}
      {isOpen && selectedBasket && (
        <BasketDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          basket={selectedBasket}
        />
      )}
    </div>
  );
};

export default BasketList;
