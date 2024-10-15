

export default function Banner({variant, title, message, className}: {
    variant : string;
    title? : string;
    message : string;
    className?: string;
}) {

    const getVariantColor = () => {
        switch (variant) {
            case "error":
                return "bg-danger border-red-100 text-white ";
            case "warning":
                return "bg-warning border-yellow-100 text-yellow-500";
            case "success":
                return "bg-success border-green-100 text-green-500";
                case "info":
                return "bg-info border-blue-100 text-white";
            default:
                return "bg-blue-50 border-blue-100 text-blue-500";
        }
    }
  return (
    <>
      {/*<!-- Component: Danger Alert With Title and Text--> */}
      <div
        className={`w-full px-4 py-3 text-sm  border rounded ${getVariantColor()}${className} `}
        role="alert"
      >
        <h3 className="mb-2 font-semibold">{title}</h3>
        <p className="text-white">
         {message}
        </p>
      </div>
      {/*<!-- End Danger Alert With Title and Text--> */}
    </>
  )
}
