<template>
  <div class="shadow-lg mr-6 rounded px-2 py-2">
    <div>
      <h2 class="text-2xl">Scheduler</h2>
      <div class="text-gray-500">
        <div>
          <span v-if="scheduler.isRunning">running</span>
          <span v-else>paused</span>
        </div>
        <div class="text-sm italic">
          <div>{{ scheduler.rotation }} seconds </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div>{{ scheduler.queues.length }} queues managed</div>
      <div class="pl-4">
        <div v-for="queue in scheduler.queues" :key="queue">
          <span
            :class="[ isActiveQueue(queue) ? 'bg-white text-black' : 'bg-white text-gray-300' ]"
          >
            {{ queue }}
          </span>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div v-for="log in logs" :key="log">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  computed: {
    scheduler() {
      return this.$store.getters.scheduler;
    },
    logs() {
      return this.$store.getters.logs;
    },
  },
  methods: {
    isActiveQueue(queueName: string) {
      return this.scheduler.getCurrentQueue() === queueName;
    },
  },
})

export default class SchedulerComponent extends Vue {}
</script>
