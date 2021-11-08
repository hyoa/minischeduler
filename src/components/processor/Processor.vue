<template>
  <div class="shadow-lg rounded px-2 py-2">
    <h2 class="text-2xl">Processor</h2>
    <div>
      <div
        v-for="queue in processor.getQueues()" :key="queue"
        class="border border-gray-700 my-4"
      >
        <div class="border-b border-gray-700">
          {{ queue.id }}
          <span v-if="queue.getActiveJobProgression() != null">
            - {{ queue.getActiveJobProgression() }} %
          </span>
        </div>
        <div class="flex">
          <div
            v-for="job in queue.getJobs()" :key="job"
            class="bg-pink-500 text-white p-2"
          >
           {{ job.owner }} - {{ job.externalId }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  mounted() {
    setInterval(() => {
      this.$store.getters.processor.runQueues();
    }, 100);
  },
  computed: {
    processor() {
      return this.$store.getters.processor;
    },
  },
})
export default class ProcessorComponent extends Vue {}
</script>
