import { useTranslation } from 'react-i18next';
import './chat-page.scss';

const ChatPage = () => {
    const { i18n, t } = useTranslation();

    return (
        <h2>Chat Page</h2>
    );
}

export default ChatPage;