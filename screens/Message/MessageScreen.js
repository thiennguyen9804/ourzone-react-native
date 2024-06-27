import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import arrowMessIcon from '../../assets/arrow-mess-icon';  
import messageGreenIcon from '../../assets/message-green-icon';  
import UserMessageCard from '../../components/UserMessageCard';
import { useApplicationContext } from '../../hooks/useApplicationContext';

const MessageScreen = ({ navigation }) => {

    // const friends = [
    //     { id: '1', username: 'John Doe', avatar: 'https://via.placeholder.com/150',chat:"trôii" },
    //     { id: '2', username: 'Jane Smith', avatar: 'https://via.placeholder.com/150',chat:"ngủ i" }
    // ];
    const { friends } = useApplicationContext();
    // console.log('friends in chat', friends)
    const { user } = useApplicationContext();
    
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>            
                <SvgXml xml={arrowMessIcon} style={styles.backIcon}/>
            </TouchableOpacity>    
            <SvgXml xml={messageGreenIcon} style={styles.messIcon}/>
            <Text style={styles.headerText}>Messages</Text>
        </View>
    );

    const renderItem = ({ item }) => {
        console.log(item.userName);
        console.log(item.avatar)
        return (
            <UserMessageCard 
                username={item.userName} 
                chat={'...'} 
                navigation={navigation}
                avatar={item.avatar} 
                userId={user.userId}
                friendId={item.userId}
            />
        )
    };

    return (
        <FlatList
            ListHeaderComponent={renderHeader}
            style={styles.scrollView}
            data={friends} 
            renderItem={renderItem}  
            keyExtractor={(item) => item.userId}
            ItemSeparatorComponent={() => <View style={styles.separator} />} 
            ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No messages to display</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 10,
        marginBottom: 40,
    },
    headerText: {
        fontSize: 24,
        fontFamily:'OpenSansBold',
        marginLeft: 10,
        color: "#AAC2B3",
    },
    scrollView: {
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // backgroundColor: 'red',
        margin: 'auto'
    },
    emptyText: {
        fontSize: 18,
        color: '#777',
        justifyContent: 'center',
    },
    backIcon: {
        padding: 10,
        marginLeft: 10,
    },
    messIcon: {
        marginLeft: 50,
    },
    separator: {
        height: 20
    },
});

export default MessageScreen;
