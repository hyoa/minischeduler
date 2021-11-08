import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import { store, key } from './store';
import './assets/index.css';

library.add(faPlusSquare);

createApp(App)
  .use(store, key)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
