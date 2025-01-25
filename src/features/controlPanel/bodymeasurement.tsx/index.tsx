import { NavLink } from 'react-router-dom';

const BodyMeasurement = () => {
  return (
    <>
      <div className="flex justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          {' '}
          <h1 className="text-xl md:text-2xltext-dark">
            Body Measurement Guide
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center w-full md:items-center h-[30rem] md:h-screen">
        <NavLink
          to="/control-panel/body-measurement/male"
          className={`w-85 md:w-100 rounded-md shadow-md border p-4 px-2 md:px-4  hover:bg-lightGold dark:hover:bg-darkGold  transition duration-300`}
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <span className="text-xl font-bold text-darkGold dark:text-lightGold">
              Male
            </span>
          </div>
        </NavLink>
        <NavLink
          to="/control-panel/body-measurement/female"
          className={`w-85 md:w-100  rounded-md shadow-md border p-4 px-2 md:px-4 hover:bg-lightGold dark:hover:bg-darkGold transition duration-300`}
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <span className="text-xl font-bold text-darkGold dark:text-lightGold">
              Female
            </span>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default BodyMeasurement;
