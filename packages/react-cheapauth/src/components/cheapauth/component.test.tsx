import React from 'react';
import {render, fireEvent, cleanup, RenderResult} from 'react-testing-library';
import 'jest-dom/extend-expect';
import {Cheapauth} from './component';

describe('Cheapauth', () => {
  afterEach(cleanup);

  const password = 'password';
  const title = 'タイトル';
  const submitLabel = 'ログイン';

  let utils: RenderResult;

  beforeEach(() => {
    utils = render(
      <Cheapauth password={password} title={title} submitLabel={submitLabel} />,
    );
  });

  test("when input value is incorrectly, not become attribute to `[data-approval='true']`", () => {
    const incorrectPassword = 'passworddd';

    expect(utils.container.firstChild).toMatchSnapshot();

    expect(
      (utils.queryByTestId('cheapauth-root') as HTMLDivElement).dataset
        .approval,
    ).toBe('false');

    const input = utils.queryByTestId('input');
    expect(input).toBeTruthy();

    (input as HTMLInputElement).value = incorrectPassword;
    expect(utils.queryByDisplayValue(incorrectPassword)).toBeTruthy();

    fireEvent.submit(utils.queryByTestId('form') as HTMLFormElement);

    expect(utils.container.firstChild).toMatchSnapshot();
    expect(utils.queryByTestId('error-message')).toBeTruthy();
    expect(utils.queryByTestId('error-message')).toHaveTextContent(
      'パスワードが違います',
    );

    expect(
      (utils.queryByTestId('cheapauth-root') as HTMLDivElement).dataset
        .approval,
    ).toBe('false');
  });

  test('props texts is rendered correctly', () => {
    expect(utils.queryByText(title)).toBeTruthy();
    expect(utils.queryByText(submitLabel)).toBeTruthy();
  });

  test("when input value is correctly, become attribute to `[data-approval='true']`", () => {
    expect(utils.container.firstChild).toMatchSnapshot();

    expect(
      (utils.queryByTestId('cheapauth-root') as HTMLDivElement).dataset
        .approval,
    ).toBe('false');

    const input = utils.queryByTestId('input');
    expect(input).toBeTruthy();

    (input as HTMLInputElement).value = password;
    expect(utils.queryByDisplayValue(password)).toBeTruthy();

    fireEvent.submit(utils.queryByTestId('form') as HTMLFormElement);

    expect(utils.container.firstChild).toMatchSnapshot();
    expect(utils.queryByTestId('error-message')).toBeFalsy();

    expect(
      (utils.queryByTestId('cheapauth-root') as HTMLDivElement).dataset
        .approval,
    ).toBe('true');
  });
});
