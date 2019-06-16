import React from 'react';
import {render} from 'react-dom';
import Cheapauth from '../src';

const App: React.FC = () => {
  const reset = React.useCallback(() => {
    localStorage.clear();
    location.reload();
  }, []);

  return (
    <Cheapauth
      icon="https://avatars3.githubusercontent.com/u/15901038?s=460&v=4"
      password="password"
      label="パスワード"
      submitLabel="ログイン"
    >
      <button onClick={reset}>reset</button>
    </Cheapauth>
  );
};

render(<App />, document.getElementById('sandbox'));
