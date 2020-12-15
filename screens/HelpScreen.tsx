import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {
    PieChart, BarChart, ContributionGraph
  } from 'react-native-chart-kit';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';
import Database from '../components/Database';


function HelpScreen() {
    return (
        <View>
            <Text>Need help? Mail to info@koelkastapp.be</Text>
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {},
  });

  export default HelpScreen;