import { useNavigate } from 'react-router-dom';

export default function UserDisplaySwitcher({ view }: { view: string }) {
  const navigate = useNavigate();

  return (
    <>
      {/*<!-- Component: Base sized primary button group with leading icon and badge --> */}
      <div className="inline-flex divide-x divide-emerald-100 overflow-hidden rounded">
        <button
          onClick={() => navigate('/users')}
          disabled={view === 'tile'}
          className={`inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap ${view === 'tile' ? 'bg-success' : 'bg-darkGold'} px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-success focus:bg-success focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-success  disabled:shadow-none`}
        >
          <span className="hidden md:inline-flex order-1">Tile</span>
          <span className="relative only:-mx-5">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
              />
            </svg>
          </span>
        </button>
        <button
          onClick={() => navigate('/users/table')}
          disabled={view === 'table'}
          className={`inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap ${view !== 'tile' ? 'bg-success' : 'bg-darkGold'} px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-success focus:bg-success focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-success  disabled:shadow-none`}
        >
          <span className="order-2 md:inline-flex">Table</span>
          <span className="relative only:-mx-5">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M3 11h18M3 15h18m-9-4v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
          </span>
        </button>
      </div>
      {/*<!-- End Base sized primary button group with leading icon and badge --> */}
    </>
  );
}
