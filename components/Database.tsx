import React, { useEffect } from 'react'
import Item from './Item'


import Realm from 'realm'

const ProductSchema = {
  name: 'Product',
  properties: {
    barcode: 'int',
    name: 'string',
    nutriscore: 'string',
    allergene: 'string',
    IMGurl: 'string',
    price: 'float',
    expiration_date: "date"
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
    price: 'float',
    expiration_date: "date"
  }
}

let realm: any;


class Database {

  length: number = 0;
  results: Item[] = []
  lengthRemoved: number = 0;
  lijstRemoved: Item[] = []
  lijstBijnaVervallen: Item[] = [];

  constructor() {
    console.log("OPEN")
    if (realm == null) {
      realm = new Realm({ schema: [ProductSchema, RemovedSchema], schemaVersion: 6 })
    }
    const lijst = realm.objects('Product')
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      var item = lijst[i]
      this.results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl, item.toJSON().price, item.toJSON().expiration_date));
    }
    this.lijstBijnaVervallen = this.getLijstBijnaVervallen();
  }

  public getItemsCount(): number {
    return this.length;
  }

  public getAllProducts(): Item[] {

    let results: Item[] = []
    const lijst = realm.objects('Product')
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      var item = lijst[i]
      results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl, item.toJSON().price, item.toJSON().expiration_date));
    }
    this.results = results;

    return results;
  }

  public addProduct(item: Item) {

    realm.write(() => {
      const MyProduct = realm.create('Product', {
        barcode: item.barcode,
        name: item.name,
        nutriscore: item.nutriscore,
        allergene: item.allergene.toString(),
        IMGurl: item.IMGurl,
        price: item.price,
        expiration_date: item.expiration_date
      })
    })

    const lijst = realm.objects('Product')
    this.length = lijst.length;

    console.log(this.lijstBijnaVervallen)
  }

  public removeProduct(barcode: string) {
    var item: Item;
    var temp = realm.objects('Product').filtered(`barcode = ${barcode}`)[0]
    item = new Item(temp.toJSON().barcode, temp.toJSON().name, temp.toJSON().nutriscore, temp.toJSON().allergene, temp.toJSON().IMGurl, temp.toJSON().price, temp.toJSON().expiration_date)
    realm.write(() => {
      realm.delete(temp);


      const MyProduct = realm.create('Removed', {
        barcode: item.barcode,
        name: item.name,
        nutriscore: item.nutriscore,
        allergene: item.allergene.toString(),
        IMGurl: item.IMGurl,
        price: item.price,
        expiration_date: item.expiration_date
      })
    });

    const lijstRemoved = realm.objects('Removed')
    this.lengthRemoved = lijstRemoved.length;
  }


  public getAllRemovedProducts(): Item[] {
    let results: Item[] = []
    const lijst = realm.objects('Product')
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      var item = lijst[i]
      results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl, item.toJSON().price, item.toJSON().expiration_date));
    }
    this.lijstRemoved = results;

    return results;
  }

  public getLijstBijnaVervallen(): Item[] {
    let results: Item[] = []
    let currentdate = new Date();
    let weeklaterdate = new Date();
    weeklaterdate.setDate(weeklaterdate.getDate() + 7)
    console.log(currentdate)
    console.log(weeklaterdate)


    const lijst = realm.objects('Product').filtered("expiration_date >= $0 and expiration_date <= $1", currentdate, weeklaterdate)
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      var item = lijst[i]
      console.log("ITEM")
      console.log(item);
      results.push(new Item(item.toJSON().barcode, item.toJSON().name, item.toJSON().nutriscore, item.toJSON().allergene, item.toJSON().IMGurl, item.toJSON().price, item.toJSON().expiration_date));
    }
    this.lijstRemoved = results;
    console.log(this.lijstBijnaVervallen);
    return results;

  }

}

export default Database;