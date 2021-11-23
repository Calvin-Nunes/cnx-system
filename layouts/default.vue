<template>
	<div class="page-wrapper" :class="!$store.state.showPageFooter ? 'no-footer' : ''">
		<navbar></navbar>
		<Nuxt />
		<bottom v-if="$store.state.showPageFooter"></bottom>
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
