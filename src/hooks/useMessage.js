import { useSelector } from 'react-redux';
import { message } from 'antd';

const useMessage = () => {
  const theme = useSelector((state) => state.theme.theme);

  const showMessage = (type, content) => {
    message[type]({
      content,
      className: theme === 'dark' ? 'messsageDark' : 'messsageLight',
    });
  };

  const showError = (messageContent) => {
    showMessage('error', messageContent);
  };

  const showSuccess = (messageContent) => {
    showMessage('success', messageContent);
  };

  return { showError, showSuccess };
};

export default useMessage;
