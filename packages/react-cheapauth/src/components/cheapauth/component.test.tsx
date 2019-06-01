import React from 'react';
import {render, fireEvent, cleanup, RenderResult} from '@testing-library/react';
import 'jest-dom/extend-expect';
import {Cheapauth} from './component';
import 'cheapauth-jest/extend-expect';

describe('Cheapauth', () => {
  afterEach(cleanup);

  const password = 'password';
  const title = 'タイトル';
  const submitLabel = 'ログイン';

  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <Cheapauth password={password} title={title} submitLabel={submitLabel} />,
    );
  });

  it('is rendered with text of props into right place', () => {
    expect(renderResult).toBeTitleTextContent(title);
    expect(renderResult).toBeSubmitTextContent(submitLabel);
  });

  it('is input password is incorrect', () => {
    const incorrectPassword = 'passworddd';

    expect(renderResult.container.firstChild).toMatchSnapshot();
    expect(renderResult).not.toBeApproved();

    // to fire the submit event
    const input = renderResult.queryByTestId('cheapauth--input');
    (input as HTMLInputElement).value = incorrectPassword;
    fireEvent.submit(renderResult.queryByTestId(
      'cheapauth--form',
    ) as HTMLFormElement);

    expect(renderResult.container.firstChild).toMatchSnapshot();
    expect(renderResult).toBeErrorMessageTextContent('パスワードが違います');
    expect(renderResult).not.toBeApproved();
  });

  test('is input password is correct', () => {
    expect(renderResult.container.firstChild).toMatchSnapshot();
    expect(renderResult).not.toBeApproved();

    // to fire the submit event
    const input = renderResult.queryByTestId('cheapauth--input');
    (input as HTMLInputElement).value = password;
    fireEvent.submit(renderResult.queryByTestId(
      'cheapauth--form',
    ) as HTMLFormElement);

    expect(renderResult.container.firstChild).toMatchSnapshot();
    expect(renderResult).toBeApproved();
  });
});
