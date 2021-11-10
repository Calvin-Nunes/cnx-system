<template>
	<div class="page-content">
		<section>
			<div class="banner-box">
				<img src="~/assets/images/sites_img.png" alt="CNX banner" height="380px"/>
			</div>
			<div class="description-card">
				<h1>Welcome to CNX System</h1>
				<p>This Web Application is made with Vue.js + Nuxt.js</p>
				<p>using typescript as language. It is used for testing and practice purposes</p>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	data: () => {
		return {};
	},

	created() {
		this.$store.dispatch("tooglePageFooter", true);
	}
});
</script>

<style lang="scss" scoped>
.description-card {
	margin: 5px auto;
	text-align: center;
}

.description-card h1 {
	color: var(--system-primary-color);
}
</style>
