import { useEffect, useState } from 'react';
import NoPic from '../../../images/icon/noPhoto.png';

const ProductImage = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [hooveredImage, setHooveredImage] = useState<string | null>(null);

  useEffect(() => {
    if (images.length > 0 && !images.includes(selectedImage)) {
      setSelectedImage(images[0]);
    }
  }, [images, selectedImage]);
  return (
    <div className="flex flex-col-reverse md:flex-row gap-2">
      <div className="flex md:flex-col gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="product"
            className={`w-30 h-30 object-contain cursor-pointer ${selectedImage === image ? 'border-2 border-darkGold' : ''}`}
            onClick={() => setSelectedImage(image)}
            onMouseOver={() => setHooveredImage(image)}
            onMouseOut={() => setHooveredImage(null)}
          />
        ))}
      </div>
      <div>
        <img
          src={hooveredImage || selectedImage || NoPic}
          alt="product"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImage;
