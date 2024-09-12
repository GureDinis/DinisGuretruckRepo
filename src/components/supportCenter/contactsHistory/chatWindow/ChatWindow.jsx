import React, { useEffect, useRef, useState } from 'react';
import style from './ChatWindow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { setUserMessages } from '../../../../Redux/reducers/userSlice';
import { CreateCallCenterQuery, GetOperatorChatHistoryWithUser } from '../../../../Api/Api.jsx';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Overlay } from 'antd/es/popconfirm/PurePanel';
import { FormattedMessage, useIntl } from 'react-intl';
import useMessage from '../../../../hooks/useMessage.js';
import SendMessage from '../../../SVGs/SendMessage.jsx';
import { getLanguage } from '../../../../Helper.jsx';

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return date.toLocaleDateString(getLanguage().substring(0, 2), options);
};

function ChatWindow(props) {
  const queryClient = useQueryClient();
  const useUpdateMessages = () => {
    return useMutation(CreateCallCenterQuery);
  };
  const updateMessagesMutation = useUpdateMessages();
  const intl = useIntl();
  const listRef = useRef(null);
  const operator = useSelector((state) => state.user.activeOperator);
  const userMessages = useSelector((state) => state.user.userMessages);
  const { userId, companyName, name, userName } = useSelector((state) => state.user.profileData);
  const [tempMessage, setMessage] = useState('');
  const dispatch = useDispatch();
  const { showError, showSuccess } = useMessage();

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    updateMessagesMutation.mutate(
      {
        operatorId: operator.idWorker,
        userId: userId,
        message: tempMessage,
      },
      {
        onSuccess: (data) => {
          if (data?.data.statusCode === 200) {
            queryClient.invalidateQueries('userMessages');
            setMessage('');
          }
        },
        onError: (error) => {
          console.log(error);
          message.destroy();
          showError('something went wrong');
        },
      },
    );
  };

  const sendMessageClick = () => {
    sendMessage();
  };

  const { isLoading } = useQuery(
    ['userMessages', operator.idWorker, userId],
    () => GetOperatorChatHistoryWithUser(operator.idWorker, userId),
    {
      onSuccess: (data) => {
        dispatch(setUserMessages(data?.data?.result));
      },
    },
  );

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  });

  return (
    <div className={style.chatContainer}>
      {operator?.workerName && (
        <>
          <div className={style.chatHead}>
            <div className={style.leftSide}>
              <div className={`${style.onlineIndicator} ${operator.isOnline ? style.green : style.red}`}></div>
              <div className={style.agentInfo}>
                <h4>
                  <FormattedMessage id="OPOChatWith" defaultMessage="* Chat with" />
                </h4>
                <span>{operator?.workerName}</span>
              </div>
            </div>
            <div>
              <span>
                {companyName}({userName})
              </span>
              <h4 style={{ textAlign: 'right' }}>
                <FormattedMessage id="OPUser" defaultMessage="* User" />: {name}
              </h4>
            </div>
          </div>
          <div ref={listRef} className={style.chatBody}>
            <div className={style.welcomeMessage}>
              <img src={operator.photo ? operator.photo : '/images/operatorIcon.svg'} alt="" />
              <div>
                <FormattedMessage id="OPHello" defaultMessage="* Hi, I am" /> {operator?.workerName.split(' ')[0]}.{' '}
                <FormattedMessage id="OPCanHelp" defaultMessage="* Can I help You?" />
              </div>
            </div>
            {userMessages?.map((group) => (
              <React.Fragment key={group.date}>
                <div className={style.groupDate}>
                  <span>{formatDate(group.date)}</span>
                </div>
                {group?.messages?.map((item) => (
                  <React.Fragment key={item.messageId}>
                    {item.support ? (
                      <div className={style.supportReply}>
                        <div>
                          <div className={style.avatarContainer}>
                            <img src="/images/operatorIcon.svg" alt="" />
                          </div>
                          <div className={style.date}>
                            {new Date(item.date).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })}
                          </div>
                        </div>
                        <span>{item.message}</span>
                      </div>
                    ) : (
                      <div className={style.userReply}>
                        <span>{item.message}</span>
                        <div className={style.userInfo}>
                          <div className={style.avatarContainer}>
                            <img src="/images/modern/chattingAvatar.svg" alt="" />
                          </div>
                          <div className={style.date}>
                            {new Date(item.date).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className={style.chatFooter}>
            <input
              type="text"
              placeholder={intl.formatMessage({
                id: 'CWMessagePlaceHolder',
                defaultMessage: '* Message ...',
              })}
              value={tempMessage}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessageClick();
              }}
              onChange={handleInputChange}
            />
            <div onClick={() => sendMessageClick()} className={tempMessage ? style.active : ''}>
              <SendMessage />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatWindow;
