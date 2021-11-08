import uniqid from 'uniqid';

import Job from './job';

export default class Queue {
  id: string;

  private jobs: Array<Job>;

  constructor() {
    this.id = uniqid();
    this.jobs = [];
  }

  getJobs(): Array<Job> {
    return this.jobs;
  }

  addJob(job: Job): void {
    this.jobs.push(job);
  }

  runJob(): void {
    if (this.jobs.length === 0) {
      return;
    }

    if (!this.jobs[0].startedAt) {
      this.jobs[0].startedAt = Date.now();
    }

    const { duration } = this.jobs[0];
    this.jobs[0].progression = Math.floor(((Date.now() - this.jobs[0].startedAt) * 100) / duration);

    if (this.jobs[0].startedAt + this.jobs[0].duration < Date.now()) {
      this.jobs.shift();
    }
  }

  getActiveJobProgression(): number|null {
    if (this.jobs.length > 0 && this.jobs[0].startedAt) {
      return this.jobs[0].progression;
    }

    return null;
  }
}
