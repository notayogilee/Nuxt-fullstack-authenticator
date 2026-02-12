<script setup>
const props = defineProps({
  message: String,
  show: Boolean,
});
</script>

<template>
  <div class="min-h-16 relative">
    <Transition name="shake">
      <div
        v-if="show && message"
        class="bg-red-100 px-4 py-2 mb-4 rounded text-red-600 border border-red-300"
      >
        {{ message }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.shake-enter-active {
  animation: shake 0.5s;
}
</style>
