import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native';
import { SvgXml } from 'react-native-svg';

// icon
import friendIcon from '../assets/friend-icon';
import friendRequestIcon from '../assets/friend-request-icon';
import friendInviteIcon from '../assets/friend-invite-icon';
import searchIcon from '../assets/search-icon';
import friendSuggestionIcon from '../assets/friend-suggestion-icon';
import friendShareIcon from '../assets/friend-share-icon';

// component
import UserSearchCard from '../components/UserSearchCard';
import UserFriendCard from '../components/UserFriendCard';
import UserRequestCard from '../components/UserRequestCard';

const FriendsScreen = ({ navigation }) => {
  const friendsSampleData = [
    { id: '1', username: 'John Doe', avatar: 'https://via.placeholder.com/150' },
    { id: '2', username: 'Jane Smith', avatar: 'https://via.placeholder.com/150' }
  ];

  const requestsSampleData = [
    { id: '3', username: 'Alice Johnson', avatar: 'https://via.placeholder.com/150' },
    { id: '4', username: 'Bob Brown', avatar: 'https://via.placeholder.com/150' }
  ];

  const suggestionsSampleData = [
    { id: '5', username: 'Charlie Davis', avatar: 'https://via.placeholder.com/150' },
    { id: '6', username: 'Diana Miller', avatar: 'https://via.placeholder.com/150' }
  ];

  const renderHeader = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Friends</Text>
      </View>
      <Text style={styles.friendCount}>2 out of 20 friends added</Text>
      <View style={styles.line} />
      <View style={styles.searchBarContainer}>
        <SvgXml xml={searchIcon} style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Add a new friend" placeholderTextColor="#AAAAAA" />
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.container}>
      <View style={styles.shareLinkContainer}>
        <View style={styles.shareCard}>
          <View style={styles.shareCardIn}>
            <SvgXml xml={friendShareIcon} style={styles.shareIcon} />
          </View>
        </View>
        <Text style={styles.shareText}>Copy link</Text>
        <TouchableOpacity>
          <Image style={styles.shareButton} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Camera')}>
        <View style={styles.backButton}></View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      style={styles.scrollView}
      data={[]}
      renderItem={null}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={() => (
        <>
          <View style={styles.recyclerView}>
            <View style={styles.headerRow}>
              <SvgXml xml={friendIcon} style={styles.searchIcon} />
              <Text style={styles.sectionHeader}>Your Friends</Text>
            </View>
            <FlatList
              style={styles.flatList}
              data={friendsSampleData}
              renderItem={({ item }) => (
                <UserFriendCard
                  username={item.username}
                  avatar={item.avatar}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal={false}
            />
          </View>
          <View style={styles.recyclerView}>
            <View style={styles.headerRow}>
              <SvgXml xml={friendRequestIcon} style={styles.searchIcon} />
              <Text style={styles.sectionHeader}>Friend Requests</Text>
            </View>
            <FlatList
              style={styles.flatList}
              data={requestsSampleData}
              renderItem={({ item }) => (
                <UserRequestCard
                  username={item.username}
                  avatar={item.avatar}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={styles.recyclerView}>
            <View style={styles.headerRow}>
              <SvgXml xml={friendSuggestionIcon} style={styles.searchIcon} />
              <Text style={styles.sectionHeader}>Suggestions for you</Text>
            </View>
            <FlatList
              style={styles.flatList}
              data={suggestionsSampleData}
              renderItem={({ item }) => (
                <UserSearchCard
                  username={item.username}
                  avatar={item.avatar}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal={false}
            />
          </View>
          <View style={styles.recyclerView}>
            <View style={styles.headerRow}>
              <SvgXml xml={friendInviteIcon} style={styles.searchIcon} />
              <Text style={styles.sectionHeader}>Invite from other apps</Text>
            </View>
          </View>
        </>
      )}
    />
  );
};
const styles = {
  scrollView: {
    backgroundColor: '#AAC2B3',
    paddingTop: 45,
    paddingLeft: 5,
    paddingRight: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: '#f8fff8',
    fontSize: 30,
  },
  backButton: {
    width: 70,
    height: 10,
    alignItems: 'center',
    backgroundColor: '#F8FFF8',
    marginTop: 25,
    marginBottom: 50,
    borderRadius: 35,
  },
  friendCount: {
    marginHorizontal: 15,
    marginTop: 15,
    textAlign: 'center',
    color: '#ECF4F4',
    fontSize: 20,
  },
  line: {
    width: '80%',
    height: 3,
    backgroundColor: '#D9D9D9',
    marginTop: 23,
    marginHorizontal: 'auto',
    borderRadius: 1.5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FFF8',
    marginHorizontal: 40,
    marginTop: 15,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 35, // Assuming rounded corners
  },
  searchIcon: {
    paddingLeft: 50,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#738F81',
  },
  recyclerView: {
    width: '100%',
    marginTop: 25,

    
  },
  flatList:{
    borderRadius: 30,
    backgroundColor:  '#F8FFF8',
    marginHorizontal:10,
    
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 10,
  },
  shareLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FFF8',
    marginHorizontal: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 21, // Assuming rounded corners
  },
  shareCard: {
    backgroundColor: '#738F81',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100, // Circle shape
  },
  shareCardIn: {
    backgroundColor: '#F8FFF8',
    width: 53,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100, // Circle shape
  },
  shareIcon: {
    width: 52,
    height: 52,
  },
  shareText: {
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center',
    color: '#738F81',
    fontSize: 19,
  },
  shareButton: {
    width: 45,
    height: 45,
  },
  headerRow: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically in the middle
    marginBottom: 10,
  },
  searchIcon: {
    width: 20, // Adjust width and height as needed
    height: 20,
    marginRight: 10, // Add margin between icon and text
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 20,
  },
};

export default FriendsScreen;
