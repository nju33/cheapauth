import {RenderResult} from '@testing-library/react';
import Vue from 'vue';
import {Wrapper} from '@vue/test-utils';
import TestId from './constants/testid';

export type CheapauthRenderResult = RenderResult | Wrapper<Vue>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeTitleTextContent(text: string): R;
      toBeSubmitTextContent(text: string): R;
      toBeErrorMessageTextContent(text: string): R;
      toBeApproved(): R;
    }
  }
}

const isReactTest = (
  renderResult: CheapauthRenderResult,
): renderResult is RenderResult => {
  return Object.prototype.hasOwnProperty.call(renderResult, 'asFragment');
};

const pass = {
  pass: true,
  message: '',
};

const toBeOneTextContent = (testid: TestId) => (
  renderResult: CheapauthRenderResult,
  text: string,
): jest.CustomMatcherResult => {
  if (isReactTest(renderResult)) {
    const {queryByTestId} = renderResult;

    const targetElement = queryByTestId(testid);
    if (targetElement === null) {
      return {
        pass: false,
        message: () => {
          return `expected to have the element \`[data-testid='${testid}']\``;
        },
      };
    }

    if (targetElement.textContent !== text) {
      return {
        pass: false,
        message: () => {
          return `expected to have the element \`[data-testid='${testid}']{${
            targetElement.textContent
          }}\``;
        },
      };
    }
  } else {
    const titleWrapper = renderResult.find(`[data-testid='${testid}']`);
    const expectedText = titleWrapper.text();

    if (!(titleWrapper.exists() && expectedText === text)) {
      return {
        pass: false,
        message: () => {
          return `expected to have the element \`[data-testid='${testid}']{${expectedText}}\``;
        },
      };
    }
  }

  return pass;
};

expect.extend({
  toBeTitleTextContent: toBeOneTextContent(TestId.title),
  toBeSubmitTextContent: toBeOneTextContent(TestId.submit),
  toBeErrorMessageTextContent: toBeOneTextContent(TestId.errorMessage),
  toBeApproved(renderResult: CheapauthRenderResult): jest.CustomMatcherResult {
    if (isReactTest(renderResult)) {
      const targetElement = renderResult.queryByTestId(TestId.root);
      if (targetElement === null) {
        return {
          pass: false,
          message: () => {
            return `expected to have to element \`[data-testid='${
              TestId.root
            }']\``;
          },
        };
      }

      if (targetElement.dataset.approval !== 'true') {
        return {
          pass: false,
          message: () => {
            return `expected to have to element \`[data-testid='${
              TestId.root
            }'][data-approval='true']\``;
          },
        };
      }
    } else {
      const titleWrapper = renderResult.find(`[data-testid='${TestId.root}']`);
      const approval = titleWrapper.attributes()['data-approval'];

      if (!(titleWrapper.exists() && approval === 'true')) {
        return {
          pass: false,
          message: () => {
            return `expected to have to element \`[data-testid='${
              TestId.root
            }'][data-approval='true']\``;
          },
        };
      }
    }

    return pass;
  },
});
