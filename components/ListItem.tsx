export { }
/**CLASS ITEM
 * Used to store/load items inside app
 * usage example: let a = new Item(123456, "test item", "A", "https://idk.com");
 * @argument id: the id of the item
 * @argument name: the name of the item
 */
class ListItem {

    constructor(public id: number,public name: string) { }

    /**
     * Function: get the text version of an Item.
     */
    itemToText() {
        return `${this.name}`;
    }
}
export default ListItem;