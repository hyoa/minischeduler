import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { mutations } from './mutations/mutations';
import { getters } from './getters/getters';
import { State } from './state';
import Scheduler from '@/core/scheduler/scheduler';
import Processor from '@/core/processor/processor';
import Step from '@/core/processor/step';

// define injection key
export const key: InjectionKey<Store<State>> = Symbol('main');

export const store = createStore<State>({
  state: {
    queues: [],
    scheduler: new Scheduler(),
    processor: new Processor(),
    logs: [],
    tree: [
      new Step(1, 'Start', ''),
      new Step(2, 'Check slot', ''),
      new Step(3, 'Check job', ''),
      new Step(4, 'Send job', ''),
      new Step(5, 'Switch queue', ''),
    ],
  },
  mutations,
  getters,
});
