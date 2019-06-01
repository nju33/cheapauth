# react-cheapauth

[![react-cheapauth](https://badgen.net/badge//nju33,cheapauth/000?icon=github&list=1)](https://github.com/nju33/cheapauth)

## Prepare

Should add `react-cheapauth` into current project using by the npm or yarn.

```sh
yarn add react-cheapauth
# npm i react-cheapauth
```

## Usage

Example of use in the below.

```jsx
import Cheapauth from 'vue-cheapauth';
import YourAppRoot from '...';

export default = () => {
  return (
    <Cheapauth
      password={process.env.LOGIN_PASSWORD}
      title="Authentication"
      submitLabel="Login"
    >
    </Cheapauth>
  )
}
```

### Properties

The component `Cheapauth` is required three properties `password`, `title` and `submitLabel`. `title` and `submitLabel` is just become to the text of title and button of authentication form.
`password` is used for comparing that an user input one.
