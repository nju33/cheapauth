# vue-cheapauth

[![vue-cheapauth](https://badgen.net/badge//nju33,cheapauth/000?icon=github&list=1)](https://github.com/nju33/cheapauth)
[![npm:version](https://badgen.net/npm/v/vue-cheapauth?icon=npm&label=)](https://www.npmjs.com/package/vue-cheapauth)

## Prepare

Should add `vue-cheapauth` into current project using by the npm or yarn.

```sh
yarn add vue-cheapauth
# npm i vue-cheapauth
```

## Usage

Example of use in the below.

```html
<template>
  <with-cheaauth
    :password="password"
    title="Authentication"
    submitLabel="Login"
  >
    <your-app-root />
  </with-cheapauth>
</template>

<script>
import cheapauth from 'vue-cheapauth';
import yourAppRoot from '...';
import 'vue-cheapauth/cheapauth.css';

export default {
  components: {
    'with-cheapauth': cheapauth,
    'your-app-root': yourAppRoot
  },
  data() {
    return {
      password: process.env.LOGIN_PASSWORD
    }
  }
}
</script>
```

This example is case of in the NuxtJS. Not only `vue-cheapauth` but also `vue-cheapauth/cheapauth.css` will be needed for styling.

[![Edit @example/vue-cheapauth](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/nju33/cheapauth/tree/%40example%2Fvue-cheapauth/?fontsize=14)

### Properties

The component `with-cheapauth` is required three properties `password`, `title` and `submitLabel`. `title` and `submitLabel` is just become to the text of title and button of authentication form.
`password` is used for comparing that an user input one.
