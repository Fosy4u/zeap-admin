import { useRef, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

const SimpleModal = ({
  children,
  onclick,
  actionText,
  isLoading,
  headerText,
  showActionButtons = true,
  open,
  close,
  closeOnOutsideClick = false,
}: {
  children: ReactNode;
  onclick?: () => void;
  actionText?: string;
  isLoading: boolean;
  headerText: string;
  showActionButtons?: boolean;
  open: boolean;
  closeOnOutsideClick?: boolean;
  close: () => void;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (closeOnOutsideClick) {
          close();
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef]);

  useEffect(() => {
    let html = document.querySelector('html');

    if (html) {
      if (open && html) {
        html.style.overflowY = 'hidden';

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const modal = document.querySelector('#modal'); // select the modal by it's id
        if (!modal) return;

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements);

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener('keydown', function (e) {
          if (e.keyCode === 27) {
            close();
          }

          let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              (lastFocusableElement as HTMLElement).focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              (firstFocusableElement as HTMLElement).focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });

        firstFocusableElement && (firstFocusableElement as HTMLElement).focus();
      } else {
        html.style.overflowY = 'visible';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      {open && typeof document !== 'undefined'
        ? ReactDOM.createPortal(
            <div
              className="fixed top-12 left-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-4a content-4a"
              aria-modal="true"
              tabIndex={-1}
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh]  flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header id="header-4a" className="flex items-center">
                  <h3 className="flex-1  text-lg font-medium text-darkGold">
                    {headerText}
                  </h3>
                  <button
                    onClick={() => close()}
                    className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide  text-danger transition duration-300 bg-slate-200 hover:bg-darkGold hover:text-emerald-600 focus:bg-baseGold focus:text-white focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                    aria-label="close dialog"
                  >
                    <span className="relative only:-mx-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-79 desc-79"
                      >
                        <title id="title-79">Icon title</title>
                        <desc id="desc-79">
                          A more detailed description of the icon
                        </desc>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </header>
                {/*        <!-- Modal body --> */}
                {children}
                {/*        <!-- Modal actions --> */}
                {showActionButtons && (
                  <div className="flex justify-center gap-2">
                    <button
                      disabled={isLoading}
                      onClick={onclick}
                      className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-baseGreen px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-darkGold focus:bg-darkGold focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                    >
                      <span>{actionText}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
};

export default SimpleModal;
