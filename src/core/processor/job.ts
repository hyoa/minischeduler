export default class Job {
  externalId: string;

  owner: string;

  duration: number;

  startedAt!: number;

  progression: number;

  constructor(externalId: string, owner: string, duration: number) {
    this.externalId = externalId;
    this.duration = duration;
    this.owner = owner;
    this.progression = 0;
  }
}
