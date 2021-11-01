import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { Message } from 'components/Message';

import { messagesRef, getMessages, signInAnonymously } from 'utils/firebase';

import styles from './styles.module.scss';

/**
 * A component that renders the main messages window
 */
const MessagesWindow = () => {
  /** @type {[Array<Message>, React.SetStateAction<any>]} */
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [userLogged, setUserLogged] = useState(false);
  const { setAppReadyState } = useSelector(state => state.actions);
  const dispatch = useDispatch();

  const messagesWindowClasses = classNames(styles.messagesWindow, {
    [styles.noMessages]: !messages.length,
  });

  useEffect(() => {
    messagesRef.orderBy('timestamp', 'asc').onSnapshot(
      async querySnapshot => {
        const response = await getMessages({ querySnapshot });

        response && setMessages(response);
        setLoadingMessages(false);
      },
      error => {
        (async () => {
          const response = await signInAnonymously();

          if (response) {
            setUserLogged(true);
          } else {
            setLoadingMessages(false);
          }
        })();
      }
    );
  }, [userLogged]);

  useEffect(() => {
    dispatch(setAppReadyState());
  }, [dispatch, setAppReadyState]);

  return (
    <div className={messagesWindowClasses}>
      {loadingMessages && (
        <div>
          <h1>Loading messages...</h1>
        </div>
      )}

      {!messages.length && !loadingMessages && (
        <div>
          <h1>No messages in database</h1>
        </div>
      )}

      {messages.map(props => (
        <Message key={props.timestamp} {...props} />
      ))}
    </div>
  );
};

export { MessagesWindow };
