import { PointInterface } from '../../../interface/interface';
import { numberWithCommas } from '../../../utils/helpers';

const UserPoints = ({ points }: { points: PointInterface }) => {
  return (
    <div className="flex flex-col gap-8  divide-y divide-slate-300">
      <div className="flex justify-between items-center">
        <span className="text-md ">Available Points</span>
        <span className="text-lg font-semibold text-success rounded rounded-full p-3 border bg-lightSuccess">
          {numberWithCommas(points?.availablePoints || 0)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Redeemed Points</span>
        <span className="text-md font-semibold text-danger">
          {numberWithCommas(points?.redeemedPoints || 0)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Total Points</span>
        <span className="text-md font-semibold">
          {numberWithCommas(points?.totalPoints || 0)}
        </span>
      </div>
    </div>
  );
};

export default UserPoints;
