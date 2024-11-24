import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../../lib/Loading';
import { Alert, Button, Drawer, Radio, Rating } from 'flowbite-react';
import {
  ProductInterface,
  ProductReviewInterface,
} from '../../../interface/interface';
import { ThemeContext } from '../../../contexts/themeContext';

const drawerTheme = {
  root: {
    base: 'fixed z-99999 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800',

    position: {
      right: {
        on: 'right-0 top-0 md:top-50 h-screen md:h-fit md:p-4 w-80 transform-none md:w-[35vw] z-99999 shadow-lg rounded-md',
        off: 'bottom-0 left-0 right-0 w-full translate-y-full',
      },
    },
  },
};

const AddReview = ({
  open,
  close,
  product,
  review,
}: {
  open: boolean;
  close: () => void;
  product: ProductInterface;
  review?: ProductReviewInterface;
}) => {
  const { setDimBackground } = useContext(ThemeContext);

  const [newReview, setNewReview] = useState<string>('');
  const [imageMatch, setImageMatch] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [displayName, setDisplayName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [addReview, addReviewStatus] =
    zeapApiSlice.useCreateProductReviewMutation();
  const isLoading = addReviewStatus.isLoading;

  const validate = () => {
    if (!newReview) {
      setErrorMsg('Please write a review');
      return false;
    }
    if (!title) {
      setErrorMsg('Please enter a title');
      return false;
    }
    if (!rating || rating === 0) {
      setErrorMsg('Please rate the product');
      return false;
    }
    if (!displayName) {
      setErrorMsg('Please enter your name');
      return false;
    }
    if (displayName.length < 2) {
      setErrorMsg('Name must be at least 2 characters');
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (review) {
      setNewReview(review.review);
      setTitle(review?.title);
      setRating(review.rating);
      setDisplayName(review.displayName);
    }
  }, [review]);

  const handleRating = () => {
    setErrorMsg('');
    if (!validate()) return;
    const payload = {
      productId: product?.productId,
      review: newReview,
      title: title,
      rating: rating,
      displayName: displayName,
      imageMatch: imageMatch,
    };
    addReview({ payload })
      .unwrap()
      .then(() => {
        setDimBackground(false);
        close();
      })
      .catch((err) => {
        setErrorMsg(err?.data?.error);
      });
  };

  return (
    <Drawer
      open={open}
      onClose={close}
      position="right"
      edge
      theme={drawerTheme}
    >
      <Drawer.Header title="Add Review" titleIcon={() => <></>} />
      <Drawer.Items>
        {isLoading && <Loading />}
        {errorMsg && (
          <Alert color="failure" className="mb-4">
            {errorMsg}
          </Alert>
        )}
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="rating" className="text-sm font-semibold">
              Ratings
            </label>
            <Rating className="cursor-pointer" size="md">
              {[1, 2, 3, 4, 5].map((star) => (
                <Rating.Star
                  key={star}
                  onClick={() => setRating(star)}
                  filled={rating >= star}
                />
              ))}
              <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {rating} out of 5
              </p>
            </Rating>
          </div>
          <div>
            <label htmlFor="title" className="text-sm font-semibold">
              Title
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your review a title"
              required
            />
          </div>
          <div>
            <label htmlFor="review" className="text-sm font-semibold">
              Review
            </label>
            <textarea
              className="w-full border rounded-md p-2"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Please write a short review for the product"
              required
            />
          </div>

          <div>
            <label htmlFor="imageMatch" className="text-sm font-semibold">
              Does the product image match the product?
            </label>
            <div className="flex items-center gap-4">
              <Radio
                checked={imageMatch}
                onChange={() => setImageMatch(true)}
                color="success"
              />
              <label htmlFor="imageMatch" className="text-sm font-semibold">
                Yes
              </label>
              <Radio
                checked={!imageMatch}
                onChange={() => setImageMatch(false)}
                color="success"
              />
              <label htmlFor="imageMatch" className="text-sm font-semibold">
                No
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="displayName" className="text-sm font-semibold">
              Submit review as
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <Button color="primary" onClick={handleRating} disabled={isLoading}>
            Submit
          </Button>
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default AddReview;
