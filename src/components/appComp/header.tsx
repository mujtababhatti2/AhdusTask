import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For adding icons (optional)

const Header = ({ title, backPress }: any) => {
  return (
    <View style={styles.header}>
      <Icon
        name="arrow-left"
        size={30}
        color="white"
        style={styles.icon}
        onPress={backPress}
      />
      <View style={styles.nameText}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Icon name="dots-vertical" size={30} color="white" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  nameText:{
    width:'80%',
    justifyContent:'center',
    textAlign:'center',
    alignItems:'flex-start',
    paddingHorizontal: 10
  },
  icon: {
    color: 'white',
    padding: 5,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Header;
