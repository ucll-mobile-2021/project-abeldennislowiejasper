export { }
/**CLASS ITEM
 * Used to store/load items inside app
 * usage example: let a = new Item(123456, "test item", "A", "https://idk.com");
 * @argument barcode: the barcode given to the item
 * @argument name: the name of the item
 * @argument nutriScore: A score given to the item that indicates the 'healthiness', A-F
 * @argument allergene: an arraylist of strings representing the allergenes of the Item.
 * @argument IMGurl: some items get an img, some not.
 */
class Item {

    constructor(public barcode: number, public name: string, public nutriscore: string, public allergene: string[], public IMGurl: string) { }

    /**
     * Function: get the text version of an Item.
     */
    itemToText() {
        return `${this.name}: barcode: ${this.barcode}, ${this.nutriscore}-score`;
    }
}
export default Item;