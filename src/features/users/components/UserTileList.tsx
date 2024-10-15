import { UserInterface } from "../../../interface/interface"
import UserTile from "./UserTile"



const UserTileList = ({users}: {
    users: UserInterface[] 
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {users.map((user) => {
            return (
                <div key={user._id}
                
                >
                    <UserTile user={user} />
                </div>
            )

        }
        )}
    </div>
  )
}

export default UserTileList