import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { YOUTUBE_REGEX } from '../../constants/general';

import styles from './styles.module.scss';

/**
 * A component that renders a message wrapper with message
 * content itself and related data
 * @param {Message} props Props
 */
const Message = props => {
  const { message: initMessage, timestamp, user } = props;

  /** @type {string | React.ReactElement} */
  let message = initMessage;

  const userName = useSelector(state => state.userName);
  const isCurrentUser = userName === user?.userName ? ' (You)' : '';
  const youTubeRegExp = YOUTUBE_REGEX;

  const url = initMessage.match(youTubeRegExp);
  const isMessageHaveYTLink = url !== null;
  const isMessageHaveLinkOnly = isMessageHaveYTLink && url[0] === url.input;

  const messageWrapperClasses = classNames(styles.messageWrapper, {
    [styles.haveLink]: isMessageHaveYTLink,
    [styles.haveLinkOnly]: isMessageHaveLinkOnly,
    [styles.haveLinkAndMessage]: isMessageHaveYTLink && !isMessageHaveLinkOnly,
  });

  const displayUsername = user
    ? user.displayName + isCurrentUser
    : 'Deleted User';
  const messageDate = new Date(timestamp).toLocaleDateString();
  const messageTime = new Date(timestamp).toLocaleTimeString();

  if (isMessageHaveYTLink) {
    message = (
      <>
        {!isMessageHaveLinkOnly && initMessage}

        <iframe
          src={`//www.youtube-nocookie.com/embed/${url[1]}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </>
    );
  }

  return (
    <div className={styles.entryWrapper}>
      <div className={styles.userAvatar}>{user?.displayName[0]}</div>

      <div className={messageWrapperClasses}>
        <div className={styles.messageInfo}>
          <span className={styles.userDisplayName}>{displayUsername}</span>,
          <span className={styles.messageTimestamp}>
            &nbsp;
            {messageDate}, {messageTime}
          </span>
        </div>

        <div className={styles.messageContent}>{message}</div>
      </div>
    </div>
  );
};

export { Message };
