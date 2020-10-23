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
    IMGurl: 'string'
  }
}


class Database {

  length: number = 0;
  results: Item[] = []

  constructor() {
    Realm.open({ schema: [ProductSchema] }).then(realm => {
      const lijst = realm.objects('Product')
      this.length = lijst.length;
      for (let i = 0; i < lijst.length; ++i) {
        var item = lijst[i]
        this.results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl));
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
        results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl));
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
          IMGurl: item.IMGurl
        })
      })

      const lijst = realm.objects('Product')
      this.length = lijst.length;
      realm.close()
    })
  }

}

export default Database;