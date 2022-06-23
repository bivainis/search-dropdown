import styles from './Avatar.module.css';

type RgbArray = [number, number, number];

interface AvatarProps {
  altText: string;
  src?: string;
  initials?: string;
  rgbColorArray: RgbArray;
}

const Avatar = ({ src, altText, initials, rgbColorArray }: AvatarProps) => {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={altText}
        className={styles.avatar}
        style={{ background: `rgb(${rgbColorArray})` }}
      >
        {initials}
      </div>
    );
  }

  return <img src={src} alt={altText} />;
};

export default Avatar;
