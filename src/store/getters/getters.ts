import { GetterTree } from 'vuex';

import Queue from '@/core/queue/queue';
import { State } from '../state';
import Scheduler from '@/core/scheduler/scheduler';
import Processor from '@/core/processor/processor';

export type Getters = {
  queues(state: State): Array<Queue>
  scheduler(state: State): Scheduler
  processor(state: State): Processor
  logs(state: State): Array<string>
  tree(state: State): unknown
}

export const getters: GetterTree<State, State> & Getters = {
  queues: (state) => state.queues,
  scheduler: (state) => state.scheduler,
  processor: (state) => state.processor,
  logs: (state) => state.logs,
  tree: (state) => state.tree,
};
