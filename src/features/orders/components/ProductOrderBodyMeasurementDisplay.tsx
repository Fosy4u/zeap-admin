const ProductOrderBodyMeasurementDisplay = ({
  bodyMeasurements,
}: {
  bodyMeasurements: [
    {
      name: string;
      measurements: [
        {
          field: string;
          value: number;
          unit: string;
        },
      ];
    },
  ];
}) => {
  return (
    <div className="flex flex-col gap-2">
      {bodyMeasurements.map((measurement) => {
        return (
          <div
            key={measurement.name}
            className="flex flex-col shadow-md bg-white p-4 rounded-md dark:bg-boxdark"
          >
            <h3 className="text-darkGold">{measurement.name}</h3>
            <ul>
              {measurement.measurements.map((item) => {
                return (
                  <li key={item.field} className="mb-2">
                    <span className="flex justify-between">
                      <span>{item.field}</span>
                      <span>
                        {item.value} {item.unit}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ProductOrderBodyMeasurementDisplay;
