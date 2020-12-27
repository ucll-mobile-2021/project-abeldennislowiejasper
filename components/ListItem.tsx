export { }
/**CLASS ITEM
 * Used to store/load items inside app
 * usage example: let a = new Item(123456, "test item", "A", "https://idk.com");
 * @argument id: the barcode given to the item
 * @argument name: the name of the item
 * @argument amount: amount of items

 */
class ListItem {

    constructor(public id: number, public name: string, public amount: number) { }

    /**
     * Function: get the text version of an Item.
     */
    itemToText() {
        return `${this.name}: id: ${this.id}, amount: ${this.amount}`;
    }
}
export default ListItem;