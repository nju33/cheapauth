import {storiesOf} from '@storybook/vue';
import Cheapauth from 'vue-cheapauth';
import {withKnobs, text} from '@storybook/addon-knobs';
import 'vue-cheapauth/dist/module/index.css';

const stories = storiesOf('vue-cheapauth', module);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
stories.addDecorator(withKnobs as any);

stories.add('with-cheapauth', () => ({
  components: {
    'with-cheapauth': Cheapauth,
  },

  template: `
    <with-cheapauth password="pass" :title="title" submitLabel="ログイン">
      中身
    </with-cheapauth>`,
  data() {
    return {
      title: text('Title', '認証'),
    };
  },
  options: {},
}));
