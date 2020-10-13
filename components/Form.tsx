/**
 * FORM CLASS
 * used to make forms in React-Native
 * 
 */
import React from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';

const Form = (props: { fields: { [x: string]: any; }, buttonText: string }) => {
    const fieldKeys = Object.keys(props.fields);
    //need the first view because function may only return 1 parent element.
    return (<View>
        {fieldKeys.map((key) => {
            const field = props.fields[key];
            return (
                <View key={key}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TextInput style={styles.textInput} {...field.inputProps} placeholder={field.placeholder} />
                </View>
            );
        })}
        <View style={styles.buttonText}>
                <Button title={props.buttonText} onPress={submit} />
        </View>
    </View>);
};
const submit = () => {
    console.log('submitted')
}

const styles = StyleSheet.create({
    label: {
        paddingTop: 25
    },
    textInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        margin: 0
    },
    buttonText: {
        paddingTop: 20
    }
})

export default Form;