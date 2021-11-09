<template>
  <div
    class="flex-grow border border-gray-700 rounded w-1/5 mx-2 my-2"
    :class="[ isActive ? 'opacity-100' : 'opacity-60' ]"
  >
    <div>
      <div class="flex justify-between items-center px-4" :class="bgColor">
        <div>{{ queue.name }}</div>
        <font-awesome-icon
          icon="plus-square"
          @click="addItemToQueue"
          class="cursor-pointer"
        />
      </div>
      <hr v-if="queue.items.length > 0" class="border border-gray-400" />
      <draggable :list="this.queue.items">
        <div
          v-for="item in this.queue.items"
          :key="item.id"
          class="cursor-move hover:bg-gray-200 p-2"
        >
          {{ item.id }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import { VueDraggableNext } from 'vue-draggable-next';

import Item from '@/core/queue/item';
import MutationTypes from '@/store/mutations/mutation-types';

import Queue from '../../core/queue/queue';

@Options({
  components: {
    draggable: VueDraggableNext,
  },
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
        {
          item: new Item((this.currentItemIndex).toString(), this.queue.color),
          queueName: this.queue.name,
        },
      );
    },
  },
  computed: {
    bgColor(): string {
      return `bg-${this.queue.color}-500`;
    },
    isActive(): boolean {
      return this.$store.getters.activeQueue === this.queue.name;
    },
  },
})
export default class QueueComponent extends Vue {}
</script>
