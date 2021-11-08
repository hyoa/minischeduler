export default class Scheduler {
  queues: Array<string>;

  private currentQueue!: string;

  isRunning: boolean;

  rotation: number;

  constructor() {
    this.queues = [];
    this.rotation = 5;
    this.isRunning = false;
  }

  addToQueue(queueName: string): void {
    if (!this.queues.find((q) => q === queueName)) {
      this.queues.push(queueName);
    }

    if (!this.currentQueue) {
      this.currentQueue = queueName;
    }
  }

  getCurrentQueue(): string {
    return this.currentQueue;
  }

  changeCurrentQueue(): void {
    const currentIndex = this.queues.findIndex((q) => q === this.currentQueue);

    if (currentIndex + 1 >= this.queues.length) {
      const [first] = this.queues;
      this.currentQueue = first;
    } else {
      this.currentQueue = this.queues[currentIndex + 1];
    }
  }
}
