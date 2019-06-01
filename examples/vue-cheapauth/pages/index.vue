<template>
  <div>
    <with-cheapauth password="password" title="認証" submitLabel="ログインする">
      <h2>{{message}}</h2>
    </with-cheapauth>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Cheapauth from 'vue-cheapauth';

@Component({
  components: {
    'with-cheapauth': Cheapauth,
  }
})
export default class IndexPage extends Vue {
  public readonly message = 'Hello from NuxtJS!';
}

</script>
