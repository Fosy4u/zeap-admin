
"use client";
import _ from 'lodash'
import { Alert, Button,  Dropdown, Label, Modal, TextInput,Checkbox, } from "flowbite-react";
import { useEffect, useState } from "react";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../redux/services/global.slice";
import Loading from "../../../lib/Loading";
import { ShopInterface, SocialInterface, UserInterface } from "../../../interface/interface";
import { HiChevronDown, HiInformationCircle } from "react-icons/hi";
import CountrySelector from "../../../lib/CountrySelector";


const inputTheme = {
   
  "field": { 
    "input": {
      "colors": {
        "primary": "border-darkGold  text-dark placeholder-darkGold focus:border-darkGold focus:ring-darkGold dark:bg-darkGold dark:border-darkGold dark:focus:border-darkGold dark:focus:ring-darkGold",
      },
      
    }
  }
}
const checkBoxTheme = {
    "root": {
      "base": "h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700",
      "color": {
      
        "primary": "text-darkGold focus:ring-darkGold dark:ring-offset-darkGold dark:focus:ring-darkGold border-darkGold",
      }
    }
  }



export function AddShop({openModal, setOpenModal, mode ="create", shop}:
{
    openModal: boolean,
    setOpenModal: (open: boolean) => void,
    mode?: "create" | "edit",
    shop?: ShopInterface
}
) {
    const token = useSelector(globalSelectors.selectAuthToken);
    const usersQuery = zeapApiSlice.useGetUsersQuery({},  { skip: !token });
    const users = usersQuery?.data?.data;
const [userId, setUserId] = useState<string>('');
const [shopName, setShopName] = useState<string>('')
const [email, setEmail] = useState<string>('')
const[isTailor, setIsTailor] = useState<boolean>(false)
const[isShoeMaker, setIsShoeMaker] = useState<boolean>(false)
const [isMakeUpArtist, setIsMakeUpArtist] = useState<boolean>(false)
const [social, setSocial] = useState<SocialInterface>({});
const [phoneNumber, setPhoneNumber] = useState<string>('');
const [address, setAddress] = useState<string>('');
const [region, setRegion] = useState<string>("Lagos~LA");
const [country, setCountry] = useState<string>("Nigeria");
const [error, setError] = useState<string>('')
const [createShop, createShopStatus] = zeapApiSlice.useCreateShopMutation()
const [editShop, editShopStatus] = zeapApiSlice.useUpdateShopMutation()
const isLoading = createShopStatus.isLoading || usersQuery.isLoading || editShopStatus.isLoading


useEffect(() => {
    if(shop) {
        setUserId(shop?.userId)
        setShopName(shop?.shopName)
        setEmail(shop?.email || '')
        setPhoneNumber(shop?.phoneNumber)
        setAddress(shop?.address)
        setRegion(shop?.region)
        setCountry(shop?.country)
        setSocial(shop?.social || {});
        setIsTailor(shop?.isTailor || false)
        setIsShoeMaker(shop?.isShoeMaker || false)
        setIsMakeUpArtist(shop?.isMakeUpArtist || false)
    }
}
, [shop])
  

  function onCloseModal() {
    setOpenModal(false);
   
  }
  const getFirstAndLAstname= (user:UserInterface) => {
    return `${user.firstName} ${user.lastName}`
  }

  
const handleSave = async () => {
    setError('')
    if(!userId) {
        setError("Please select a shop owner")
        return
    }
    if(!shopName) {
        setError("Please enter a shop name")
        return
    }
    let payload
    if(mode === "create"){
    
     payload = {
        userId,
        shopName,
        email,
        phoneNumber,
        address,
        region,
        country,
        social,
        isTailor,
        isShoeMaker,
        isMakeUpArtist

    }
    createShop({payload}).unwrap().then(() => {
      
        setUserId('')
        setShopName('')

         setOpenModal(false)
    }).catch((err) => {
     
        setError(err?.data?.error)
    }
    )
}
else {
    payload = {
        ...(address  !== shop?.address && {address}),
        ...(phoneNumber  !== shop?.phoneNumber && {phoneNumber}),
        ...(email  !== shop?.email && {email}),
        ...(region  !== shop?.region && {region}),
        ...(country  !== shop?.country && {country}),
        ...(_.isEqual(social, shop?.social) ? {} : {social : JSON.stringify(social)}),
        ...(isTailor  !== shop?.isTailor && {isTailor}),
        ...(isShoeMaker  !== shop?.isShoeMaker && {isShoeMaker}),
        ...(isMakeUpArtist  !== shop?.isMakeUpArtist && {isMakeUpArtist}),
        shopId: shop?.shopId,
        ...(shopName  !== shop?.shopName && {shopName})


    }
    editShop({payload}).unwrap().then(() => {

         setOpenModal(false)
    }).catch((err) => {
     
        setError(err?.data?.error)
    }
    )
}
       
    
}
  return (
    <>
    
      <Modal     theme={{
      content: {
        base: 'bg-darkGold w-3/4'
      }
    }}
 show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
            {isLoading && <Loading />}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {mode === "create" ? "Add Shop" : "Edit Shop"}
            </h3>
            <div>
            {error && <Alert color="failure"icon={HiInformationCircle} className="my-4">{error}</Alert>}
            {mode === "create" && 
              <div className="mb-2 block">
                
              
            
             <Dropdown
             
           renderTrigger={() =>   <Button outline color="primary" size="sm" >
                    

             {userId ? `${getFirstAndLAstname(users?.find((user:UserInterface) => user.userId === userId)) }` : "Select shop owner"}
             <HiChevronDown className="ml-2 h-5 w-5" />
             
             </Button>
             
            }

            
             color={!userId ? "primary" : "success"}
              >
               
             
                  {users?.map((user:UserInterface) => (
                    <Dropdown.Item className="text-black"
                      key={user.userId}
                      onClick={() => setUserId(user.userId)}
                    >
                      {user.firstName} {user.lastName}
                    </Dropdown.Item>
                  ))}
               
             </Dropdown>
             </div>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Shop Name" />
              </div>
              <TextInput
                theme={inputTheme}
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                type="text" required shadow
                color="primary"
                />
                
            </div>
            <div className="mb-2 flex items-center gap-2">
            <Checkbox
            theme={checkBoxTheme}
            color={isTailor?"success":"primary"}
                    checked={isTailor}
                    onChange={(e) => setIsTailor(e.target.checked)}
                   
                
                />
                <Label value="Is Tailor?" />

              </div>
                <div className="mb-2 flex items-center gap-2">
            <Checkbox
                    checked={isShoeMaker}
                    onChange={(e) => setIsShoeMaker(e.target.checked)}
                   
                    theme={checkBoxTheme}
            color={isShoeMaker?"success":"primary"}
                />
                <Label value="Is Shoe Maker?" />
                </div>
                <div className="mb-2 flex items-center gap-2">
            <Checkbox
                    checked={isMakeUpArtist}
                    onChange={(e) => setIsMakeUpArtist(e.target.checked)}
                   
                    theme={checkBoxTheme}
            color={isMakeUpArtist?"success":"primary"}
                />
                <Label value="Is Make Up Artist?" />
                </div>
               
                
            <div>
              <div className="mb-2 block">
                <Label value="Email" />
              </div>
              <TextInput
                theme={inputTheme}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" required shadow
                color="primary"
                />
                </div>
            <div>
                <div className="mb-2 block">
                    <Label value="Phone Number" />
                </div>
                <TextInput
                    theme={inputTheme}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="text" required shadow
                    color="primary"
                    />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label value="Address" />
                </div>
                <TextInput
                    theme={inputTheme}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text" required shadow
                    color="primary"
                    />
            </div>
            <CountrySelector
                  country={country}
                  setCountry={setCountry}
                  region={region}
                  setRegion={setRegion}
                />
                 <div>
                <div className="mb-2 block">
                    <Label value="Website" />
                </div>
                <TextInput
                    theme={inputTheme}
                    value={social?.website}
                    onChange={(e) => setSocial({...social, website: e.target.value})}
                    type="text" required shadow
                    color="primary"
                    />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label value="Facebook" />
                </div>
                <TextInput
                    theme={inputTheme}
                    value={social?.facebook}
                    onChange={(e) => setSocial({...social, facebook: e.target.value})}
                    type="text" required shadow
                    color="primary"
                    />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label value="Instagram" />
                </div>
                <TextInput
                    theme={inputTheme}
                    value={social?.instagram}
                    onChange={(e) => setSocial({...social, instagram: e.target.value})}
                    type="text" required shadow
                    color="primary"
                    />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label value="Twitter" />
                </div>
                <TextInput
                    theme={inputTheme}
                    value={social?.twitter}
                    onChange={(e) => setSocial({...social, twitter: e.target.value})}
                    type="text" required shadow
                    color="primary"
                    />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label value="Linkedin" />
                </div>
                <TextInput
                    theme={inputTheme}
                    value={social?.linkedin}
                    onChange={(e) => setSocial({...social, linkedin: e.target.value})}
                    type="text" required shadow
                    color="primary"
                    />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label value="Youtube" />
                </div>
                <TextInput
                    theme={inputTheme}
                    value={social?.youtube}
                    onChange={(e) => setSocial({...social, youtube: e.target.value})}
                    type="text" required shadow
                    color="primary"
                    />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label value="tikTok" />
                </div>
                <TextInput
                    theme={inputTheme}
                    value={social?.tikTok}
                    onChange={(e) => setSocial({...social, tikTok: e.target.value})}
                    type="text" required shadow
                    color="primary"
                    />
                    </div>
            
           
            <div className="w-full">
              <Button 
                onClick={handleSave}
              color="primary" className="text-white">
                Save
              </Button>
            </div>
            
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
