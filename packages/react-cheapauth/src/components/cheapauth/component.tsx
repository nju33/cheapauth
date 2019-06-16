import React from 'react';
import originalStyled, {
  StyledComponentBase,
  ThemedBaseStyledInterface,
} from 'styled-components';
import {CheapauthThemeStruct} from './interfaces';
import {
  IInit,
  Init,
  ILogin,
  Login,
  CheapauthComponentProps,
  CheapauthComponentState,
} from 'cheapauth-core';

const component = ({} as unknown) as {
  root: StyledComponentBase<'div', {}>;
};

export class Cheapauth extends React.PureComponent<
  CheapauthComponentProps,
  CheapauthComponentState
> {
  public state: CheapauthComponentState = {
    approval: false,
    showForm: false,
    error: false,
  };

  public init: IInit = new Init(this.props.password);

  public login: ILogin = new Login(this.props.password);

  public inputRef = React.createRef<HTMLInputElement>();

  public get inputValue() {
    const inputElement = this.inputRef.current;
    if (inputElement === null) {
      return '';
    }

    return inputElement.value;
  }

  public componentDidMount() {
    const result = this.init.invoke();

    this.setState({
      approval: result.approval,
      showForm: !result.approval,
    });

    setTimeout(() => {
      if (this.inputRef.current !== null) {
        this.inputRef.current.focus();
      }
    }, 50);
  }

  public componentDidUpdate(prevProps: CheapauthComponentProps) {
    if (prevProps.password !== this.props.password) {
      this.init = new Init(this.props.password);
      this.login = new Login(this.props.password);
    }
  }

  public onSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    const approval = this.login.invoke(this.inputValue);

    if (!approval) {
      this.setState(({
        error: true,
        errorMessage: this.props.errorMessage || 'The password is incorrect',
      } as unknown) as CheapauthComponentState);
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
            {this.state.showForm && (
              <section
                className="cheapauth--section"
                aria-labelledby="cheapauth"
              >
                {this.props.icon && (
                  <header className="cheapauth--header">
                    <img src={this.props.icon} className="cheapauth--icon" />
                  </header>
                )}
                <div>
                  <form
                    className="cheapauth--form"
                    data-testid="cheapauth--form"
                    onSubmit={this.onSubmit}
                  >
                    <div className="cheapauth--row">
                      <label
                        className="cheapauth--label"
                        data-testid="cheapauth--label"
                      >
                        {this.props.label}
                      </label>
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
                      <div></div>
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
            )}
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
    background: ${props => props.theme.backgroundColor || '#e3e3e3'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .cheapauth--header {
    text-align: center;
    margin-top: -5em;
    margin-bottom: 2em;
  }

  .cheapauth--icon {
    width: 5em;
  }

  .cheapauth--section {
    width: 90vw;
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

  .cheapauth--row:nth-of-type(1) {
    align-items: flex-start;
  }

  .cheapauth--label {
    text-align: center;
    margin: 0.2em;
    text-align: left;
    font-size: 1em;
    color: #444;
  }

  .cheapauth--input {
    font-size: 1em;
    height: 2em;
    width: 100%;
    padding: 0.5em 1em;
    box-sizing: border-box;
    border: none;
    &:focus {
      outline-width: 1px;
      outline-offset: -3px;
    }
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
    height: 2em;
    padding: 0.3em 0.7em;
    box-sizing: border-box;
    cursor: pointer;
    border: none;
    background: ${props => props.theme.accentColor || '#fff'};
    margin-top: 2em;

    &:focus {
      outline-width: 1px;
      outline-offset: -3px;
    }
  }

  @media screen and (min-width: 758px) {
    .cheapauth--section {
      width: auto;
    }

    .cheapauth--row + .cheapauth--row {
      margin-top: 0.5em;
    }

    .cheapauth--row:nth-of-type(2) {
      flex-direction: row;
      text-align: right;
      justify-content: space-between;
    }

    .cheapauth--label {
      text-align: left;
      margin-bottom: 0.5em;
      font-size: 0.9em;
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
