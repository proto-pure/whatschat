import { useSelector } from 'react-redux';

import { sendMessage } from 'utils/firebase';

import styles from './styles.module.scss';

/**
 * A component that renders a wrapper to send messages
 * with an input field and a `Send` button
 */
const MessageInput = () => {
  const userId = useSelector(state => state.userId);
  const userName = useSelector(state => state.userName);

  /** @param {React.KeyboardEvent} ev */
  const handleInputChange = ev => {
    ev.key.toLowerCase() === 'enter' && sendMessageHandler(ev);
  };

  /** @param {React.SyntheticEvent} ev */
  const sendMessageHandler = ev => {
    ev.preventDefault();

    const message = ev.target.value.trim();

    if (message) {
      sendMessage({ message, userName, userId });
      ev.target.value = null;
    } else {
      alert('Message cannot be empty');
    }
  };

  return (
    <div className={styles.messageInputWrapper}>
      <input
        className={styles.messageInput}
        type='text'
        placeholder='Enter your message...'
        onKeyPress={ev => handleInputChange(ev)}
      />
      <button
        className={styles.messageSendButton}
        onClick={ev => sendMessageHandler(ev)}
      >
        &#10148;
      </button>
    </div>
  );
};

export { MessageInput };
