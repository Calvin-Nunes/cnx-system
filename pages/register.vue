<template>
  <div class="page-wrapper">
    <section>
      <div class="form-holder">
        <form>
          <fieldset>
            <cnx-input v-model="username"></cnx-input>
            <cnx-input v-model="email"></cnx-input>
            <cnx-input v-model="password" secure="true"></cnx-input>
          </fieldset>
          <cnx-button
            caption="Register"
            theme="success"
            size="big"
            :onTap="doRegister"
            :disabled="isRegistering"
            style="margin: 12px auto"
          ></cnx-button>
          <p class="validation-error-message">{{ error }}</p>
        </form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LibUtils from 'static/libraries/libUtils'

export default Vue.extend({
  data: () => {
    return {
      username: '',
      email: '',
      password: '',
      error: '',
      isRegistering: false,
    }
  },

  methods: {
    doRegister: function () {
      if (this.validData()) {
        this.isRegistering = true
        let newUser = {
          username: this.username,
          email: this.email,
          password: this.password,
        }

        let apiRegisterEndpoint = ''

        this.$axios
          .put(apiRegisterEndpoint, newUser)
          .then(function (result) {})
          .catch(function (error) {})
      }
    },

    validData(): boolean {
      if (LibUtils.isEmpty(this.username)) {
        this.error = 'Username must be filled.'
        return false
      }
      if (LibUtils.isEmpty(this.email)) {
        this.error = 'Email must be filled.'
        return false
      } else if (LibUtils.isValidEmail(this.email)) {
        this.error = 'Email is not valid.'
        return false
      }

      if (LibUtils.isEmpty(this.password)) {
        this.error = 'Password must be filled'
        return false
      } else {
        if (this.password.length < 6) {
          this.error = 'Password must have at least 6 characters'
        } else {
          if (/\d/.test(this.password) === false) {
            this.error = 'Password must have at least 1 number'
          }
        }
      }

      return true
    },
  },
})
</script>

<style lang="scss" scoped>
.form-holder {
  width: 70%;
  max-width: 540px;
  margin: 25px auto 12px auto;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid var(--soft-border-color);
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);
}

.form-holder fieldset {
  border: none;
}

.validation-error-message {
  color: var(--color-danger);
  font-size: 18px;
}
</style>
