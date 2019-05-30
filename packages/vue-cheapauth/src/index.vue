<template>
  <div class="root">
    <div>
      <section class="section" aria-labelledby="cheapauth">
        <header class="header">
          <h3 class="title">{{title}}</h3>
        </header>
        <div>
          <form
            class="form"
            data-testid="form"
            onSubmit={this.onSubmit}
          >
            <div class="row">
              <input
                type="password"
                class="input"
                data-testid="input"
                value={this.input}
                onChange={this.onChange}
              />
            </div>
            <div class="row">
              <button class="submit">{{submitLabel}}</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  console.log(123);
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
    background: '#f8f8f8';
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
    font-size: 1.5em;
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
    background: '#2ea9df';
    margin-top: 1.5em;
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
