<template>
	<div class="input-outer-box">
		<label v-if="label != null" class="input-label">{{ label }}</label>
		<div class="input-holder">
			<icon v-if="icon != null" :icon="icon" class="input-icon"></icon>
			<input :value="value" :type="getInputType" :placeholder="placeholder" class="input-base" @input="$emit('input', $event.target.value)" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import LibUtils from "static/libraries/libUtils";

const Input = Vue.extend({
	name: "Input",

	data() {
		return {};
	},

	props: ["placeholder", "value", "valueType", "label", "secure", "icon"],

	mounted() {},

	computed: {
		getInputType(): string {
			if (LibUtils.toBoolean(this.secure) === true) {
				return "password";
			} else {
				if (this.valueType === "number") {
					return "number";
				}
			}
			return "text";
		},
	},
});
export default Input;
</script>

<style scoped lang="scss">
.input-outer-box {
	margin: 6px 3px;
}

.input-holder {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	border-radius: 2px;
	border: 1px solid var(--soft-border-color);
}

.input-base {
	display: inline-flex;
	align-items: center;
	outline: none;
	border: none;
	min-width: calc(100% - 30px);
	flex-grow: 1;
	height: 30px;
	margin: 0;
	transition: 0.3s all ease-out;
	padding: 0 3px;
}

.input-icon {
	min-width: 30px;
	max-width: 30px;
	height: 30px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	padding: 0 4px;
	color: #777777;
	border-right: 1px solid var(--soft-border-color);
	background: rgba(0, 0, 0, 0.05);
}

.input-label {
	width: 100%;
	color: #777777;
	font-size: 12px;
	padding: 0;
	margin: 0;
}
</style>
