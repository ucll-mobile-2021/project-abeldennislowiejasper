export { }
/**CLASS ITEM
 * Used to store/load items inside app
 * usage example: let a = new Item(123456, "test item", "A", "https://idk.com");
 * @argument barcode: the barcode given to the item
 * @argument price: the price of the item
 * @argument name: the name of the item
 * @argument nutriScore: A score given to the item that indicates the 'healthiness', A-F
 * @argument allergene: an arraylist of strings representing the allergenes of the Item.
 * @argument IMGurl: some items get an img, some not.
 * @argument expiration_date: the date this product will expire
 * 
 */
class Item {

    constructor(public barcode: number, public name: string, public nutriscore: string,
         public allergene: string[], public IMGurl: string, public price: number, public expiration_date: Date,
         public energy_kcal_value: number, public proteins_100g: number, public sugars_100g: number,
         public sodium_100g: number, public fat_100g: number, public product_quantity: number) { }

    /**
     * Function: get the text version of an Item.
     */
    itemToText() {
        return `${this.name}: barcode: ${this.barcode}, ${this.nutriscore}-score`;
    }
}
export default Item;