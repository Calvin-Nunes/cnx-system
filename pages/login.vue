<template>
		<div class="page-content padded-content">
			<section>
				<div class="center-content">
					<img src="~/assets/images/logo.png" alt="CNX System" class="page-content-image" width="100%"/>
					<p class="page-title">Log In</p>
				</div>
			</section>
			<section>
				<div class="form-holder">
					<form>
						<fieldset>
							<cnx-input v-model="email" label="Email" icon="fas fa-envelope"></cnx-input>
							<cnx-input v-model="password" secure="true" label="Password" icon="fas fa-lock"></cnx-input>
						</fieldset>
					</form>
					<span><nuxt-link class='password-recovery-link' to='/password-recovery'>Forgot your password?</nuxt-link></span>
					<cnx-button caption="Log In" theme="success" size="big" :onTap="doRegister" :disabled="isLoggin" style="margin: 12px auto"></cnx-button>
					<p v-if="error.length" class="validation-error-message">
						{{ error }}
					</p>
					<loadSpinner v-else-if="isLoggin" :loading="isLoggin"></loadSpinner>
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
			email: "",
			password: "",
			error: "",
			isLoggin: false,
		};
	},

	created() {
		this.$store.dispatch("tooglePageFooter", false);
	},

	methods: {
		doRegister: function () {
			this.error = "";
			if (this.validData()) {
				this.isLoggin = true;
				let loginUser = {
					email: this.email,
					password: this.password,
				};

				let apiLoginEndpoint = "";

				this.$axios
					.put(apiLoginEndpoint, loginUser)
					.then(function (result) {})
					.catch(function (error) {});
			}
		},

		validData(): boolean {
			if (LibUtils.isEmpty(this.email)) {
				this.error = "Email must be filled.";
				return false;
			}

			if (LibUtils.isEmpty(this.password)) {
				this.error = "Password must be filled";
				return false;
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

.password-recovery-link{
	font-size: 12px;
	color: #666666;
	padding: 0 18px;
}
</style>
