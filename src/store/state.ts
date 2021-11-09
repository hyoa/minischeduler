import Processor from '@/core/processor/processor';
import Step from '@/core/processor/step';
import Queue from '@/core/queue/queue';
import Scheduler from '@/core/scheduler/scheduler';

export interface State {
  queues: Array<Queue>;
  scheduler: Scheduler;
  processor: Processor;
  logs: Array<string>;
  tree: Array<Step>,
}
