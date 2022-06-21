import styles from './LiveSearch.module.css';

interface LiveSearchProps {
  id: string;
}

const LiveSearch = ({ id }: LiveSearchProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id}></label>
      <input id={id} type="text" />
    </div>
  );
};

export default LiveSearch;
gst;
