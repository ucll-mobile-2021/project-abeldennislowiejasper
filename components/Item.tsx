export { }
/**CLASS ITEM
 * Used to store/load items inside app
 * usage example: let a = new Item(123456, "test item", "A", "https://idk.com");
 * @argument barcode: the barcode given to the item
 * @argument name: the name of the item
 * @argument nutriScore: A score given to the item that indicates the 'healthiness', A-F
 * @argument IMGurl: some items get an img, some not.
 */
class Item {
    name: string;
    barcode: number;
    IMGurl: string;
    nutriScore: string;

    constructor(barcode: number, name: string, nutriscore: string, IMGurl:string) {
        //TODO validation
        this.name = name;
        this.barcode = barcode;
        this.IMGurl = IMGurl;
        this.nutriScore = nutriscore
    }
    
    /**
     * Function: get the text version of an Item.
     */
    itemToText() {
        return `${this.name}: barcode: ${this.barcode}, ${this.nutriScore}-score`;
    }
}
export default Item;