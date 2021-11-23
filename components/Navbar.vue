<template>
	<nav class="page-navbar">
		<div class="nav-left">
			<nuxt-link to="/" class="logo-link">
				<img id="navbar-logo" src="~/assets/images/logo-white.png" alt="Logo" />
			</nuxt-link>
		</div>
		<div class="nav-right">
			<p>Future - Desafio MealDB API</p>
		</div>
	</nav>
</template>

<script>
import Vue from "vue";
import LibUtils from "static/libraries/libUtils";

const Navbar = Vue.extend({
	name: "Navbar",

	data() {
		return {};
	},

	props: [],

	mounted() {},

	computed: {},
});
export default Navbar;
</script>

<style scoped lang="scss">
nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 45px;
	border-bottom: 1px solid var(--soft-border-color);
	padding: 0 1%;
	background: var(--system-primary-color-dark);
}

.nav-left {
	display: inline-flex;
	justify-self: flex-start;
	max-width: 35%;
	padding: 1px 4px;
}

.nav-left a.logo-link {
	margin: 0 4px;
	width: 36px;
	height: 36px;
}

.nav-left #navbar-logo {
	width: 100%;
	height: 100%;
}

.nav-right {
	display: inline-flex;
	justify-self: flex-end;
	max-width: 65%;
	padding: 1px 4px;
	color: #fff;
}

</style>
