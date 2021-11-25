<template>
	<footer class="page-footer">
		<div class="footer-column footer-left">
			<ul class="footer-links">
				<li v-for="(link, index) in footerLinks" :key="index">
					<nuxt-link :to="link.path">{{ link.description }}</nuxt-link>
				</li>
			</ul>
		</div>
		<div class="footer-column footer-center">CNX System</div>
		<div class="footer-column footer-right">
			<p>Developer Email: calvin_nunes13@hotmail.com</p>
			<p>Developer Phone: +55 51 98402-9317</p>
		</div>
	</footer>
</template>

<script lang="ts">
import Vue from "vue";
import LibUtils from "static/libraries/libUtils";

const Navbar = Vue.extend({
	name: "Navbar",

	data() {
		return {
			footerLinks: [
				{ description: "Register", path: "register" },
				{ description: "Log In", path: "login" },
				{ description: "About Us", path: "about-us" },
			],
		};
	},

	props: [],

	mounted() {},

	computed: {},
});
export default Navbar;
</script>

<style scoped lang="scss">
.page-footer {
	position: absolute;
	bottom: 0;
	left: 0;
	display: flex;
	height: 90px;
	width: 100%;
	border-top: 1px solid var(--soft-border-color);
	background-color: var(--soft-background-color);
}

.page-footer > .footer-column {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 33.33%;
	font-size: 13px;
}

.page-footer > .footer-column p {
	margin: 2px;
}
</style>
