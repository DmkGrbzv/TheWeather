<script>
export default {
  name: "App",
  props:["cityName","info"],
  components: {
},
  data() {
    return {
    }
  },
  methods:{
    addToFavorites(){
      this.$emit("add-favorites")
    },
    selectCityFromList(){
      this.$emit("select-city-card")
    }
  },
}
  
</script>

<template>
  <div @click="selectCityFromList">
    <div>
      {{ cityName }}
      {{ info }}
    </div>
    <button @click.stop="addToFavorites">Favorites</button>
  </div>
</template>

<style scoped>

</style>
