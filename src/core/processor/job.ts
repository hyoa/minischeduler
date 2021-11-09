export default class Job {
  externalId: string;

  owner: string;

  duration: number;

  startedAt!: number;

  progression: number;

  color: string;

  constructor(externalId: string, owner: string, duration: number, color: string) {
    this.externalId = externalId;
    this.duration = duration;
    this.owner = owner;
    this.progression = 0;
    this.color = color;
  }
}
