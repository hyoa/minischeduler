/* eslint-disable */

import { Store } from 'vuex';
import { State } from './store/state';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  import Vue from "vue";
  export default Vue;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
