
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
interface ImageUrlInterface {
    link: string;
    name: string;
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
    imageUrl: ImageUrlInterface;
    uid: string;
    address: string;
    region: string;
    country: string;
    isVendor: boolean;
    disabled: boolean;
}
interface SighnUpInterface  {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    region: string;
    country: string
   

}


export { RouteInterface, DocumentWithFullscreen, UserInterface, SighnUpInterface, ImageUrlInterface };