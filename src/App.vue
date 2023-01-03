<script>
import { mapActions, mapState } from 'pinia';
import {useCityWeatherStore} from "../src/store/cityWeather";

export default{
  name: "App",
  components: {
  },
  data() {
    const {setLocalStorageData} = mapActions(useCityWeatherStore,['setLocalStorageData']);
    const { initStartStates} = mapActions(useCityWeatherStore,['initStartStates']);
    const {locationOfUser} = mapActions(useCityWeatherStore,['locationOfUser']);
    return {
      localStorageData:[],
      setLocalStorageData,
      initStartStates,
      locationOfUser
    }
  },
  methods:{
  
  },
  computed:{
    getLocalStorage(){
      console.log(JSON.parse(localStorage.getItem('favorites')))
      // localStorage.setItem('favorites',JSON.stringify(arr))
      return JSON.parse(localStorage.getItem('favorites'));
    },
  },
    
  mounted(){
    this.setLocalStorageData(this.getLocalStorage);
    this.initStartStates(this.getLocalStorage);
    this.locationOfUser();
  }
}
  
</script>

<template>

  The Weather
  <p><a href="#/">TheWeather</a></p>
  <p><a href="#/favorites">Favorites</a></p>
  <router-view></router-view>
</template>

<style scoped>

</style>
