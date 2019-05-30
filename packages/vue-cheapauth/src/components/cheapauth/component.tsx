import Vue, {CreateElement, VNode} from 'vue';
import Component from 'vue-class-component';
import styled from 'vue-styled-components';
import Password from '../../entities/password';
import {init, handleAuthentication} from './use-cases';

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
declare global {
  namespace JSX {
    // @ts-ignore
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Root = styled.div`
  position: relative;
  z-index: 999999999;

  &[data-approval='true'] {
    display: none;
  }

  > div {
    position: fixed;
    width: 150vw;
    height: 150vh;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
    background: #f8f8f8;
    /* background: ${props => props.theme.backgroundColor || '#f8f8f8'}; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  [data-class='header'] {
    margin-left: 0.5em;
  }

  [data-class='section'] {
    width: 90vw;
  }

  [data-class='title'] {
    text-align: center;
    margin-bottom: 1.5em;
    font-size: 1.5em;
  }

  [data-class='form'] {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  }

  [data-class='row'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  [data-class='input'] {
    font-size: 1em;
    height: 2.5em;
    width: 100%;
    padding: 0.5em 1em;
    box-sizing: border-box;
    border: none;
    box-shadow: 0 0 2px -1px rgba(0, 0, 0, 0.5);
  }

  [data-class='error-message'] {
    position: absolute;
    bottom: -1.5em;
    color: #cb1b45;
    margin-left: 0.5em;
  }

  [data-class='submit'] {
    font-size: 1em;
    max-width: 55vw;
    width: 100%;
    height: 2.5em;
    padding: 0.5em 1em;
    box-sizing: border-box;
    cursor: pointer;
    border: none;
    background: #2ea9df;
    /* background: ${props => props.theme.accentColor || '#2ea9df'}; */
    margin-top: 1.5em;
  }

  @media screen and (min-width: 758px) {
    [data-class='section'] {
      width: auto;
    }

    [data-class='title'] {
      text-align: left;
      margin-bottom: 0.5em;
      font-size: 1.2em;
    }

    [data-class='form'] {
      flex-direction: row;
      align-items: flex-start;
    }

    [data-class='input'] {
      width: 30em;
    }

    [data-class='submit'] {
      width: auto;
      margin-top: 0;
      margin-left: 0.5em;
    }
  }
`;

/* eslint-disable new-cap, @typescript-eslint/explicit-member-accessibility */
@Component({
  props: {
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    submitLabel: {
      type: String,
      required: true,
    },
  },
})
export class Cheapauth extends Vue {
  // public answer: Password = new Password(Math.random().toString());
  public approval = false;

  public input = '';

  public error = false;

  public errorMessage = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onChange = (ev: any) => {
    ev.preventDefault();

    this.input = (ev.target as HTMLInputElement).value;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onSubmit(ev: any) {
    ev.preventDefault();

    const approval = handleAuthentication(
      new Password(this.$props.password),
      this.input,
    );
    if (!approval) {
      this.error = true;
      this.errorMessage = 'パスワードが異なります。';
      return;
    }

    this.approval = true;
  }

  public mounted() {
    const answer = new Password(this.$props.password);
    this.approval = init(answer);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public render(h: CreateElement): VNode {
    return (
      <Root data-testid="cheapauth-root" data-approval={this.approval}>
        <div>
          <section data-class="section" aria-labelledby="cheapauth">
            <header data-class="header">
              <h3 data-class="title">{this.$props.title}</h3>
            </header>
            <div>
              <form
                data-class="form"
                data-testid="form"
                onSubmit={this.onSubmit}
              >
                <div data-class="row">
                  <input
                    type="password"
                    data-class="input"
                    data-testid="input"
                    value={this.input}
                    onChange={this.onChange}
                  />
                  {this.error && (
                    <div data-class="error-message" data-testid="error-message">
                      <small>{this.errorMessage}</small>
                    </div>
                  )}
                </div>
                <div data-class="row">
                  <button data-class="submit">{this.$props.submitLabel}</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </Root>
    );
  }
}
