<template>
  <div class="flex-grow border border-gray-700 rounded w-1/5 mx-2 my-2">
    <div>
      <div class="flex justify-between items-center px-4">
        <div>{{ queue.name }}</div>
        <font-awesome-icon
          icon="plus-square"
          @click="addItemToQueue"
          class="cursor-pointer"
        />
      </div>
      <hr v-if="queue.items.length > 0" class="border border-gray-400" />
      <div v-for="item in queue.items" :key="item.id">{{ item.id }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import Item from '@/core/queue/item';
import MutationTypes from '@/store/mutations/mutation-types';

import Queue from '../../core/queue/queue';

@Options({
  props: {
    queue: Queue,
  },
  data() {
    return {
      toggleAddItem: false,
      currentItemIndex: 0,
    };
  },
  methods: {
    addItemToQueue() {
      this.currentItemIndex += 1;
      this.$store.commit(
        MutationTypes.ADD_ITEM_TO_QUEUE,
        { item: new Item((this.currentItemIndex).toString()), queueName: this.queue.name },
      );
    },
  },
})
export default class QueueComponent extends Vue {}
</script>
