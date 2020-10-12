/**
 * FORM CLASS
 * used to make forms in React-Native
 * 
 */
import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form = (props: { fields: { [x: string]: any; }; }) => {
    const fieldKeys = Object.keys(props.fields);
    //need the first view because function may only return 1 parent element.
    return (<View> 
        {fieldKeys.map((key) => { 
        const field = props.fields[key];
        return (
            <View key={key}>
                <Text>{field.label}</Text>
                <TextInput {...field.inputProps} />
            </View>
        );
    })}
    </View>);
};

export default Form;