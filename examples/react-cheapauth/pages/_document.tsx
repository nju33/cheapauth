import React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
  DefaultDocumentIProps,
} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

type GetInitialPropsReturnType =
  | DefaultDocumentIProps
  | Promise<DefaultDocumentIProps>;

export default class AppDocument extends Document<{
  styleTags: React.ReactElement;
}> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public static getInitialProps({
    renderPage,
  }: NextDocumentContext<
    Record<string, string | string[]>
  >): GetInitialPropsReturnType {
    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App: any): any => (props: any): any =>
        sheet.collectStyles(<App {...props} />),
    );

    const styleTags = sheet.getStyleElement();

    return ({...page, styleTags} as unknown) as GetInitialPropsReturnType;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  public render(): JSX.Element {
    return (
      <html lang="ja">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
