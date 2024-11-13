import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';

const ShopReport = () => {
  return (
    <div className="flex flex-wrap gap-2 justify-center w-full">
      <Button
        size="sm"
        color="primary"
        className="w-full text-white hover:text-black"
      >
        Generate Report
        <HiOutlineArrowRight className="mr-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default ShopReport;
