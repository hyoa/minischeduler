export default class Item {
  id: string

  readonly color: string

  constructor(id: string, color: string) {
    this.id = id;
    this.color = color;
  }
}
