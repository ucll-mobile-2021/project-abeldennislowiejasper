import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import {
    Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

export function DrawerContent(props){
    return (
      
        <View style={styles.drawerTab}>  
            <DrawerContentScrollView {... props}>
            <View style={styles.drawerContent}>
            <View style={{flexDirection:'row',marginTop: 15, marginLeft: 10}}>
            <Avatar.Image 
                                source={{
                                    uri: 'https://cdn.discordapp.com/attachments/615560557289799687/766235598163148830/0.png'
                                }}
                                size={50}
                            />
                 <View style={{marginLeft: 5, flexDirection:'column'}}>
                                <Title style={styles.title}>Dennis</Title>                                
                            </View></View>
            
            <Drawer.Section style={styles.userInfoSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name ="person-circle-outline"
                        color='red'
                        size={size}/>                            
                    )}
                    label="My profile"
                    onPress={() => {}}
                />

            </Drawer.Section>
            <Drawer.Section style={styles.userInfoSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name ="document-text-outline"
                        color='red'
                        size={size}/>                            
                    )}
                    label="Shopping List"
                    onPress={() => {}}
                />

            </Drawer.Section>
            <Drawer.Section style={styles.userInfoSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name ="stats-chart-outline"
                        color='red'
                        size={size}/>                            
                    )}
                    label="Statistics"
                    onPress={() => {}}
                />

            </Drawer.Section>
            <Drawer.Section style={styles.userInfoSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name ="settings-outline"
                        color='red'
                        size={size}/>                            
                    )}
                    label="Settings"
                    onPress={() => {}}
                />

            </Drawer.Section>
            
            </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="help-circle-outline" 
                        color='red'
                        size={size}
                        />
                    )}
                    label="Help"
                    onPress={() => {}}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerTab: {
      flex: 1,
      backgroundColor: '#32bcdf',
    },
    drawerContent: {
      flex: 1,
      backgroundColor: '#32bcdf',
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 20,
      marginTop: 5,
      marginLeft: 10,
      fontWeight: 'bold',
      color: 'red',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
