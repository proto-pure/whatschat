import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { createUser, updateUser } from 'utils/firebase';

import styles from './styles.module.scss';

/**
 * A component that renders a wrapper to register a
 * new user or update nickname of current user with
 * an input field and a `Send` button
 */
const UserNameInput = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const userName = useSelector(state => state.userName);
  const displayName = useSelector(state => state.displayName);
  const { setUser } = useSelector(state => state.actions);

  const inputWrapperClassnames = classNames(styles.userNameInputWrapper, {
    [styles.userNotRegistered]: !userId,
  });

  const inputPlaceholder = userId
    ? `Update your "${displayName}" displayed name...`
    : 'To register, type your name here and hit Enter';

  /** @param {React.KeyboardEvent} ev */
  const handleInputChange = ev => {
    ev.key.toLowerCase() === 'enter' && usernameHandler(ev);
  };

  /** @param {React.SyntheticEvent} ev */
  const usernameHandler = async ev => {
    ev.preventDefault();

    let user;
    const _displayName = ev.target.value.trim();

    try {
      if (!userId && _displayName) {
        user = await createUser(_displayName);
      } else if (_displayName) {
        user = await updateUser({
          userId,
          userName,
          displayName: _displayName,
        });
      } else {
        alert('Display name cannot be empty');
      }
    } catch (error) {
      console.log('Error occured while attempted create/update user');
      return;
    }

    if (user) {
      dispatch(setUser(user));
      localStorage.setItem('whatschat_user', JSON.stringify(user));
      ev.target.value = null;
    }
  };

  return (
    <div className={inputWrapperClassnames}>
      <input
        className={styles.userNameInput}
        type='text'
        placeholder={inputPlaceholder}
        onKeyPress={ev => handleInputChange(ev)}
      />
      <button
        className={styles.setUserNameButton}
        onClick={ev => usernameHandler(ev)}
      >
        &#10148;
      </button>
    </div>
  );
};

export { UserNameInput };
