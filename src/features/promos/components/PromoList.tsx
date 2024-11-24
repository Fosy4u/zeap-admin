import { Accordion, Alert, Tabs, TabsRef } from 'flowbite-react';
import { PromoInterface } from '../../../interface/interface';
import {
  FaBolt,
  FaDatabase,
  FaExchangeAlt,
  FaCheckDouble,
} from 'react-icons/fa';
import PromoCard from './PromoCard';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const tabTheme = {
  base: 'flex flex-col gap-2 ',
  tablist: {
    base: 'flex text-center',
    variant: {
      fullWidth:
        'grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400',
    },
    tabitem: {
      base: 'flex overflow-auto    items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500',
      variant: {
        fullWidth: {
          base: ' ml-0 flex w-full rounded-md first:ml-0 text-[12px] md:text-sm',
          active: {
            on: 'active rounded-md bg-success p-4 text-white ',
            off: 'rounded-none bg-white hover:bg-gray-50 hover:text-slate-500 dark:bg-gray-800 dark:hover:text-grey2  ',
          },
        },
      },
      icon: 'mr-2 h-3 w-3 md:h-5 md:w-5',
    },
  },
  tabitemcontainer: {
    base: '',
    variant: {
      default: '',
      underline: '',
      pills: '',
      fullWidth: '',
    },
  },
  tabpanel: 'py-3',
};

const PromoList = ({ promos }: { promos: PromoInterface[] }) => {
  const tabsRef = useRef<TabsRef>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const livePromos = promos.filter((promo) => promo.status === 'live');
  const draftPromos = promos.filter((promo) => promo.status === 'draft');
  const scheduledPromos = promos.filter(
    (promo) => promo.status === 'scheduled',
  );
  const finishedPromos = promos.filter((promo) => promo.status === 'finished');
  useEffect(() => {
    tabsRef.current?.setActiveTab(Number(searchParams.get('activeTab')));
  }, [searchParams]);
  return (
    <div>
      <Tabs
        ref={tabsRef}
        theme={tabTheme}
        variant="fullWidth"
        onActiveTabChange={(tab) => {
          setSearchParams({ activeTab: tab.toLocaleString() });
        }}
      >
        <Tabs.Item active title="Live" icon={FaBolt}>
          <div className="flex flex-col">
            {livePromos?.length === 0 && (
              <Alert color="success">No live promos found</Alert>
            )}
            {livePromos?.map((promo: PromoInterface) => (
              <Accordion key={promo.promoId} collapseAll className="my-2">
                <Accordion.Panel>
                  <Accordion.Title>
                    {' '}
                    {promo?.title} / {promo.promoId}
                  </Accordion.Title>
                  <Accordion.Content>
                    <PromoCard promo={promo} />
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Draft" icon={FaDatabase}>
          <div className="flex flex-col">
            {draftPromos?.length === 0 && (
              <Alert color="info">No draft promos found</Alert>
            )}
            {draftPromos?.map((promo: PromoInterface) => (
              <Accordion key={promo.promoId} collapseAll className="my-2">
                <Accordion.Panel>
                  <Accordion.Title>
                    {promo?.title} / {promo.promoId}
                  </Accordion.Title>
                  <Accordion.Content>
                    <PromoCard promo={promo} />
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Scheduled" icon={FaExchangeAlt}>
          <div className="flex flex-col">
            {scheduledPromos?.length === 0 && (
              <Alert color="warning">No scheduled promos found</Alert>
            )}
            {scheduledPromos?.map((promo: PromoInterface) => (
              <Accordion key={promo.promoId} collapseAll className="my-2">
                <Accordion.Panel>
                  <Accordion.Title>
                    {' '}
                    {promo?.title} / {promo.promoId}
                  </Accordion.Title>
                  <Accordion.Content>
                    <PromoCard promo={promo} />
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Expired" icon={FaCheckDouble}>
          <div className="flex flex-col">
            {finishedPromos?.length === 0 && (
              <Alert color="failure">No expired promos found</Alert>
            )}
            {finishedPromos?.map((promo: PromoInterface) => (
              <Accordion key={promo.promoId} collapseAll className="my-2">
                <Accordion.Panel>
                  <Accordion.Title>
                    {' '}
                    {promo?.title} / {promo.promoId}
                  </Accordion.Title>
                  <Accordion.Content>
                    <PromoCard promo={promo} />
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            ))}
          </div>
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default PromoList;
