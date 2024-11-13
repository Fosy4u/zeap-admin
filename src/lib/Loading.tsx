import LoadingImg from '../images/logo/loading.gif';
import { smallScreen } from '../utils/screenSizes';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center  bg-opacity-50">
      <img src={LoadingImg} alt="Loading" width={smallScreen ? 60 : 70} />
    </div>
  );
};

export default Loading;
