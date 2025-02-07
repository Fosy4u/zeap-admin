import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const PageNav = () => {
  const navigate = useNavigate();
  return (
    <div className="flex  gap-2">
      <div
        className="bg-lightDanger p-2 rounded-full cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        <HiArrowLongLeft className="text-danger" />
      </div>
      <div
        onClick={() => {
          navigate(1);
        }}
        className="bg-lightSuccess p-2 rounded-full cursor-pointer"
      >
        <HiArrowLongRight className="text-success" />
      </div>
    </div>
  );
};

export default PageNav;
