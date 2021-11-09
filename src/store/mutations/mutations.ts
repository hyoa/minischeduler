import { MutationTree } from 'vuex';

import MutationTypes from './mutation-types';
import { State } from '../state';

import Queue from '@/core/queue/queue';
import Item from '@/core/queue/item';
import Processor from '@/core/processor/processor';
import Step from '@/core/processor/step';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const resetTree = () => ([
  new Step(1, 'Start', ''),
  new Step(2, 'Check slot', ''),
  new Step(3, 'Check job', ''),
  new Step(4, 'Send job', ''),
  new Step(5, 'Switch queue', ''),
]);

export interface AddItemToQueuePayload {
  queueName: string,
  item: Item
}

export type Mutations<S = State> = {
  [MutationTypes.ADD_QUEUE](state: S, payload: Queue): void,
  [MutationTypes.ADD_ITEM_TO_QUEUE](state: S, payload: AddItemToQueuePayload): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_QUEUE](state: State, payload: Queue) {
    state.queues.push(payload);
    state.scheduler.addToQueue(payload.name);
  },
  [MutationTypes.ADD_ITEM_TO_QUEUE](state: State, payload: AddItemToQueuePayload) {
    const queueIndex = state.queues.findIndex((q) => q.name === payload.queueName);

    if (queueIndex >= 0) {
      state.queues[queueIndex].addItem(payload.item);
    }
  },
  async [MutationTypes.RUN](state: State) {
    state.tree = resetTree();
    const currentQueue = state.scheduler.getCurrentQueue();

    if (!currentQueue) {
      return;
    }
    state.tree[0].status = 'step-primary';

    state.logs = [];
    state.logs.push(`Starting process for ${currentQueue}`);
    state.scheduler.isRunning = true;

    await delay(500);
    const hasEmptySlot = state.processor.hasEmptySlot();

    if (hasEmptySlot) {
      const queue = state.queues.find((q) => q.name === currentQueue);
      state.logs.push('Processor has empty slot');
      state.tree[1].status = 'step-primary';

      await delay(200);
      const item = queue?.getItemWithHighestPriority();

      if (item) {
        state.tree[2].status = 'step-primary';
        state.tree[3].status = 'step-primary';
        state.logs.push(`Queue "${queue?.name}" send item "${item.id}" to processor`);
        const job = Processor.createJob(item.id, currentQueue, item.color);
        state.processor.addJob(job);
      } else {
        state.tree[2].status = 'step-warning';
        state.logs.push(`Queue "${queue?.name}" has no item to send`);
      }

      state.tree[4].status = 'step-primary';
      state.logs.push('Changing current queue for scheduler');
      state.scheduler.changeCurrentQueue();
    } else {
      state.tree[1].status = 'step-error';
      state.logs.push('Processor has no empty slot');
    }

    state.logs.push('End of process');
    state.scheduler.isRunning = false;
  },
};
