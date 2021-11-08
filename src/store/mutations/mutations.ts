import { MutationTree } from 'vuex';

import MutationTypes from './mutation-types';
import { State } from '../state';

import Queue from '@/core/queue/queue';
import Item from '@/core/queue/item';
import Processor from '@/core/processor/processor';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
    state.tree = {};
    const currentQueue = state.scheduler.getCurrentQueue();

    if (!currentQueue) {
      return;
    }

    state.logs = [];
    state.logs.push(`Starting process for ${currentQueue}`);
    state.scheduler.isRunning = true;
    state.tree = {
      label: `Starting process for ${currentQueue}`,
    };

    await delay(500);
    const hasEmptySlot = state.processor.hasEmptySlot();

    state.tree = {
      label: 'Check slot',
    };
    if (hasEmptySlot) {
      const queue = state.queues.find((q) => q.name === currentQueue);
      state.logs.push('Processor has empty slot');

      await delay(200);
      const item = queue?.getItemWithHighestPriority();

      if (item) {
        state.logs.push(`Queue "${queue?.name}" send item "${item.id}" to processor`);
        const job = Processor.createJob(item.id, currentQueue);
        state.processor.addJob(job);
      } else {
        state.logs.push(`Queue "${queue?.name}" has no item to send`);
      }

      state.logs.push('Changing current queue for scheduler');
      state.scheduler.changeCurrentQueue();
    } else {
      state.logs.push('Processor has no empty slot');
    }

    state.logs.push('End of process');
    state.scheduler.isRunning = false;
  },
};
