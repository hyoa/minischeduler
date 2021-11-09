import Job from './job';
import Queue from './queue';

export default class Processor {
  private queues: Array<Queue>

  constructor() {
    this.queues = [];
    for (let i = 0; i < 4; i += 1) {
      this.queues.push(new Queue());
    }
  }

  getQueues(): Array<Queue> {
    return this.queues;
  }

  hasEmptySlot(): boolean {
    const emptyQueues = this.queues.filter((queue) => queue.getJobs().length === 0);

    if (emptyQueues.length > 0) {
      return true;
    }

    return false;
  }

  static createJob(externalId: string, owner: string, color: string): Job {
    return new Job(
      externalId,
      owner,
      (Math.floor(Math.random() * (120 - 20 + 1) + 20)) * 1000,
      color,
    );
  }

  addJob(job: Job): void {
    const emptyQueue = this.queues.find((queue) => queue.getJobs().length === 0);

    if (!emptyQueue) {
      return;
    }

    emptyQueue.addJob(job);
  }

  runQueues(): void {
    for (let i = 0; i < this.queues.length; i += 1) {
      this.queues[i].runJob();
    }
  }
}
