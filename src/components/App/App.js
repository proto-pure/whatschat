import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { Spinner } from 'components/Spinner';
import { MessageInput } from 'components/MessageInput';
import { MessagesWindow } from 'components/MessagesWindow';
import { UserNameInput } from 'components/UsernameInput';

import styles from './styles.module.scss';

/**
 * The main component
 */
function App() {
  const { setUser } = useSelector(state => state.actions);
  const userId = useSelector(state => state.userId);
  const dispatch = useDispatch();
  const cachedUser = localStorage.getItem('whatschat_user');

  const inputsWrapperClassnames = classNames(styles.inputsWrapper, {
    [styles.userNotRegistered]: !userId,
  });

  useEffect(() => {
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      dispatch(setUser(user));
    }
  }, [cachedUser, setUser, dispatch]);

  return (
    <>
      <Spinner />
      <div className={styles.app}>
        <MessagesWindow />

        <div className={inputsWrapperClassnames}>
          {userId && <MessageInput />}
          <UserNameInput />
        </div>
      </div>
    </>
  );
}

export { App };
