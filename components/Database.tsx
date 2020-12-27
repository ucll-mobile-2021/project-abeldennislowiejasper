import React, { useEffect } from 'react'
import Item from './Item'
import ListItem from './ListItem'


import Realm, { List } from 'realm'
import { getAll } from '../screens/StashScreen'

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

const ListItemSchema = {
  name: 'ListItem',
  properties: {
    id: 'int',
    name: 'string',
    nutriscore: 'int'
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
  resultsList: ListItem[] = []
  lengthRemoved: number = 0;
  lijstRemoved: Item[] = []
  lijstBijnaVervallen: Item[] = [];

  constructor() {
    if (realm == null) {
      realm = new Realm({ schema: [ProductSchema, RemovedSchema, ListItemSchema], schemaVersion: 7 })
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

    const lijstBoodschappen = realm.objects('ListItem')
    this.length = lijstBoodschappen.length;
    for (let i = 0; i < lijstBoodschappen.length; ++i) {
      var item = lijstBoodschappen[i]
      this.resultsList.push(new ListItem(item.toJSON().id, 
      item.toJSON().name, 
      item.toJSON().amount));
    }
    this.length = lijst.length;
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

  public addListItem(item: ListItem) {

    realm.write(() => {
      const MyListItem = realm.create('ListItem', {
        id: item.id,
        name: item.name,
        nutriscore: item.amount
      })
    })

    const lijst = realm.objects('ListItem')
    this.length = lijst.length;

  }

  public removeListItem(id: number) {
    var item: ListItem;
    var temp = realm.objects('ListItem').filtered(`id = ${id}`)[0]

    realm.write(() => {
      realm.delete(temp);
    });
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
    currentdate.setDate(currentdate.getDate() - 1)
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
    currentdate.setDate(currentdate.getDate() - 1)

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

  public getLijstBoodschappen(): ListItem[] {
    let resultsList: ListItem[] = []
    const lijst = realm.objects('ListItem')
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      var item = lijst[i]
      resultsList.push(new ListItem(item.toJSON().id, 
      item.toJSON().name, 
      item.toJSON().amount));
    }
    
    this.resultsList = resultsList;

    return resultsList;
  }

   public getNutriScoreAmount(String : Text): number {
    let score = String;
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    let e = 0;
    const lijst = realm.objects('Product')

    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      if(lijst[i].nutriscore == 'a' ){
        a += 1;
      }
      if(lijst[i].nutriscore == 'b'){
        b += 1;
      }
      if(lijst[i].nutriscore == 'c'){
        c += 1;
      }
      if(lijst[i].nutriscore == 'd'){
        d += 1;
      }
      if(lijst[i].nutriscore == 'e'){
        e += 1;
      }
    };
    
    if(score == 'a'){
      return a;
    } else if(score == 'b'){
      return b;
    } else if (score == 'c'){
      return c;
    } else if (score == 'd'){
      return d;
    } else if (score== 'e'){
      return e;
    } else {
      return 255;
    }

  }

  /*
  public getNutriScoreBAmount(): Item[] {
    let results: Item[] = []
    


    const lijst = realm.objects('Product').filtered("nutriscore == b")
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

  public getNutriScoreCAmount(): Item[] {
    let results: Item[] = []
    


    const lijst = realm.objects('Product').filtered("nutriscore == c")
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

  public getNutriScoreDAmount(): Item[] {
    let results: Item[] = []
    


    const lijst = realm.objects('Product').filtered("nutriscore == d")
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

  public getNutriScoreEAmount(): Item[] {
    let results: Item[] = []
    


    const lijst = realm.objects('Product').filtered("nutriscore == e")
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

  } */

  public getTotalSugar(): number {
    let totalSugar = 0;

    const lijst = realm.objects('Product')
    
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      totalSugar += lijst[i].sugars_100g;
    }
    return totalSugar;
  }

  public getTotalFat(): number {
    let totalFat = 0;

    const lijst = realm.objects('Product')
    
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      totalFat += lijst[i].fat_100g;
    }
    return totalFat;
  }

  public getTotalSodium(): number {
    let totalSodium = 0;

    const lijst = realm.objects('Product')
    
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      totalSodium += lijst[i].sodium_100g;
    }
    return totalSodium;
  }

  
  public getTotalProteins(): number {
    let totalProteins = 0;

    const lijst = realm.objects('Product')
    
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      totalProteins += lijst[i].proteins_100g;
    }
    return totalProteins;
  }

  public getTotalKcal(): number {
    let totalKcal = 0;

    const lijst = realm.objects('Product')
    
    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      totalKcal += lijst[i].energy_kcal_value;
    }
    return totalKcal;
  }

  public mapExpirations(): Map<string, number> {
    let map = new Map();
    const lijst = realm.objects('Product')

    let date = Date.now(); 
    let dateconvert = new Date(date);


    
    

    this.length = lijst.length;
    for (let i = 0; i < lijst.length; ++i) {
      
      let amount = 0;
      let year = lijst[i].expiration_date.getFullYear();
      let month = lijst[i].expiration_date.getMonth() + 1 ;
      let day = lijst[i].expiration_date.getDate();
      let date = year+'-'+month+'-'+day;
      
      //TODO
      map.set(date, amount + 1)
      
    }
    return map;
  }

}

export default Database;