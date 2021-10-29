<template>
  <div id="app">
    <router-view
      :apiKey="isAPIKey"
      v-if="isAPIKey"
    />
    <div
      class="flex flex-row items-center"
      v-else
    >
      <figure class="w-64 h-64 mx-auto">
        <img
          class="w-full h-full mb-5"
          src="@/assets/images/white-rabbit.png"
          alt="Follow the white rabbit!"
          srcset=""
        >
        <figcaption class="text-xl text-center">Follow the right key!</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
import api from '@/apiConfig';

export default {
  name: "App",
  data () {
    return {
      isAPIKey: ''
    }
  },
  mounted () {
    this.isAPIKey = api.key
  }
}
</script>

<style lang="scss">
#app {
}
</style>
