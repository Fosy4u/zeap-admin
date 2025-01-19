import ReactImageMagnify from 'react-image-magnify';
import NoPic from '../../images/icon/noPhoto.png';

const ImageZoomer = ({ image }: { image?: string }) => {
  return (
    <div>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: 'body measurement guide',
            isFluidWidth: true,
            src: image || NoPic,
            sizes: '5vw',
            srcSet: `${image || NoPic} 335w`,
          },
          largeImage: {
            src: image || NoPic,
            width: 1200,
            height: 1800,
            sizes: '10vw',
          },
          isHintEnabled: true,
        }}
      />
    </div>
  );
};

export default ImageZoomer;
