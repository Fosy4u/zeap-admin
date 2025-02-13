import { HiDocumentAdd } from 'react-icons/hi';
import { useState } from 'react';
import { Alert, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
//import SimpleModal from '../../../lib/SimpleModal'

// import AddReadyMadeClothCarousel from './AddReadyMadeClothCarousel'

const cardClass =
  'flex flex-col bg-grey8 p-4 border border-white rounded-lg cursor-pointer hover:bg-slate-100 h-[112px]';

const AddNewProductOptions = ({ shopId }: { shopId: string }) => {
  const navigate = useNavigate();
  const [option, setOption] = useState<string>('');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex text-md font-semibold mt-6 mb-2">
        <HiDocumentAdd className="mr-2 h-5 w-5" />
        New Product
      </div>
      <span className="mb-4">Select the product type you want to add</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`${cardClass}`}
          onClick={() => {
            setOption('bespokeCloth');
            navigate(`/products/${shopId}/add-product/bespokeCloth/`);
          }}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.17736 9.03223C8.90312 12.6691 3.12493 17.3688 5.6574 20.563C7.05911 22.331 16.7295 22.6215 18.3615 20.563C20.8927 17.3705 15.1293 12.6763 18.8416 9.03223"
                    fill="#272B36"
                  />
                  <path
                    d="M5.17736 9.03223C8.90312 12.6691 3.12493 17.3688 5.6574 20.563C7.05911 22.331 16.7295 22.6215 18.3615 20.563C20.8927 17.3705 15.1293 12.6763 18.8416 9.03223"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.35531 13C4.08976 12.791 2.24317 11.3282 2.01008 9.23853C1.97692 8.9413 2.02708 8.64273 2.13808 8.36431C2.85289 6.57132 4.85232 3.53054 7.91642 2.04751C8.12532 1.9464 8.37469 2.01201 8.51635 2.19362C9.27591 3.1674 10.5845 4.6846 12 4.6846C13.4155 4.6846 14.7241 3.1674 15.4836 2.19362C15.6253 2.01201 15.8747 1.9464 16.0836 2.04751C19.1477 3.53054 21.1471 6.57132 21.8619 8.36431C21.9729 8.64273 22.0231 8.9413 21.9899 9.23853C21.7568 11.3282 19.9297 12.7881 17.6641 12.9972"
                    fill="#272B36"
                  />
                  <path
                    d="M6.35531 13C4.08976 12.791 2.24317 11.3282 2.01008 9.23853C1.97692 8.9413 2.02708 8.64273 2.13808 8.36431C2.85289 6.57132 4.85232 3.53054 7.91642 2.04751C8.12532 1.9464 8.37469 2.01201 8.51635 2.19362C9.27591 3.1674 10.5845 4.6846 12 4.6846C13.4155 4.6846 14.7241 3.1674 15.4836 2.19362C15.6253 2.01201 15.8747 1.9464 16.0836 2.04751C19.1477 3.53054 21.1471 6.57132 21.8619 8.36431C21.9729 8.64273 22.0231 8.9413 21.9899 9.23853C21.7568 11.3282 19.9297 12.7881 17.6641 12.9972"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm">Bespoke Clothes</span>
              <span className="text-[10px] md:text-[12px] text-danger">
                seller must be a tailor
              </span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {' '}
              Add
            </Button>
          </div>
        </div>
        <div
          className={`${cardClass}`}
          onClick={() => {
            setOption('ReadyMadeFootwears');
            navigate(`/products/${shopId}/add-product/bespokeShoe/`);
          }}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1012 18H7.96299C5.02913 18 3.56221 18 2.66807 16.8828C0.97093 14.7623 2.9047 9.1238 4.07611 7C4.47324 9.4 8.56152 9.33333 10.0507 9C9.05852 7.00119 10.3831 6.33413 11.0453 6.00059L11.0465 6C14 9.5 20.3149 11.404 21.8624 15.2188C22.5309 16.8667 20.6262 18 19.1012 18Z"
                    fill="#272B36"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 14C6.16467 15.4294 8.73097 15.8442 12.0217 14.8039C13.0188 14.4887 13.5174 14.3311 13.8281 14.3525C14.1389 14.3739 14.7729 14.6695 16.0408 15.2608C17.6243 15.9992 19.7971 16.4243 22 15.3583"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.5 9.5L15 8"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.5 11L17 9.5"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm">Bespoke Footwears</span>
              <span className="text-[10px] md:text-[12px] text-danger">
                seller must be a shoemaker
              </span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {' '}
              Add
            </Button>
          </div>
        </div>
        <div
          className={`${cardClass}`}
          onClick={() => {
            setOption('ReadyMadeFootwears');
            navigate(`/products/${shopId}/add-product/readyMadeShoe/`);
          }}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1012 18H7.96299C5.02913 18 3.56221 18 2.66807 16.8828C0.97093 14.7623 2.9047 9.1238 4.07611 7C4.47324 9.4 8.56152 9.33333 10.0507 9C9.05852 7.00119 10.3831 6.33413 11.0453 6.00059L11.0465 6C14 9.5 20.3149 11.404 21.8624 15.2188C22.5309 16.8667 20.6262 18 19.1012 18Z"
                    fill="#272B36"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 14C6.16467 15.4294 8.73097 15.8442 12.0217 14.8039C13.0188 14.4887 13.5174 14.3311 13.8281 14.3525C14.1389 14.3739 14.7729 14.6695 16.0408 15.2608C17.6243 15.9992 19.7971 16.4243 22 15.3583"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.5 9.5L15 8"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.5 11L17 9.5"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm">Ready-Made Footwears</span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {' '}
              Add
            </Button>
          </div>
        </div>
        <div
          className={`${cardClass}`}
          onClick={() => {
            setOption('ReadyMadeClothes');
            navigate(`/products/${shopId}/add-product/readyMadeCloth/`);
          }}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.17736 9.03223C8.90312 12.6691 3.12493 17.3688 5.6574 20.563C7.05911 22.331 16.7295 22.6215 18.3615 20.563C20.8927 17.3705 15.1293 12.6763 18.8416 9.03223"
                    fill="#272B36"
                  />
                  <path
                    d="M5.17736 9.03223C8.90312 12.6691 3.12493 17.3688 5.6574 20.563C7.05911 22.331 16.7295 22.6215 18.3615 20.563C20.8927 17.3705 15.1293 12.6763 18.8416 9.03223"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.35531 13C4.08976 12.791 2.24317 11.3282 2.01008 9.23853C1.97692 8.9413 2.02708 8.64273 2.13808 8.36431C2.85289 6.57132 4.85232 3.53054 7.91642 2.04751C8.12532 1.9464 8.37469 2.01201 8.51635 2.19362C9.27591 3.1674 10.5845 4.6846 12 4.6846C13.4155 4.6846 14.7241 3.1674 15.4836 2.19362C15.6253 2.01201 15.8747 1.9464 16.0836 2.04751C19.1477 3.53054 21.1471 6.57132 21.8619 8.36431C21.9729 8.64273 22.0231 8.9413 21.9899 9.23853C21.7568 11.3282 19.9297 12.7881 17.6641 12.9972"
                    fill="#272B36"
                  />
                  <path
                    d="M6.35531 13C4.08976 12.791 2.24317 11.3282 2.01008 9.23853C1.97692 8.9413 2.02708 8.64273 2.13808 8.36431C2.85289 6.57132 4.85232 3.53054 7.91642 2.04751C8.12532 1.9464 8.37469 2.01201 8.51635 2.19362C9.27591 3.1674 10.5845 4.6846 12 4.6846C13.4155 4.6846 14.7241 3.1674 15.4836 2.19362C15.6253 2.01201 15.8747 1.9464 16.0836 2.04751C19.1477 3.53054 21.1471 6.57132 21.8619 8.36431C21.9729 8.64273 22.0231 8.9413 21.9899 9.23853C21.7568 11.3282 19.9297 12.7881 17.6641 12.9972"
                    stroke="#272B36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm">Ready-Made Clothes</span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {' '}
              Add
            </Button>
          </div>
        </div>
        {/* <div className={`${cardClass}`}
    onClick={()=>{setOption('Bags')}}
    >
      <div 
      className='bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center'
      ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.1737 12.9256V12.12C19.1737 10.6492 19.1737 9.91383 18.7234 9.45691C18.2732 9 17.5485 9 16.0992 9H7.90077C6.45147 9 5.72682 9 5.27658 9.45691C4.82634 9.91383 4.82634 10.6492 4.82634 12.12V12.9256C4.82634 13.3018 4.82634 13.4899 4.79345 13.6739C4.76056 13.858 4.69549 14.0341 4.56534 14.3863L4.34812 14.9742C3.16867 18.166 2.57895 19.7619 3.34312 20.8809C4.1073 22 5.78684 22 9.14591 22H14.8541C18.2132 22 19.8927 22 20.6569 20.8809C21.4211 19.7619 20.8313 18.166 19.6519 14.9742L19.4347 14.3863C19.3045 14.0341 19.2394 13.858 19.2065 13.6739C19.1737 13.4899 19.1737 13.3018 19.1737 12.9256Z" fill="#272B36" stroke="#272B36" stroke-width="1.5" stroke-linecap="round"/>
<path d="M16 11C16 5 13.8655 2 12 2C10.1345 2 8 5 8 11" stroke="#272B36" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 16C13.2504 16 14.944 18.6278 13.3547 18.8954C12.5228 19.0354 11.4711 19.0344 10.6453 18.8954C9.05599 18.6278 10.7496 16 12 16Z" fill="#F8F9FE" stroke="#272B36" stroke-width="1.5" stroke-linecap="round"/>
<path d="M13.9399 17.0049C15.2104 16.8729 17.4476 16.1267 19.055 14.9424" stroke="#272B36" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.1146 17.0312C8.84407 16.8992 6.60689 16.1531 4.99951 14.9688" stroke="#272B36" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
      <span className='text-sm'>Bags</span>
    </div> */}
        <div
          className={`${cardClass}`}
          onClick={() => {
            setOption('Accessories');
            navigate(`/products/${shopId}/add-product/accessory/`);
          }}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z"
                    fill="#272B36"
                    stroke="#272B36"
                    stroke-width="1.5"
                  />
                  <path
                    d="M16 6L15.7276 4.91043C15.3931 3.5724 15.2258 2.90339 14.7499 2.49004C14.6973 2.44433 14.6423 2.40141 14.5852 2.36145C14.0688 2 13.3792 2 12 2C10.6208 2 9.93119 2 9.41476 2.36145C9.35765 2.40141 9.30268 2.44433 9.25006 2.49004C8.77415 2.90339 8.6069 3.5724 8.27239 4.91043L8 6"
                    fill="#272B36"
                  />
                  <path
                    d="M16 6L15.7276 4.91043C15.3931 3.5724 15.2258 2.90339 14.7499 2.49004C14.6973 2.44433 14.6423 2.40141 14.5852 2.36145C14.0688 2 13.3792 2 12 2C10.6208 2 9.93119 2 9.41476 2.36145C9.35765 2.40141 9.30268 2.44433 9.25006 2.49004C8.77415 2.90339 8.6069 3.5724 8.27239 4.91043L8 6"
                    stroke="#272B36"
                    stroke-width="1.5"
                  />
                  <path
                    d="M8 18L8.27239 19.0896C8.6069 20.4276 8.77415 21.0966 9.25006 21.51C9.30268 21.5557 9.35765 21.5986 9.41476 21.6386C9.93119 22 10.6208 22 12 22C13.3792 22 14.0688 22 14.5852 21.6386C14.6423 21.5986 14.6973 21.5557 14.7499 21.51C15.2258 21.0966 15.3931 20.4276 15.7276 19.0896L16 18"
                    fill="#272B36"
                  />
                  <path
                    d="M8 18L8.27239 19.0896C8.6069 20.4276 8.77415 21.0966 9.25006 21.51C9.30268 21.5557 9.35765 21.5986 9.41476 21.6386C9.93119 22 10.6208 22 12 22C13.3792 22 14.0688 22 14.5852 21.6386C14.6423 21.5986 14.6973 21.5557 14.7499 21.51C15.2258 21.0966 15.3931 20.4276 15.7276 19.0896L16 18"
                    stroke="#272B36"
                    stroke-width="1.5"
                  />
                  <path
                    d="M12 10V12.005L13 13"
                    stroke="#F8F9FE"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm">Accessories</span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {' '}
              Add
            </Button>
          </div>
        </div>
        {/* {option === 'ReadyMadeClothes' && (<SimpleModal 
            isLoading={false}
            closeOnOutsideClick={false}
            open = {open}
            showActionButtons={false}
            headerText={"hello"} close={() => setOpen(false)}   onclick={() => {}}>

                <AddReadyMadeClothStepper />
               
            </SimpleModal>)} */}

        {option === 'BespokeClothes' && (
          <Alert color="info">This page is still uder development </Alert>
        )}
        {option === 'BespokeFootwears' && (
          <Alert color="info">This page is still uder development </Alert>
        )}
        {option === 'ReadyMadeFootwears' && (
          <Alert color="info">This page is still uder development </Alert>
        )}
        {option === 'Bags' && (
          <Alert color="info">This page is still uder development </Alert>
        )}
        {option === 'Accessories' && (
          <Alert color="info">This page is still uder development </Alert>
        )}
      </div>
    </div>
  );
};

export default AddNewProductOptions;
