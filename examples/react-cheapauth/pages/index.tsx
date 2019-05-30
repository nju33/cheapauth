import React from 'react';
import Cheapauth from 'react-cheapauth';

interface IndexPageInitialProps {
  isClient: boolean;
}

interface NextProcess {
  browser: boolean;
}

export class IndexPage extends React.Component<IndexPageInitialProps> {
  public static getInitialProps(): IndexPageInitialProps {
    if (typeof window === 'undefined') {
      return {isClient: false};
    }

    return {isClient: true};
  }

  public isBrowser(): boolean {
    return ((process as unknown) as NextProcess).browser;
  }

  public render(): JSX.Element {
    return (
      <div>
        <Cheapauth password="password" title="認証" submitLabel="ログイン">
          <div>隠された要素</div>
        </Cheapauth>
      </div>
    );
  }
}

export default IndexPage;
