import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import arrowMessIcon from '../../assets/arrow-mess-icon';  
import cameraIcon from '../../assets/camera-icon';
import fireIcon from '../../assets/fire-icon';

const MessageBoxScreen = ({ navigation }) => {
    const messages = [
        { id: '1', text: 'Mày làm gì đóa?', isSent: true },
        { id: '2', text: 'Tao code', isSent: false },
        { id: '3', text: 'Sao t lại đi đăng kí mấy quỷ này ta', isSent: false },
        { id: '4', text: 'Ngủ u', isSent: true },
        { id: '5', text: 'Chưa xong tròi oi', isSent: false },
    ];

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>            
                <SvgXml xml={arrowMessIcon} style={styles.iconBack}/>
            </TouchableOpacity>    
            <View style={styles.avatarContainer}>
                <View style={styles.avatarOuter}>
                    <Image style={styles.avatar} source={{ uri: 'https://via.placeholder.com/150' }} />
                </View>
                <Text style={styles.usernameText}>name</Text>      
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
            />
            <TouchableOpacity>            
                <SvgXml xml={fireIcon} style={styles.icon}/>
            </TouchableOpacity> 
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={[styles.messageContainer, item.isSent ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={renderHeader}
                style={styles.scrollView}
                data={messages}  
                renderItem={renderItem}  
                keyExtractor={(item) => item.id}
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
