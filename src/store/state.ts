import Processor from '@/core/processor/processor';
import Queue from '@/core/queue/queue';
import Scheduler from '@/core/scheduler/scheduler';

export interface State {
  queues: Array<Queue>;
  scheduler: Scheduler;
  processor: Processor;
  logs: Array<string>;
  tree: unknown,
}
