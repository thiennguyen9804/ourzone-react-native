import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image, Keyboard } from 'react-native';
import { SvgXml } from 'react-native-svg';
import arrowMessIcon from '../../assets/arrow-mess-icon';  
import cameraIcon from '../../assets/camera-icon';
import fireIcon from '../../assets/fire-icon';
import sendIcon from '../../assets/send-icon';
import { collection, limit, onSnapshot, or, query, where, getDocs } from 'firebase/firestore';
import { app, db } from '../../firebase';
import { useMessage } from '../../hooks/useMessage';

const MessageBoxScreen = ({ route, navigation }) => {
    // isSent = true: on the right
    // isSent = false: on the left
    const { friendId, userId, username, avatar } = route.params;
    // console.log(friendId, userId);
    const { getMessageByMessageId } = useMessage();
    // let messages = [
    //     // { id: '1', text: 'Mày làm gì đóa?', isSent: true },
    //     // { id: '2', text: 'Tao code', isSent: false },
    //     // { id: '3', text: 'Sao t lại đi đăng kí mấy quỷ này ta', isSent: false },
    //     // { id: '4', text: 'Ngủ u', isSent: true },
    //     // { id: '5', text: 'Chưa xong tròi oi', isSent: false },
    // ];

    // let currentMessageRoom = {}
    const { addMessage } = useMessage()
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentMessageRoom, setCurrentMessageRoom] = useState({});
    const [currentMessageRoomId, setCurrentMessageRoomId] = useState('');
    const [loadingMessageRoom , setLoadingMessageRoom] = useState(true);

    // useEffect(() => {
    //     (async () => {
    //         const q = query(collection(db, 'messageRoom'), or(
    //             where('users', '==', [userId, friendId], limit(1)),
    //             where('users', '==', [friendId, userId], limit(1))
    //         ));
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach(doc => setCurrentMessageRoom(doc.data()));
    //         console.log('currentMessageRoom', currentMessageRoom)
    //         currentMessageRoom.messages.forEach(async id => {
    //             let messageValue = await getMessageByMessageId(id);
    //             messageValue.isSent = userId === messageValue.userId
    //             // messages.push(messageValue);
    //             setMessages(prev => [...prev, messageValue]);
    //         })
    //     })();
    // }, []);

    useEffect(() => {
        const q = query(collection(db, 'messageRoom'), or(
            where('users', '==', [userId, friendId], limit(1)),
            where('users', '==', [friendId, userId], limit(1))
        ));
        const unsub = onSnapshot(q, snapshot => {
            let value = {} 
            let valueId = ''
            snapshot.forEach(doc => {
                console.log(doc.data());
                value = doc.data();
                valueId = doc.id
            });
            // console.log(value)
            setCurrentMessageRoom(value);
            setCurrentMessageRoomId(valueId);
            setMessages(value.messages);
            setLoadingMessageRoom(true);
        });

        return () => unsub();
    }, []);

    const sendHandler = async () => {
        // console.log(currentMessageRoomId)
        if(content === '')
            return;
        try {
            const newValue = {
                content,
                sendUser: userId
            };
            console.log(currentMessageRoomId)
            await addMessage(currentMessageRoomId, newValue)
            setContent('');
            Keyboard.dismiss();
        } catch(error) {
            console.log(error.message);
        }
    }


    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>            
                <SvgXml xml={arrowMessIcon} style={styles.iconBack}/>
            </TouchableOpacity>    
            <View style={styles.avatarContainer}>
                <View style={styles.avatarOuter}>
                    <Image style={styles.avatar} source={{ uri: avatar }} />
                </View>
                <Text style={styles.usernameText}>{username}</Text>      
            </View>
        </View>
    );

    const renderFooter = () => (

        <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>            
                <SvgXml xml={cameraIcon} style={styles.icon}/>
            </TouchableOpacity>    
            <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="#fff"
                value={content}
                onChangeText={setContent}
            />
            <TouchableOpacity onPress={sendHandler}>            
                <SvgXml xml={sendIcon} style={styles.icon}/>
            </TouchableOpacity> 
        </View>
    );

    const renderItem = ({ item }) => {
        console.log('item in render item', item);
        return (
            <View style={[styles.messageContainer, (item.sendUser === userId) ? styles.sentMessage : styles.receivedMessage]}>
                <Text style={styles.messageText}>{item.content}</Text>
            </View>
        )
    };
    console.log('currentMessageRoomId', currentMessageRoomId);

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={renderHeader}
                style={styles.scrollView}
                data={messages}  
                renderItem={renderItem}  
                keyExtractor={(item, index) => `${item.sendUser} ${item.content} ${index}`}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No messages to display</Text>
                    </View>
                )}
            />
            {renderFooter()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    avatarOuter: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#738F81',
        borderRadius: 30,
        overflow: 'hidden',
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
    },
    usernameText: {
        fontSize: 18,
       
        color: '#738F81',
        marginLeft: 10,
        fontFamily:'OpenSansBold',

    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    textInput: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        marginRight:10,
        paddingLeft: 10,
        color: "#fff",
        borderRadius: 20,
        backgroundColor: '#AAC2B3',
        fontFamily:'OpenSans',

    },
    scrollView: {
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#777',
        fontFamily:'OpenSans',

    },
    iconBack: {
        padding: 10,
        marginStart: 20,
    },
    icon: {
        padding: 10,
    },
    messageContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 10,
        maxWidth: '70%',
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
    },
    messageText: {
        fontSize: 16,
        fontFamily:'OpenSans',

    },
});

export default MessageBoxScreen;
