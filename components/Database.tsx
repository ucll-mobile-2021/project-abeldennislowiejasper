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
    expiration_date: "date",
    energy_kcal_value: 'int', 
    proteins_100g: 'float',
    sugars_100g: 'float',
    sodium_100g: 'float',
    fat_100g: 'float',
    product_quantity: 'int'
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
    expiration_date: "date",
    energy_kcal_value: 'int', 
    proteins_100g: 'float',
    sugars_100g: 'float',
    sodium_100g: 'float',
    fat_100g: 'float',
    product_quantity: 'int'
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
    if (realm == null) {
      realm = new Realm({ schema: [ProductSchema, RemovedSchema], schemaVersion: 7 })
    }
    const lijst = realm.objects('Product')
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      var item = lijst[i]
      this.results.push(new Item(item.toJSON().barcode, 
      item.toJSON().name, 
      item.toJSON().nutriscore, 
      item.toJSON().allergene, 
      item.toJSON().IMGurl, 
      item.toJSON().price, 
      item.toJSON().expiration_date, 
      item.toJSON().energy_kcal_value,
      item.toJSON().proteins_100g, 
      item.toJSON().sugars_100g, 
      item.toJSON().sodium_100g, 
      item.toJSON().fat_100g, 
      item.toJSON().product_quantity));
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
      results.push(new Item(item.toJSON().barcode, 
      item.toJSON().name, 
      item.toJSON().nutriscore, 
      item.toJSON().allergene, 
      item.toJSON().IMGurl, 
      item.toJSON().price, 
      item.toJSON().expiration_date, 
      item.toJSON().energy_kcal_value,
      item.toJSON().proteins_100g, 
      item.toJSON().sugars_100g, 
      item.toJSON().sodium_100g, 
      item.toJSON().fat_100g, 
      item.toJSON().product_quantity));
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
        expiration_date: item.expiration_date,
        energy_kcal_value: item.energy_kcal_value,
        proteins_100g: item.proteins_100g,
        sugars_100g: item.sugars_100g,
        sodium_100g: item.sodium_100g,
        fat_100g: item.fat_100g,
        product_quantity: item.product_quantity
      })
    })

    const lijst = realm.objects('Product')
    this.length = lijst.length;

  }

  public removeProduct(barcode: string) {
    var item: Item;
    var temp = realm.objects('Product').filtered(`barcode = ${barcode}`)[0]
    item = new Item(temp.toJSON().barcode, 
      temp.toJSON().name, 
      temp.toJSON().nutriscore, 
      temp.toJSON().allergene, 
      temp.toJSON().IMGurl, 
      temp.toJSON().price, 
      temp.toJSON().expiration_date,
      temp.toJSON().energy_kcal_value, 
      temp.toJSON().proteins_100g, 
      temp.toJSON().sugars_100g, 
      temp.toJSON().sodium_100g, 
      temp.toJSON().fat_100g, 
      temp.toJSON().product_quantity)
    realm.write(() => {
      realm.delete(temp);


      const MyProduct = realm.create('Removed', {
        barcode: item.barcode,
        name: item.name,
        nutriscore: item.nutriscore,
        allergene: item.allergene.toString(),
        IMGurl: item.IMGurl,
        price: item.price,
        expiration_date: item.expiration_date,
        energy_kcal_value: item.energy_kcal_value,
        proteins_100g: item.proteins_100g,
        sugars_100g: item.sugars_100g,
        sodium_100g: item.sodium_100g,
        fat_100g: item.fat_100g,
        product_quantity: item.product_quantity
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
      results.push(new Item(item.toJSON().barcode, 
      item.toJSON().name, 
      item.toJSON().nutriscore, 
      item.toJSON().allergene, 
      item.toJSON().IMGurl, 
      item.toJSON().price, 
      item.toJSON().expiration_date, 
      item.toJSON().energy_kcal_value,
      item.toJSON().proteins_100g, 
      item.toJSON().sugars_100g, 
      item.toJSON().sodium_100g, 
      item.toJSON().fat_100g, 
      item.toJSON().product_quantity));
    }
    this.lijstRemoved = results;

    return results;
  }

  public getLijstVers(): Item[] {
    let results: Item[] = []
    let currentdate = new Date();
    let weeklaterdate = new Date();
    weeklaterdate.setDate(currentdate.getDate() + 7)


    const lijst = realm.objects('Product').filtered("expiration_date >= $0", weeklaterdate)
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      var item = lijst[i]
      results.push(new Item(item.toJSON().barcode, 
      item.toJSON().name, 
      item.toJSON().nutriscore, 
      item.toJSON().allergene, 
      item.toJSON().IMGurl, 
      item.toJSON().price, 
      item.toJSON().expiration_date, 
      item.toJSON().energy_kcal_value,
      item.toJSON().proteins_100g, 
      item.toJSON().sugars_100g, 
      item.toJSON().sodium_100g, 
      item.toJSON().fat_100g, 
      item.toJSON().product_quantity));
    }
    this.lijstRemoved = results;
    return results;

  }

  public getLijstBijnaVervallen(): Item[] {
    let results: Item[] = []
    let currentdate = new Date();
    let weeklaterdate = new Date();
    weeklaterdate.setDate(weeklaterdate.getDate() + 7)


    const lijst = realm.objects('Product').filtered("expiration_date >= $0 and expiration_date <= $1", currentdate, weeklaterdate)
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      var item = lijst[i]
      results.push(new Item(item.toJSON().barcode, 
      item.toJSON().name, 
      item.toJSON().nutriscore, 
      item.toJSON().allergene, 
      item.toJSON().IMGurl, 
      item.toJSON().price, 
      item.toJSON().expiration_date, 
      item.toJSON().energy_kcal_value,
      item.toJSON().proteins_100g, 
      item.toJSON().sugars_100g, 
      item.toJSON().sodium_100g, 
      item.toJSON().fat_100g, 
      item.toJSON().product_quantity));
    }
    this.lijstRemoved = results;
    return results;

  }

  public getLijstVervallen(): Item[] {
    let results: Item[] = []
    let currentdate = new Date();


    const lijst = realm.objects('Product').filtered("expiration_date < $0", currentdate)
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      var item = lijst[i]
      results.push(new Item(item.toJSON().barcode, 
      item.toJSON().name, 
      item.toJSON().nutriscore, 
      item.toJSON().allergene, 
      item.toJSON().IMGurl, 
      item.toJSON().price, 
      item.toJSON().expiration_date, 
      item.toJSON().energy_kcal_value,
      item.toJSON().proteins_100g, 
      item.toJSON().sugars_100g, 
      item.toJSON().sodium_100g, 
      item.toJSON().fat_100g, 
      item.toJSON().product_quantity));
    }
    this.lijstRemoved = results;
    return results;

  }

}

export default Database;