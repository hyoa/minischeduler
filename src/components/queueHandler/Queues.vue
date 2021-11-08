<template>
  <div class="shadow-lg rounded px-2 py-2">
    <div>
      <h2 class="text-2xl">
        Queues
        <font-awesome-icon
          icon="plus-square"
          @click="toggleCreateQueue = !toggleCreateQueue"
          class="cursor-pointer"
        />
      </h2>
    </div>
    <div v-if="toggleCreateQueue">
        <form @submit.prevent="createQueue">
          <input
            class="appearance-none block w-full text-gray-darker border border-grey-lighter
            py-2 px-3 leading-tight rounded-sm focus:outline-none focus:shadow-md"
            type="text"
            v-model="addQueue.name"
          >
          <button class="mt-2 bg-blue-500 hover:bg-blue-300
          p-1 rounded text-white">Add queue</button>
        </form>
    </div>
    <div class="flex flex-wrap">
      <queue-component v-for="queue in queues" :queue="queue" :key="queue.id"></queue-component>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import uniqid from 'uniqid';
import Queue from '@/core/queue/queue';
import MutationTypes from '@/store/mutations/mutation-types';
import QueueComponent from './Queue.vue';

@Options({
  data() {
    return {
      toggleCreateQueue: false,
      addQueue: {
        name: null,
      },
    };
  },
  components: {
    QueueComponent,
  },
  computed: {
    queues() {
      return this.$store.getters.queues;
    },
  },
  methods: {
    createQueue() {
      this.$store.commit(MutationTypes.ADD_QUEUE, new Queue(uniqid(), this.addQueue.name));
      this.addQueue.name = null;
      this.toggleCreateQueue = false;
    },
  },
})

export default class Queues extends Vue {}
</script>
