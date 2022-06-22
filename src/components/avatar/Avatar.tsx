import generateRandomRgbColor from '../../util/random-rgb';
import styles from './Avatar.module.css';

interface AvatarProps {
  altText: string;
  src?: string;
  initials?: string;
}

const Avatar = ({ src, altText, initials }: AvatarProps) => {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={altText}
        className={styles.avatar}
        style={{ background: `rgb(${generateRandomRgbColor()})` }}
      >
        {initials}
      </div>
    );
  }

  return <img src={src} alt={altText} />;
};

export default Avatar;
