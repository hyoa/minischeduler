<template>
  <div>
    <div class="flex space-x-6 p-5">
      <section class="w-1/3">
        <queues />
      </section>
      <section class="w-1/3">
        <scheduler />
      </section>
      <section class="w-1/3">
        <processor />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Queues from './components/queueHandler/Queues.vue';
import Scheduler from './components/scheduler/Scheduler.vue';
import Processor from './components/processor/Processor.vue';
import MutationTypes from './store/mutations/mutation-types';

@Options({
  components: {
    Queues,
    Scheduler,
    Processor,
  },
  mounted() {
    setInterval(() => {
      this.$store.commit(MutationTypes.RUN);
    }, this.$store.getters.scheduler.rotation * 1000);
  },
})
export default class App extends Vue {}
</script>
