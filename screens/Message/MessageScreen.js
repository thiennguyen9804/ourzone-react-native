import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import arrowMessIcon from '../../assets/arrow-mess-icon';  
import messageGreenIcon from '../../assets/message-green-icon';  
import UserMessageCard from '../../components/UserMessageCard';

const MessageScreen = ({ navigation }) => {

    const friends = [
        { id: '1', username: 'Nguyễn Văn A', chat:'kakakaka'},
        { id: '2', username: 'Trần Văn B', chat:'jhuhuhuh'},
    ];
    
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>            
                <SvgXml xml={arrowMessIcon} style={styles.backIcon}/>
            </TouchableOpacity>    
            <SvgXml xml={messageGreenIcon} style={styles.messIcon}/>
            <Text style={styles.headerText}>Messages</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <UserMessageCard username={item.username} chat={item.chat} navigation={navigation} />
    );

    return (
        <FlatList
            ListHeaderComponent={renderHeader}
            style={styles.scrollView}
            data={friends}  // Flat data array
            renderItem={renderItem}  // Render function for each item
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />} // Add spacing between items
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
        fontWeight: 'bold',
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
    },
    emptyText: {
        fontSize: 18,
        color: '#777',
    },
    backIcon: {
        padding: 10,
        marginLeft: 10,
    },
    messIcon: {
        marginLeft: 50,
    },
    separator: {
        height: 20, 
    },
});

export default MessageScreen;
