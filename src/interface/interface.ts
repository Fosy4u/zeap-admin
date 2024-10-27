

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
interface SocialInterface{
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
    tikTok?: string;
}

interface UserInterface {
    [key: string]: any;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    __v: number;
    firstName: string;
    lastName: string;
    displayName: string;
    phoneNumber: string;
    phoneNumberVerified: boolean;
    shopId: string;
    imageUrl: ImageUrlInterface;
    uid: string;
    userId: string;
    address: string;
    region: string;
    country: string;
    isVendor: boolean;
    disabled: boolean;
    isAdmin: boolean;
    superAdmin: boolean;
    social?: SocialInterface;

}
interface SighnUpInterface  {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    region?: string;
    country?: string,
    _id?: string;
    social?: SocialInterface;
   

}

interface CommentInterface {
    _id: string;
    userId?: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    user: UserInterface;
    type: string;
    commentBy: UserInterface;
}
interface CurrencyInterface {
    name: string;
    symbol: string;
    _id: string;
}
interface ShopInterface {
    _id: string;
    businessName: string;
    shopName: string;
    userId: string;
    description: string;
    imageUrl: ImageUrlInterface;
    shopId: string;
    phoneNumber: string;
    address: string;
    region: string;
    country: string;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    user: UserInterface;
    comments: CommentInterface[];
    social: SocialInterface;
    isShoeMaker?: boolean;
    isTailor?: boolean;
    isMakeUpArtist?: boolean;
    totalRevenue?: number;
    currency?: CurrencyInterface;
    email?: string;
}

interface ColorInterface {
    value: string;
    imageLink: string;
}


    
interface ReadyMadeClothCategoryInterface {
    gender : "male" | "female" | "unisex";
    top:"top" | "shirt" | "blouse" | "tunic" | "kaftan" | "kimono" | "sweatshirt" | "hoodie" | "polo";
    bottom: "trouser" | "short" | "skirt" | "pant" | "tights" | "trunks";
    ageGroup: "adult" | "children" | "infant";
    brand?: string;
    isCorporate?: boolean;
    isJeans?: boolean;
    isSuit?: boolean;
    isTraditional?: boolean;
    isSport?: boolean;
    isCasual?: boolean;
    isVest?: boolean;
    isJacket?: boolean;
    isBlazer?: boolean;
    isGym?: boolean;
    isSwim?: boolean;
    isUnderwear?: boolean;
    isNightwear?: boolean;
    isGown?: boolean;
    isTracksuit?: boolean;
    isJoggers?: boolean;
    isKnitwear?: boolean;
    isPlussize?: boolean;
    isTwoPiece?: boolean;
    isWhiteWedding?: boolean;
    isTraditionalWedding?: boolean;
    isAsoebi?: boolean;
    isGroomsMen?: boolean;
    isBridalTrain?: boolean;
    isBridalShower?: boolean;
    isBirthDay?: boolean;
    isBurial?: boolean;
    
}
interface VariationInterface {
    sku: string;
    price: number;
    discount: number;
    colorValue: string;
    size: string;
    stock: number;
}
interface ReadyMadeClothInterface{
    productType: "readyMadeCloth"| "readyMadeShoe"
    productId: string;
    disabled: boolean;
    shopId: string;
    title: string;
    description: string;
    subTitle: string;
    status: string;
    currentStep: number;
    sizes: string[];
    colors: ColorInterface[];
    images: ImageUrlInterface[];
    postedBy: UserInterface;
    shop: ShopInterface;
    category: ReadyMadeClothCategoryInterface;
    variations: VariationInterface[];
    _id: string;
}

type ProductInterface  = ReadyMadeClothInterface;







export { RouteInterface, DocumentWithFullscreen, UserInterface, SighnUpInterface, ImageUrlInterface, SocialInterface, CommentInterface , ShopInterface,ProductInterface, ReadyMadeClothInterface, ColorInterface, CurrencyInterface};