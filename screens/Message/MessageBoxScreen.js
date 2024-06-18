import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SvgXml } from 'react-native-svg';
import arrowMessIcon from '../../assets/arrow-mess-icon';  
import cameraIcon from '../../assets/camera-icon';
import fireIcon from '../../assets/fire-icon';
import UserMessageCard from '../../components/UserMessageCard';


const MessageBoxScreen = ({ navigation }) => {
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>            
                <SvgXml xml={arrowMessIcon} style={styles.iconBack}/>
            </TouchableOpacity>    
            <UserMessageCard style={styles.user} username={"Nguyeen" }></UserMessageCard>
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
            <TouchableOpacity >            
                <SvgXml xml={fireIcon} style={styles.icon}/>
            </TouchableOpacity> 
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={renderHeader}
                style={styles.scrollView}
                data={[]}  
                renderItem={null}  
                keyExtractor={(item, index) => index.toString()}
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
    iconBack: {
        padding: 10,
        marginStart: 20,
    },
    icon: {
        padding: 10,
    },
    user:
    {
        width: '50%', 
        height: 50, 
    }
});

export default MessageBoxScreen;
