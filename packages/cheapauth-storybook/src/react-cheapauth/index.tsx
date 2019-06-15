import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text} from '@storybook/addon-knobs';
// import {action} from '@storybook/addon-actions';
import Ceapauth from 'react-cheapauth';
// import Button from '../components/Button';

const stories = storiesOf('react-cheapauth', module);

stories.addDecorator(withKnobs);

stories.add('Ceapauth', () => {
  const title = text('Title', '認証');

  (Ceapauth as any).options = {};

  return (
    <Ceapauth password="pass" title={title} submitLabel="ログイン">
      <span>hello</span>
    </Ceapauth>
  );
});
