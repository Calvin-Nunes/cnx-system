<template>
	<div class="padded-content page-content">
		<section>
			<div class="center-content">
				<img src="~/assets/images/logo.png" alt="CNX System" class="page-content-image" width="100%" />
				<p class="page-description">Register now to access all features of CNX System</p>
			</div>
		</section>
		<section>
			<div class="form-holder">
				<form>
					<fieldset>
						<cnx-input v-model="username" label="Username" icon="fas fa-user"></cnx-input>
						<cnx-input v-model="email" label="Email" icon="fas fa-envelope"></cnx-input>
						<cnx-input v-model="password" secure="true" label="Password" icon="fas fa-lock"></cnx-input>
					</fieldset>
				</form>
				<cnx-button caption="Register" theme="success" size="big" :onTap="doRegister" :disabled="isRegistering" style="margin: 12px auto"></cnx-button>
				<p v-if="error.length" class="validation-error-message">
					{{ error }}
				</p>
				<loadSpinner v-else-if="isRegistering" :loading="isRegistering"></loadSpinner>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import LibUtils from "static/libraries/libUtils";
import LoadSpinner from "@/components/LoadSpinner.vue";

export default Vue.extend({
	components: { loadSpinner: LoadSpinner },
	data: () => {
		return {
			username: "",
			email: "",
			password: "",
			error: "",
			isRegistering: false,
		};
	},

	created() {
		this.$store.dispatch("tooglePageFooter", false);
	},

	methods: {
		doRegister: function () {
			this.error = "";
			if (this.validData()) {
				this.isRegistering = true;
				let newUser = {
					username: this.username,
					email: this.email,
					password: this.password,
				};

				let apiRegisterEndpoint = "";

				this.$axios
					.put(apiRegisterEndpoint, newUser)
					.then(function (result) {})
					.catch(function (error) {});
			}
		},

		validData(): boolean {
			if (LibUtils.isEmpty(this.username)) {
				this.error = "Username must be filled.";
				return false;
			}
			if (LibUtils.isEmpty(this.email)) {
				this.error = "Email must be filled.";
				return false;
			} else if (LibUtils.isValidEmail(this.email)) {
				this.error = "Email is not valid.";
				return false;
			}

			if (LibUtils.isEmpty(this.password)) {
				this.error = "Password must be filled";
				return false;
			} else {
				if (this.password.length < 6) {
					this.error = "Password must have at least 6 characters";
				} else {
					if (/\d/.test(this.password) === false) {
						this.error = "Password must have at least 1 number";
					}
				}
			}

			return true;
		},
	},
});
</script>

<style lang="scss" scoped>
.form-holder {
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-wrap: nowrap;
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
	text-align: center;
}
</style>
