import Vue from 'vue';
import {shallowMount, Wrapper} from '@vue/test-utils';
// @ts-ignore
import Cheapauth from './sfc/index.vue';
import 'cheapauth-jest/extend-expect';

describe('Cheapauth', () => {
  const password = 'password';
  const title = 'タイトル';
  const submitLabel = 'ログインする';

  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(Cheapauth, {
      propsData: {
        password,
        title,
        submitLabel,
      },
    });
  });

  it('is rendered with text of props into right place', () => {
    expect(wrapper).toBeTitleTextContent(title);
    expect(wrapper).toBeSubmitTextContent(submitLabel);
  });

  it('is input password is incorrect', () => {
    const incorrectPassword = 'passworddd';

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper).not.toBeApproved();

    // to fire the submit event
    wrapper.setData({input: incorrectPassword});
    wrapper.find(`[data-testid='cheapauth--form']`).trigger('submit');

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper).toBeErrorMessageTextContent('パスワードが違います');
    expect(wrapper).not.toBeApproved();
  });

  it('is input password is correct', () => {
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper).not.toBeApproved();

    // to fire the submit event
    wrapper.setData({input: password});
    wrapper.find(`[data-testid='cheapauth--form']`).trigger('submit');

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper).toBeApproved();
  });
});
