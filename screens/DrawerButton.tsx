import React from 'react';
import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';


const DrawerButton = ({ navigation } : any) => (
    <Ionicons style={styles.icon}
       
    name='menu-outline'
    size={35}
    color='#3D5250'
    onPress={() => navigation.toggleDrawer()}
  />
);


DrawerButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DrawerButton;

const styles = StyleSheet.create({
  icon: {
    flex: 1, 
    padding: 10,
  }
});