const StatCard3 = ({
  value,
  title,
  icon,
}: {
  value?: string | number;
  title?: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-grey8 rounded-lg shadow-xs dark:bg-gray-800 shadow-md w-full dark:bg-boxdark dark:text-white">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-slate-300  bg-opacity-75">
          {icon}
        </div>
        <div className="mx-3">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {value}
          </p>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard3;
