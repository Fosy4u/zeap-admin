import { ForwardIcon } from "../utils/icon"


interface StatCardProps {
    icon?:JSX.Element
    title?:string,
    subTitle?:string
    showDetail?:boolean,
    handleClick?: () => void,
    className?:string,
    titleClassName?:string,
    subTitleClassName?:string
}

const StatCard = ({
    icon,
    title,
    subTitle,
    showDetail,
    handleClick,
    className,
    titleClassName,
    subTitleClassName
} : StatCardProps
) => {
  return (
   

<div className={`grid grid-cols-4 p-6 bg-grey8  border border-gray-200 rounded-lg shadow dark:bg-slate-800 dark:text-white dark:border-gray-700 ${className}`}
onClick={handleClick}
>

<div >
{icon && icon}</div>
<div className="flex flex-col justify-center col-span-2 ml-2">
    <h5 className={`text-lg   ${titleClassName}`}>{title}</h5>
    <h6 className={`mt-2 text-md  ${subTitleClassName} `}>{subTitle}</h6>
</div>
{showDetail && <span className="flex justify-center align-center text-darkGold">
    <ForwardIcon />
    </span>}

</div>

  )
}

export default StatCard

