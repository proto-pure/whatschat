import { useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './styles.module.scss';

/**
 * A component that displays the spinner while loading content
 */
const Spinner = () => {
  const appReady = useSelector(state => state.appReady);
  const spinnerClasses = classNames(styles.spinnerWrapper, {
    [styles.appReady]: appReady,
  });

  return (
    <div className={spinnerClasses}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export { Spinner };
