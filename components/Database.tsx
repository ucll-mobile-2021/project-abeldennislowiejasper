import React, {useEffect} from 'react'
import Item from './Item'

import SQLite from 'react-native-sqlite-2'
import Realm from 'realm'

//let db = SQLite.openDatabase('productdatabase.db', "1.0", "", 1);


const ProductSchema = {
  name: 'Product',
  properties: {
    barcode: 'int',
    name: 'string', 
    nutriscore: 'string',
    allergene: 'string',
    IMGurl: 'string'
  }
}


class Database {

  length: number = 0;
  results: Item[] = []

   constructor(){
    Realm.open({schema: [ProductSchema]}).then(realm => {
      const lijst = realm.objects('Product')
      this.length = lijst.length;
      for (let i = 0; i < lijst.length; ++i){
        var item = lijst[i]
        this.results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl));
      } 
      console.log(this.results)
      realm.close()
    })
   }

   public getItemsCount(): number{
     return this.length;
   }

   public getAllProducts(): Item[]{
     let results: Item[] = []
    Realm.open({schema: [ProductSchema]}).then(realm => {
      const lijst = realm.objects('Product')
      this.length = lijst.length;
      for (let i = 0; i < lijst.length; ++i){
        var item = lijst[i]
        results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl));
      } 
      console.log(results)
      console.log("length =" + this.length)
      realm.close()
    })
    this.results = results;

    return results;
   }

   public addProduct(item: Item){
     Realm.open({schema: [ProductSchema]}).then(realm => {
       realm.write(() => {
        const MyProduct = realm.create('Product', {
          barcode: item.barcode,
          name: item.name,
          nutriscore: item.nutriscore,
          allergene: item.allergene.toString(),
          IMGurl: item.IMGurl
        })
       })

       const lijst = realm.objects('Product')
       this.length = lijst.length;
       console.log(lijst)
       console.log("length =" + this.length)
       realm.close()
     })
   }
   

 
    /*public getItemsCount(): number{
        let x = 0;
        
          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM producten;', [], (tx, results) => {
            x = results;
          });
        });
        
            
        return x;
        
    }

    public getAllProducts(): Item[]{

      const lijst: Item[] = []
        
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM producten', [], (tx, results) => {
                console.log("Na de execute")
                for (let i = 0; i < results.rows.length; ++i)
                  var item = results.rows.item(i) // var ?
                  lijst.push(new Item(item.barcode, item.name, item.nutriscore, item.allergene, item.IMGurl));
                  console.log(lijst)
              }, (error) => {console.log("ERROR ALL PRODUCTS"); console.log(error)});
            });
        
        console.log("getall products")
        console.log(lijst)
      return lijst;
    }

    public addProduct(item: Item){
      console.log(item)
      
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO producten(barcode, name, nutriscore, allergene, IMGurl) VALUES (:barcode, :name, :nutriscore, :allergene, :IMGurl', [item.barcode, item.name, item.nutriscore, item.allergene, item.IMGurl])
        })
    
    }*/




}

export default Database;