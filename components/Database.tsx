import React, { useEffect } from 'react'
import Item from './Item'

import SQLite from 'react-native-sqlite-2'
import Realm from 'realm'

const ProductSchema = {
  name: 'Product',
  properties: {
    barcode: 'int',
    name: 'string',
    nutriscore: 'string',
    allergene: 'string',
    IMGurl: 'string',
    price: 'float'
  }
}

const RemovedSchema = {
  name: 'Removed',
  properties: {
    barcode: 'int',
    name: 'string',
    nutriscore: 'string',
    allergene: 'string',
    IMGurl: 'string',
    price: 'float'
  }
}


class Database {

  length: number = 0;
  results: Item[] = []
  lengthRemoved: number = 0;
  lijstRemoved: Item[] = []

  constructor() {
    Realm.open({ schema: [ProductSchema]}).then(realm => {
      const lijst = realm.objects('Product')
      this.length = lijst.length;
      for (let i = 0; i < lijst.length; ++i) {
        var item = lijst[i]
        this.results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl, item.toJSON().price));
      }
      realm.close()
    })
  }

  public getItemsCount(): number {
    return this.length;
  }

  public getAllProducts(): Item[] {
    let results: Item[] = []
    Realm.open({ schema: [ProductSchema] }).then(realm => {
      const lijst = realm.objects('Product')
      this.length = lijst.length;
      for (let i = 0; i < lijst.length; ++i) {
        var item = lijst[i]
        results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl, item.toJSON().price));
      }
      realm.close()
    })
    this.results = results;

    return results;
  }

  public addProduct(item: Item) {
    Realm.open({ schema: [ProductSchema] }).then(realm => {
      realm.write(() => {
        const MyProduct = realm.create('Product', {
          barcode: item.barcode,
          name: item.name,
          nutriscore: item.nutriscore,
          allergene: item.allergene.toString(),
          IMGurl: item.IMGurl,
          price: item.price
        })
      })

      const lijst = realm.objects('Product')
      this.length = lijst.length;
      realm.close()
    })
  }

  public removeProduct(barcode: string){
    var item:Item;
    Realm.open({schema: [ProductSchema, RemovedSchema]}).then(realm => {
      var temp = realm.objects('Product').filtered(`barcode = ${barcode}` )[0]
      item = new Item(temp.toJSON().barcode, temp.toJSON().name, temp.toJSON().nutriscore, temp.toJSON().allergene, temp.toJSON().IMGurl, temp.toJSON().price)
      realm.write(()=>{
        realm.delete(temp);
        
    
        const MyProduct = realm.create('Removed', {
          barcode: item.barcode,
          name: item.name,
          nutriscore: item.nutriscore,
          allergene: item.allergene.toString(),
          IMGurl: item.IMGurl,
          price: item.price
        })
      });

      const lijstRemoved = realm.objects('Removed')
      this.lengthRemoved = lijstRemoved.length;
      realm.close()
      
    })
  }


  public getAllRemovedProducts(): Item[] {
    let results: Item[] = []
    Realm.open({ schema: [RemovedSchema] }).then(realm => {
      const lijst = realm.objects('Product')
      this.length = lijst.length;
      for (let i = 0; i < lijst.length; ++i) {
        var item = lijst[i]
        results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl, item.toJSON().price));
      }
      realm.close()
    })
    this.lijstRemoved = results;

    return results;
  }

}

export default Database;