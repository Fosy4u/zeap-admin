interface RouteInterface {
  path: string;
  component: any;
  isDefault?: boolean;
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
  isDefault?: boolean;
}
interface SocialInterface {
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
interface SighnUpInterface {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  region?: string;
  country?: string;
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
  images: ImageUrlInterface[];
}

interface AgeInterface {
  ageGroup: string;
  ageRange?: string;
}
interface ProductCategoryInterface {
  gender: string[];
  age: AgeInterface[];
  style: string[];
  main: string[];
  sleeveLength?: string;
  design: string[];
  fastening?: string[];
  occasion?: string[];
  fit?: string[];
  brand?: string;
  heelHeight?: string;
  heelType?: string;
}

interface VariationInterface {
  sku: string;
  price: number;
  discount: number;
  colorValue: string;
  size: string;
  quantity: number;
}
interface TimelineInterface {
  date: string;
  description: string;
  actionBy: UserInterface;
}
interface ProductInterface {
  productType: 'readyMadeCloth' | 'readyMadeShoe';
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
  postedBy: UserInterface;
  shop: ShopInterface;
  category: ProductCategoryInterface;
  variations: VariationInterface[];
  promo?: {
    promoId: string;
    discountPercentage: number;
  };
  currency: CurrencyInterface;
  _id: string;
  rejectionReasons: string[];
  timeLine: TimelineInterface[];
}
interface LikeDislikeInterface {
  value: number;
  users: string[];
}
interface ProductReviewInterface {
  _id: string;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  user: UserInterface;
  product: ProductInterface;
  title: string;
  displayName: string;
  likes: LikeDislikeInterface;
  dislikes: LikeDislikeInterface;
}
interface RangePercentageInterface {
  min: number;
  max: number;
}
interface PromoDiscountInterface {
  type: 'range' | 'fixed';
  fixedPercentage?: number;
  rangePercentage?: RangePercentageInterface;
}
interface PromoInterface {
  promoId: string;
  title: string;
  subTitle: string;
  permittedProductTypes: string[];
  productIds: string[];
  description: string;
  discount: PromoDiscountInterface;
  status: string;
  imageUrl: ImageUrlInterface;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export {
  RouteInterface,
  DocumentWithFullscreen,
  UserInterface,
  SighnUpInterface,
  ImageUrlInterface,
  SocialInterface,
  CommentInterface,
  ShopInterface,
  ProductInterface,
  ColorInterface,
  CurrencyInterface,
  VariationInterface,
  TimelineInterface,
  ProductReviewInterface,
  LikeDislikeInterface,
  PromoInterface,
};
