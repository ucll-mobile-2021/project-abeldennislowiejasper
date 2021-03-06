import { HeaderStyleInterpolators } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import { NotificationChannel } from 'react-native-notifications/lib/dist/interfaces/NotificationChannel';
import Database from '../components/Database';
import ListItem from '../components/ListItem';

const db = new Database();
let lijstBoodschappen : Array<ListItem>;
let refresh = false;
let valueName: string = "";
let errorsList: string;

function setError(errors: string) {
  errorsList = errors;
}

function getError() {
  return errorsList;
}


let code : any; //welk type zou dit moeten hebben
function ifLijst() {
  let errors = getError
  if(errors.length == 0) {
     code = <Text>{getError()}</Text>
  } else { return null;}
  return code;
  
}

function getLijstBoodschappen() {
  lijstBoodschappen = db.getLijstBoodschappen();
  return lijstBoodschappen;
}

function updateItems(item: ListItem) {
  console.log(item);
  db.addListItem(item);
}

function removeListItem(id: number){
  console.log("remove")
  console.log(id)
  db.removeListItem(id);
}

const cleanseNumber = (number: string) => {return number.trim()=="" || isNaN(parseFloat(number)) ? 0:parseFloat(number) }

class ListScreen extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      lijstBoodschappen: getLijstBoodschappen(),
      refreshing: refresh
    }
  }
  
  onRefresh() {
    refresh = true;
    getLijstBoodschappen();
    
    refresh = false;
  }

  submit(){
    let id = Math.random()
    let errors: string = "";
    if(valueName == "" || valueName.trim() == ""){errors+= "Invalid name, please try again\n";}
    if(errors == ""){
       updateItems(new ListItem(id, valueName));
       this.setState({lijstBoodschappen: getLijstBoodschappen()})
       valueName = ""
       this.textInput.clear()
    }
    setError(errors)
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList  data={getLijstBoodschappen()} extraData={this.state}
          keyExtractor={listitem => listitem.id + ""}
          renderItem={
            ({ item }) =>
            <View style={styles.item}>
                
                <Text style={styles.itemText}>{item.name}</Text>
                <TouchableOpacity
        
        onPress={
          () => {
            removeListItem(item.id); 
            this.setState({lijstBoodschappen: getLijstBoodschappen()})
          }
        }
        style={styles.button}
      > 
      <Text style={styles.buttontext}>Delete product</Text>
      </TouchableOpacity> 
                

              </View>
              
                    
          }
        />
        <View style={styles.form}>
        {ifLijst()}
            <View>
               <Text style={styles.label}><Text style={{color: "red"}}>*</Text>Name:</Text>
               <TextInput ref={input => { this.textInput = input }} onSubmitEditing={(e) => this.submit()} style={styles.textInput} onChangeText={newName => valueName = newName}/>
            </View>
               <Text style={{fontSize: 10}}><Text style={{color: "red"}}>*</Text>required</Text>
            
            <View style={styles.buttonText}>
              <Button title="Add item" color='#8AB8B4' onPress={() => {this.submit()}} />
            </View>
      </View>
        
      </View>
      
    );
  }
}

  
const styles = StyleSheet.create({
  stattext: {
    padding: 12,
    marginTop: 2,
    marginBottom: 2,
    width: "45%",
    borderColor: "#759E9A",
    backgroundColor: "#9ED2CE",
    borderWidth: 2,
    borderRadius: 6,
    alignItems: 'center'

  },
  button: {
    elevation: 8,
    color: '#ffffff',
    backgroundColor:'#f0655b',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
    borderRadius: 10,

    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width - 45
  },
  buttontext: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  headerBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20
  },
  item: {
    marginTop: 15,
    //paddingTop: 25,
    backgroundColor: "#9ED2CE", //#9ED2CE
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: "99%",
    borderRadius: 12,
    marginLeft: 0
  },
  itemText: {
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: "60%",
    alignSelf: "center",
    paddingLeft: 15,
  },
  imageView: {
    width: "25%",
    height: "100%",
    //backgroundColor: "red"
  },
  image: {
    width: 45,
    height: 45,
    alignSelf: "center"
  },
  arrow: {
    width: "15%",
    fontSize: 20,
  },
  bla: {
    flexDirection: 'row'
  },
  bli: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  blu: { fontSize: 10, color: 'black' },
  box: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    borderWidth: 2,
    borderColor: "#759E9A",
    backgroundColor: "#9ED2CE", //#779E9B
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 15,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'

  },
  ScannerScreenContainer: {
    flex: 1,
 },
 FormContainer: {
    width: '75%',
    marginLeft: '12.5%',
    paddingTop: 50
 },
 title: {
    width: '80%',
    marginLeft: '10%',
    textAlign: "center",
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
 },
 form: {
    width: '75%',
    marginLeft: '1%'
 },
 cameraButtonContainer: {
    width: "50%",
    marginLeft: '25%',
    paddingTop: 10
 },
 label: {
    paddingTop: 25
 },
 textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 0
 },
 buttonText: {
    paddingTop: 30,
    paddingBottom: 20
 }
});

  export default ListScreen;