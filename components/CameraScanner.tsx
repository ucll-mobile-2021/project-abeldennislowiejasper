import { Component } from "react";

import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";

/**
 * Scanner class, used to obtain camera module
 */
class Scanner extends Component<{}, { visible: boolean }> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            visible: false
        }
    }
    toggleState() {
        this.setState({
            visible: !this.state.visible
        })
    }
    render() {
        return (
            <View style={styles.cameraScannerContainer}>

                { // Only show this button if state.visible == false
                    !this.state.visible && <Button
                        title="Enter info by camera"
                        onPress={() => this.toggleState()}
                    />
                }
                { // Only show the camera when state.visible == true
                    this.state.visible &&
                    <View style={styles.camera}>
                        <RNCamera //This is the camera
                            captureAudio={false}
                            style={{
                                flex: 1,
                            }}
                        />
                        <View style={styles.closeCameraButton}>
                            <Button
                                title="Close Camera"
                                onPress={() => this.toggleState()}
                            />
                        </View>
                    </View>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    cameraScannerContainer: {
        width: '80%', marginLeft: '10%', paddingTop: 10
    },
    camera: {
        height: '100%',
        position: 'relative'
    },
    closeCameraButton: {
        opacity: 0.5,
        zIndex: 100,
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: [
            { translateX: -50 },
          ]
    }
})
export default Scanner;