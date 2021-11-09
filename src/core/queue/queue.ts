import Item from './item';

export default class Queue {
  readonly id: string;

  readonly name: string;

  private items: Array<Item>

  readonly color: string;

  constructor(id: string, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.items = [];
    this.color = color;
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  getItemWithHighestPriority(): Item|null {
    const item = this.items.shift();

    if (item) {
      return item;
    }

    return null;
  }
}
