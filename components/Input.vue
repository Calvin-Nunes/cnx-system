<template>
  <div class="input-holder">
    <font-awesome-icon v-if="icon != null" :icon="icon" class="input-icon"></font-awesome-icon>
    <input :value="value" :type="getInputType" :placeholder="placeholder" class="input-base" @input="$emit('input', $event.target.value)"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LibUtils from 'static/libraries/libUtils'

const Button = Vue.extend({
  name: 'Input',

  data() {
    return {}
  },

  props: ['placeholder', 'value', 'valueType', 'label', 'secure'],

  mounted() {},

  computed: {
    getInputType():string{
       if (LibUtils.toBoolean(this.secure) === true){
        return 'password'
      }
      else {
        if (this.valueType === 'number'){
          return "number"
        }
      }
      return 'text'
    }
  },
})
export default Button
</script>

<style scoped lang="scss">
.input-holder{
  height: 30px;
  display: flex;
  align-items: center;
  margin: 4px 2px;
  border-radius: 2px;
  border: 1px solid var(--soft-border-color);
}

.input-base {
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  min-width: calc(100% - 22px);
  flex-grow:1;
  height: 100%;
  margin: 1px;
  transition: 0.3s all ease-out;
  padding: 0 3px;
}

.input-icon{
  width: 22px;
  height: 100%;
  display:inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
</style>
