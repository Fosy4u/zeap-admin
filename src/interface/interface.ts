
interface RouteInterface {
    path : string;
    component : any;
    isDefault? : boolean;

}
interface DocumentWithFullscreen extends Document {
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    msExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    webkitExitFullscreen?: () => void;
}

interface UserInterface {
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    __v: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    shopId: string;
    photoURL: string;
    uid: string;
}


export { RouteInterface, DocumentWithFullscreen, UserInterface };