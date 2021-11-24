<template>
	<div class="page-wrapper">
		<navbar></navbar>
		<Nuxt />
		<bottom></bottom>
	</div>
</template>

<script>
import Vue from "vue";
import Footer from "@/components/Footer.vue";

export default Vue.extend({
	components: { bottom: Footer },
});
</script>

<style lang="scss" scoped></style>
