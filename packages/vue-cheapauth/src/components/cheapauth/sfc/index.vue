<template>
  <div class="root" data-testid="cheapauth--root" :data-approval="approval">
    <div>
      <section class="section" aria-labelledby="cheapauth">
        <header class="header">
          <h3 class="title" data-testid="cheapauth--title">{{title}}</h3>
        </header>
        <div>
          <form
            class="form"
            data-testid="cheapauth--form"
            @submit.stop.prevent="onSubmit"
          >
            <div class="row">
              <input
                v-focus
                type="password"
                class="input"
                data-testid="cheapauth--input"
                v-model="input"
              />
              <div
                v-if="error"
                class="error-message"
                data-testid="cheapauth--error-message"
                aria-live="assertive"
              >
                <small>{{errorMessage}}</small>
              </div>
            </div>
            <div class="row">
              <button class="submit" data-testid="cheapauth--submit">{{submitLabel}}</button>
            </div>
          </form>
        </div>
      </section>
    </div>

    <template v-if="approval">
      <slot />
    </template>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Model} from 'vue-property-decorator';
import {
  CheapauthComponentProps,
  CheapauthComponentAuthorizationState,
  CheapauthComponentFalsyFormState
} from '../interfaces';
import {Password, PasswordImpl} from '../../../entities/password';
import {init, handleAuthentication} from '../use-cases';

@Component({
  directives: {
    focus: {
      inserted: el => {
        el.focus();
      }
    }
  }
})
export default class extends Vue
  implements
    CheapauthComponentProps,
    CheapauthComponentAuthorizationState,
    CheapauthComponentFalsyFormState {
  @Prop(String) readonly password!: string;
  get answer(): PasswordImpl {
    return new Password(this.password);
  }

  @Prop(String) readonly title!: string;
  @Prop(String) readonly submitLabel!: string;

  readonly input: string = "";

  approval: boolean = false;
  error: boolean = false;
  errorMessage: string = "";

  onSubmit() {
    const approval = handleAuthentication(this.answer, this.input);
    if (!approval) {
      this.error = true;
      this.errorMessage = "パスワードが違います";
      return;
    }

    this.approval = true;
  }

  mounted() {
    this.approval = init(this.answer);
  }
}

</script>

<style scoped="true">
  .root {
    position: relative;
    z-index: 999999999;
  }

  .root[data-approval='true'] {
    display: none;
  }

  .root > div {
    position: fixed;
    width: 150vw;
    height: 150vh;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
    background: #f8f8f8;
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
    background: #2ea9df;
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
</style>
