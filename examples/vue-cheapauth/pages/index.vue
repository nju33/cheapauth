<template>
  <div>
    <vue-cheapauth password="password" title="認証" submitLabel="ログインする" />
    <h2>{{message}}</h2>
  </div>
</template>

<script lang="ts">
// import IndexPage from './index';
// export default IndexPage;

import {CreateElement, VNode} from 'vue';
import {Component, Vue, Prop} from 'vue-property-decorator';
import Cheapauth from './_cheapauth';

@Component({
  components: {
    'vue-cheapauth': Cheapauth,
  }
})
export default class IndexPage extends Vue {
  public message = 'Hello from NuxtJS!';

  public mounted() {
    console.log(Cheapauth);
  }
}

</script>
