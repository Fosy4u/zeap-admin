import { BasketInterface } from '../../../interface/interface';
import BasketCard from './BasketCard';

const BasketList = ({ baskets }: { baskets: BasketInterface[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {baskets.map((basket: BasketInterface) => (
        <div key={basket?.basketId}>
          <BasketCard basket={basket} />
        </div>
      ))}
    </div>
  );
};

export default BasketList;
