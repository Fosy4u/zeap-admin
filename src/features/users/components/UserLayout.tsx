import { useState } from "react"
import { UserInterface } from "../../../interface/interface"
import UserDetailNav from "./UserDetailNav"
import UserProfilePaper from "./UserProfilePaper"
 import UserTile from "./UserTile"
import UserProfileOverview from "./UserProfileOverview"
import UserInfo from "./UserInfo"
import Banner from "../../../lib/Banner"
import UserActions from "./UserActions"
import SignInInfo from "./SignInInfo"
import UserComment from "./UserComment"


const UserLayout = ({users, user}:{
    users: UserInterface[],
    user: UserInterface
}) => {

    const [value, setValue] = useState("Overview");
  return (
    <div className="grid grid-cols-6 gap-4 md:divide-x h-screen">
        <UserActions user={user}/>
        <div className="hidden md:flex flex-col col-span-2  ">
            <span className="border p-1 border-success border-2">
            <UserTile user={user} />
            </span>
        {users.filter(person => person?.userId !== user?.userId).map((user) => {
                    return (
                        <div key={user._id}
                        
                        >
                            <UserTile user={user} />
                        </div>
                    )

                }
                )}
        </div>
        <div className="col-span-6 md:col-span-4 ">
            <div className="flex justify-center w-full">
                <UserProfilePaper user={user}/>
            </div>
            <div className="p-2 flex justify-center mt-2 mb-3">
                <UserDetailNav setValue={setValue} value={value}/>
            </div>
            
            <div className="md:p-2">
                {value === "Bio" && <div className="flex flex-col gap-4 flex  md:hidden w-full">
                    
                    <UserInfo user={user}/>
                    <SignInInfo user={user}/>
                 
                </div>}
                {value === "Overview" && 
                <div
                className="flex  gap-4 w-full justify-center"
                >
                    <span className="hidden md:flex flex-col w-full h-fit">
                    <UserInfo user={user}/>
                    <SignInInfo user={user}/>
                    </span>
                    <span className="w-full">
                     <UserProfileOverview setValue={setValue}/></span>
                     </div>
                }
                {value === "Orders" && <div>
                    <Banner title="Orders"
                    variant="info"
                    message = "This feature is under development. Please check back later."


                     />
                    </div>}

                    {value === "Comments" && <div>
                        <UserComment userId = {user.userId}/>
                    </div>}
            </div>

        </div>
    </div>
  )
}

export default UserLayout