import { GetterTree } from 'vuex';

import Queue from '@/core/queue/queue';
import { State } from '../state';
import Scheduler from '@/core/scheduler/scheduler';
import Processor from '@/core/processor/processor';
import Step from '@/core/processor/step';

export type Getters = {
  queues(state: State): Array<Queue>
  scheduler(state: State): Scheduler
  processor(state: State): Processor
  logs(state: State): Array<string>
  tree(state: State): Array<Step>
  queueById(state: State): (id: string) => Queue | undefined
  activeQueue(state: State): string | undefined
}

export const getters: GetterTree<State, State> & Getters = {
  queues: (state) => state.queues,
  scheduler: (state) => state.scheduler,
  processor: (state) => state.processor,
  logs: (state) => state.logs,
  tree: (state) => state.tree,
  queueById(state: State) {
    return (id: string) => state.queues.find((q) => q.id === id);
  },
  activeQueue(state: State) {
    return state.scheduler.getCurrentQueue();
  },
};
