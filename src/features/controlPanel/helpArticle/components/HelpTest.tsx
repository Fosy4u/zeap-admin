import { TabItem, Tabs } from 'flowbite-react';
import { BsFillBasket2Fill } from 'react-icons/bs';
import { MdPayments } from 'react-icons/md';
import { FaShippingFast } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { GiReturnArrow } from 'react-icons/gi';
import { FaList } from 'react-icons/fa';
import { FaRegStarHalfStroke } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';
import { MdPrivacyTip } from 'react-icons/md';
import { MdOutlineSupportAgent } from 'react-icons/md';

const helpCenterCategoryOptions = [
  {
    label: 'Buying',
    value: 'customer',
  },
  {
    label: 'Selling',
    value: 'vendor',
  },
  {
    label: 'My Account',
    value: 'account',
  },
];

const helpCenterSubCategoryOptions = [
  {
    label: 'Before Ordering',
    value: 'beforeOrdering',
    categories: ['customer'],
    icon: <BsFillBasket2Fill className="size-5" />,
  },
  {
    label: 'Checkout and Payment',
    value: 'checkoutAndPayment',
    categories: ['customer'],
    icon: <MdPayments className="size-5" />,
  },
  {
    label: 'Delivery and Shipping',
    value: 'deliveryAndShipping',
    categories: ['customer', 'vendor'],
    icon: <FaShippingFast className="size-5" />,
  },
  {
    label: 'Cancellations, Returns and Refunds',
    value: 'returnsAndRefunds',
    categories: ['customer'],
    icon: <GiReturnArrow className="size-5" />,
  },
  {
    label: 'Authentication & Quality Control',
    value: 'authentication',
    categories: ['customer', 'vendor'],
    icon: <RiLockPasswordFill className="size-5" />,
  },
  {
    label: 'My Listings',
    value: 'myListings',
    categories: ['vendor'],
    icon: <FaList className="size-5" />,
  },
  {
    label: 'Checkout/ Payment / Fees',
    value: 'payments',
    categories: ['vendor', 'customer', 'account'],
    icon: <MdPayments className="size-5" />,
  },
  {
    label: 'Seller Ratings & Badges',
    value: 'ratings',
    categories: ['vendor'],
    icon: <FaRegStarHalfStroke className="size-5" />,
  },
  {
    label: 'Login and Security',
    value: 'loginAndSecurity',
    categories: ['account'],
    icon: <RiLockPasswordFill className="size-5" />,
  },
  {
    label: 'Alerts & Notifications',
    value: 'notifications',
    categories: ['account'],
    icon: <FaBell className="size-5" />,
  },
  {
    label: 'Security & Privacy',
    value: 'privacy',
    categories: ['account'],
    icon: <MdPrivacyTip className="size-5" />,
  },
  {
    label: 'Account Support',
    value: 'support',
    categories: ['account'],
    icon: <MdOutlineSupportAgent className="size-5" />,
  },
];

const HelpCenter = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Tabs
          aria-label="Help Center Categories"
          className="bg-white dark:bg-boxdark rounded-lg shadow"
          variant="fullWidth"
        >
          {helpCenterCategoryOptions.map((category) => (
            <TabItem key={category.value} title={category.label}>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Subcategories</h2>
                <ul className="space-y-2">
                  {helpCenterSubCategoryOptions
                    .filter((sub) => sub.categories.includes(category.value))
                    .map((sub) => (
                      <li key={sub.value} className="flex items-center gap-2">
                        {sub.icon}
                        <span>{sub.label}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </TabItem>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default HelpCenter;
