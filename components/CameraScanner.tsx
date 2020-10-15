import { Component } from "react";

import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";
import { TapGestureHandler } from "react-native-gesture-handler";

/**
 * Scanner class, used to obtain camera module
 */
interface IState {
    visible: boolean;
    barcode: string;
    expirationDate: string;
}
class Scanner extends React.Component<{ setFormBarcode: ({ props }: Record<string, string> | Record<string, []>) => void; setFormExpirationDate: (date: string) => void }, IState> {
    changeFormBarcodeData: ((props: { [x: string]: any[]; } | { [x: string]: any; }) => void);
    changeFormExpirationDate: ((date: string) => void);
    constructor(props: { setFormBarcode: ({ props }: { [x: string]: any[]; } | { [x: string]: any; }) => void; setFormExpirationDate: (date: string) => void }) {
        super(props);
        this.state = {
            visible: false,
            barcode: "",
            expirationDate: ""
        }
        this.changeFormBarcodeData = props.setFormBarcode;
        this.changeFormExpirationDate = props.setFormExpirationDate;
    }
    //Toggle the visibility status of the camera
    toggleState() {
        this.setState({
            visible: !this.state.visible,
            barcode: "",
            expirationDate: ""
        })
    }
    //Check if the text is a date
    checkIfDate(checkboxes: string | any[]) { //    [{..},{..},{..}]
        if (this.state.expirationDate == "") {
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i]["value"].match(/\d+[\.\/]+\d+[\.\/]+\d+/) != null) {
                    this.setState({
                        expirationDate: checkboxes[i]["value"].match(/\d+[\.\/]*\d+[\.\/]*\d+/)[0]
                    });
                    this.changeFormExpirationDate(checkboxes[i]["value"].match(/\d+[\.\/]*\d+[\.\/]*\d+/)[0]);
                    return;
                }
            }
        }
    }

    //If a barcode is found, this function is called ONCE.
    async barcodeFound(barcodes: any[]) {
        if (this.state.barcode == "") {
            barcodes.forEach(async (barcode) => {
                if (!isNaN(barcode.data)) {
                    this.setState({ barcode: barcode.data });
                    let a = await this.fetchData(barcode.data);
                    if (a != undefined) {
                        this.changeFormBarcodeData(a)
                    }
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
                        <View style={styles.infoBox}>
                            <Text>Barcode found: {this.state.barcode == ""?<Text style={styles.red}>No</Text>:<Text style={styles.green}>Yes</Text>}</Text>
                            <Text>Expiration date found: {this.state.expirationDate == ""?<Text style={styles.red}>No</Text>:<Text style={styles.green}>Yes</Text>}</Text>
                        </View>
                        <RNCamera //This is the camera
                            captureAudio={false}
                            style={{
                                flex: 1,
                            }}
                            onGoogleVisionBarcodesDetected={({ barcodes }) => { this.barcodeFound(barcodes) }}

                            onTextRecognized={(textBlocks) => textBlocks["textBlocks"].length != 0 ? this.checkIfDate(textBlocks["textBlocks"]) : ""}
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
    },
    infoBox: {
        position: 'absolute',
        top: 0,
        left: "-12.5%",
        zIndex: 100,
        backgroundColor: "rgba(255, 255, 255,0.75)",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        borderRightWidth: 1,
        borderRightColor: "black",
        padding: 5
    },
    red: {
        color: "red",
        },
    green: {
        color: "green"
    }
})
export default Scanner;