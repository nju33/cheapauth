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
    error: false,
  };

  public inputRef = React.createRef<HTMLInputElement>();

  public componentDidMount() {
    const answer = new Password(this.props.password);

    this.setState({
      password: answer,
      approval: init(answer),
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
        error: true,
        errorMessage: 'パスワードが違います',
        approval: false,
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
          <div>
            <section className="section" aria-labelledby="cheapauth">
              <header className="header">
                <h3 className="title" data-testid="cheapauth--title">
                  {this.props.title}
                </h3>
              </header>
              <div>
                <form
                  className="form"
                  data-testid="cheapauth--form"
                  onSubmit={this.onSubmit}
                >
                  <div className="row">
                    <input
                      ref={this.inputRef}
                      type="password"
                      className="input"
                      data-testid="cheapauth--input"
                    />
                    {this.state.error && (
                      <div
                        className="error-message"
                        data-testid="cheapauth--error-message"
                        aria-live="assertive"
                      >
                        <small>{this.state.errorMessage}</small>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <button className="submit" data-testid="cheapauth--submit">
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

  > div {
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

  .header {
    margin-left: 0.5em;
  }

  .section {
    width: 90vw;
  }

  .title {
    text-align: center;
    margin-bottom: 1.5em;
    font-size: 2em;
  }

  .form {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  }

  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .input {
    font-size: 1em;
    height: 2.5em;
    width: 100%;
    padding: 0.5em 1em;
    box-sizing: border-box;
    border: none;
    box-shadow: 0 0 2px -1px rgba(0, 0, 0, 0.5);
  }

  .error-message {
    position: absolute;
    left: 0;
    bottom: -1.5em;
    color: #cb1b45;
    margin-left: 0.5em;
  }

  .submit {
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
    .section {
      width: auto;
    }

    .title {
      text-align: left;
      margin-bottom: 0.5em;
      font-size: 1.2em;
    }

    .form {
      flex-direction: row;
      align-items: flex-start;
    }

    .input {
      width: 30em;
    }

    .submit {
      width: auto;
      margin-top: 0;
      margin-left: 0.5em;
    }
  }
`;
