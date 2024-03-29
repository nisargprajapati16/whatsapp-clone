import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

const Chat = ({
    chat,
    messages
}) => {
    const [user] = useAuthState(auth);
    console.log(messages)
    console.log(chat)
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>

            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    );
};

export default Chat;

export async function getServerSideProps(context) {
    const userChatRef = db.collection('chats').doc(context.query.id)
    const messagesRes = await userChatRef.collection('messages').orderBy("timestamp", "asc").get()

    const messages = messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    const chatRes = await userChatRef.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    console.log(messages)

    return {
        props: {
            messages: JSON.stringify(messages),
            chat
        }
    }
}


const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
