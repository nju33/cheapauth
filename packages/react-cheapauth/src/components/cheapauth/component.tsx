import React from 'react';
import originalStyled, {
  StyledComponentBase,
  ThemedBaseStyledInterface,
} from 'styled-components';
import {
  CheapauthThemeStruct,
  CheapauthComponentProps,
  CheapauthComponentState,
} from './interfaces';
import Password from '../../entities/password';
import {init, handleAuthentication} from './use-cases';

const component = ({} as unknown) as {
  root: StyledComponentBase<'div', {}>;
};

export class Cheapauth extends React.PureComponent<
  CheapauthComponentProps,
  CheapauthComponentState
> {
  public state: CheapauthComponentState = {
    password: undefined,
    approval: false,
    showForm: false,
    error: false,
  };

  public inputRef = React.createRef<HTMLInputElement>();

  public componentDidMount() {
    const answer = new Password(this.props.password);

    const approved = init(answer);

    this.setState({
      password: answer,
      approval: approved,
      showForm: !approved,
    });

    if (this.inputRef.current !== null) {
      this.inputRef.current.focus();
    }
  }

  public onSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    const input = this.inputRef.current;
    if (input === null) {
      return;
    }

    if (this.state.password === undefined) {
      return;
    }

    const approval = handleAuthentication(this.state.password, input.value);

    if (!approval) {
      this.setState({
        ...this.state,
        error: true,
        errorMessage: 'パスワードが違います',
      });
      return;
    }

    this.setState({approval});
  };

  public render(): JSX.Element {
    return (
      <>
        <component.root
          theme={this.props.theme}
          data-approval={this.state.approval}
          data-testid="cheapauth--root"
        >
          <div className="cheapauth--document">
            <section className="cheapauth--section" aria-labelledby="cheapauth">
              <header className="cheapauth--header">
                <h3 className="cheapauth--title" data-testid="cheapauth--title">
                  {this.props.title}
                </h3>
              </header>
              <div>
                <form
                  className="cheapauth--form"
                  data-testid="cheapauth--form"
                  onSubmit={this.onSubmit}
                >
                  <div className="cheapauth--row">
                    <input
                      ref={this.inputRef}
                      type="password"
                      className="cheapauth--input"
                      data-testid="cheapauth--input"
                    />
                    {this.state.error && (
                      <div
                        className="cheapauth--error-message"
                        data-testid="cheapauth--error-message"
                        aria-live="assertive"
                      >
                        <small>{this.state.errorMessage}</small>
                      </div>
                    )}
                  </div>
                  <div className="cheapauth--row">
                    <button
                      className="cheapauth--submit"
                      data-testid="cheapauth--submit"
                    >
                      {this.props.submitLabel}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </component.root>
        {this.props.children}
      </>
    );
  }
}

export default Cheapauth;

const styled = originalStyled as ThemedBaseStyledInterface<
  CheapauthThemeStruct
>;
component.root = styled.div`
  position: relative;
  z-index: 999999999;

  &[data-approval='true'] {
    display: none;
  }

  .cheapauth--document {
    position: fixed;
    width: 150vw;
    height: 150vh;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
    background: ${props => props.theme.backgroundColor || '#f8f8f8'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .cheapauth--header {
    margin-left: 0.5em;
  }

  .cheapauth--section {
    width: 90vw;
  }

  .cheapauth--title {
    text-align: center;
    margin-bottom: 1.5em;
    font-size: 2em;
  }

  .cheapauth--form {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  }

  .cheapauth--row {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .cheapauth--input {
    font-size: 1em;
    height: 2.5em;
    width: 100%;
    padding: 0.5em 1em;
    box-sizing: border-box;
    border: none;
    box-shadow: 0 0 2px -1px rgba(0, 0, 0, 0.5);
  }

  .cheapauth--error-message {
    position: absolute;
    left: 0;
    bottom: -1.5em;
    color: #cb1b45;
    margin-left: 0.5em;
  }

  .cheapauth--submit {
    font-size: 1em;
    max-width: 55vw;
    width: 100%;
    height: 2.5em;
    padding: 0.5em 1em;
    box-sizing: border-box;
    cursor: pointer;
    border: none;
    background: ${props => props.theme.accentColor || '#2ea9df'};
    margin-top: 2em;
  }

  @media screen and (min-width: 758px) {
    .cheapauth--section {
      width: auto;
    }

    .cheapauth--title {
      text-align: left;
      margin-bottom: 0.5em;
      font-size: 1.2em;
    }

    .cheapauth--form {
      flex-direction: row;
      align-items: flex-start;
    }

    .cheapauth--input {
      width: 30em;
    }

    .cheapauth--submit {
      width: auto;
      margin-top: 0;
      margin-left: 0.5em;
    }
  }
`;
