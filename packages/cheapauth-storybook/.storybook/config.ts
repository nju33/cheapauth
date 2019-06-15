import {configure as reactConfigure} from '@storybook/react';
import {configure as vueConfigure} from '@storybook/vue';

const reactReq = require.context('../src', true, /\.tsx?$/);
reactConfigure(() => {
  reactReq.keys().forEach(reactReq);
}, module);

// const vueReq = require.context('../src/vue-cheapauth', true, /\.tsx?$/);
// vueConfigure(() => {
//   vueReq.keys().forEach(vueReq);
// }, module);
