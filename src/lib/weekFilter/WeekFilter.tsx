import { Datepicker } from 'flowbite-react';

const WeekFilter = ({
  value,
  minDate,
  maxDate,
  setValue,
  placeholder,
  title,
  close,
}: {
  value: Date;
  minDate?: Date;
  maxDate?: Date;
  setValue: (date: Date) => void;
  placeholder?: string;
  title?: string;
  close?: () => void;
}) => {
  const customTheme = {
    root: {
      base: 'relative',
    },
    popup: {
      root: {
        base: 'absolute top-10 z-50 block pt-2',
        inline: 'relative top-0 z-auto',
        inner:
          'inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700',
      },
      header: {
        base: '',
        title:
          'px-2 py-3 text-center font-semibold text-gray-900 dark:text-white',
        selectors: {
          base: 'mb-2 flex justify-between',
          button: {
            base: 'rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
            prev: 'text-darkGold',
            next: 'text-darkGold hover:bg-gold',
            view: '',
          },
        },
      },
      view: {
        base: 'p-1',
      },
      footer: {
        base: 'mt-2 flex space-x-2',
        button: {
          base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300',
          today: 'bg-cyan-700 text-white bg-darkGold hover:bg-gold',
          clear:
            'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
        },
      },
    },
    views: {
      days: {
        header: {
          base: 'mb-1 grid grid-cols-7',
          title:
            'h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400',
        },
        items: {
          base: 'grid w-64 grid-cols-7',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
            selected: 'bg-success text-white hover:bg-cyan-600',
            disabled: 'text-gray-500',
          },
        },
      },
      months: {
        items: {
          base: 'grid w-64 grid-cols-4',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
            selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
            disabled: 'text-gray-500',
          },
        },
      },
      years: {
        items: {
          base: 'grid w-64 grid-cols-4',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
            selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
            disabled: 'text-gray-500',
          },
        },
      },
      decades: {
        items: {
          base: 'grid w-64 grid-cols-4',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
            selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
            disabled: 'text-gray-500',
          },
        },
      },
    },
  };
  return (
    <Datepicker
      theme={customTheme}
      placeholder={placeholder}
      title={title}
      value={value}
      minDate={minDate}
      onChange={(date) => {
        setValue(date as Date);
        close && close();
      }}
      maxDate={maxDate}
      inline
      weekStart={1}
    />
  );
};

export default WeekFilter;
