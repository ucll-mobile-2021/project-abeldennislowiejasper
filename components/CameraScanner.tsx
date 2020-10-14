import { Component } from "react";

import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";

/**
 * Scanner class, used to obtain camera module
 */
interface IState {
    visible: boolean;
    barcode: string;
    expirationDate: string;
}
class Scanner extends React.Component< { setForm: ({props} : Record<string,string> | Record<string,[]>) => void; }, IState> {
    changeForm: ((props: { [x: string]: any[]; } | { [x: string]: any; }) => void);
    constructor(props: { setForm: ({props}: { [x: string]: any[]; } | { [x: string]: any; }) => void; } | Readonly<{ setForm: ({props}: { [x: string]: any[]; } | { [x: string]: any; }) => void; }>) {
        super(props);
        this.state = {
            visible: false,
            barcode: "",
            expirationDate: ""
        }
        this.changeForm = props.setForm;
    }
    //Toggle the visibility status of the camera
    toggleState() {
        this.setState({
            visible: !this.state.visible,
            barcode: "",
            expirationDate: ""
        })
    }
    async barcodeFound(barcodes: any[]) {
        if (this.state.barcode == "") {
            barcodes.forEach(async (barcode) => {
                if (!isNaN(barcode.data)) {
                    this.setState({ barcode: barcode.data });
                    let a = await this.fetchData(barcode.data);
                    this.changeForm(a)
                    return;
                }
            })
        }
    }
    async fetchData(barcode: string) {
        let name: string = "";
        let nutriscore: string = "";
        let allergens: string = "";
        let img: string = "";
        try {
            //Send fetch request, this returns product info in JSON format
            let response = await fetch('https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json');
            let json = await response.json();
            //We only want the name ATM
            name = json["product"]["product_name"];
            nutriscore = json["product"]["nutriscore_grade"];
            allergens = json["product"]["allergens_tags"];
            img = json["product"]["image_front_url"];
            return { "name": name, "nutriscore": nutriscore, "allergens": allergens, "imgURL": img };
        } catch (error) {
            //pls never trigger thx
            console.error(error);
        }
    }
    //Render the camera, or not 
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
                            onGoogleVisionBarcodesDetected={({ barcodes }) => { this.barcodeFound(barcodes) }}
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