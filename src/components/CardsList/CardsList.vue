<script>
// import { defineComponent } from "@vue/runtime-core"
import axios from 'axios'
import { mapActions, mapState } from 'pinia';
import {useCityWeatherStore} from "../../store/cityWeather";
import WeatherCardVue from '../WeatherCard/WeatherCard.vue';

export default {
  name: "CardsList",
  props:["citiesCommonList","setCityAction","isFavoriteList"],
  components: {
    WeatherCardVue
},
  data() {
    const {setFavoritesCity} = mapActions(useCityWeatherStore,['setFavoritesCity']);
    const {selectCityWeather} = mapActions(useCityWeatherStore,['selectCityWeather']);
    // const {getFavoritesList} = mapState(useCityWeatherStore,['getFavoritesList']);
    return {
      selectedCityData:{},
      setFavoritesCity,
      selectCityWeather
    }
  },
  methods:{
    addToFavorites(value){
      console.log(value);
      this.setFavoritesCity(value);
      // localStorage.set();
    },
    selectCard(cityData){
      this.selectCityWeather(cityData);
    }
  },
  computed:{
    ...mapState(useCityWeatherStore,['getFavoritesList']),
    citiesList(){
      // this.getFavoritesList();
      console.log(this.citiesCommonList,this.isFavoriteList)
      return this.citiesCommonList.length ? this.citiesCommonList : []
    },
    //  currentPage(){
    //   return window.location.hash === "#/" ? true :false 
    //  }
  },
  // watch:{
  //   citiesList(){
  //     this.getFavoritesList();
  //   }
  // },
    
  mounted(){
    console.log(window.location.hash)
  }
}
  
</script>

<template>
  <p>Card List</p>
  {{citiesList}}
  <div v-for="city of this.citiesList" :key="city.uniqueId">
    <WeatherCardVue 
      @selectCityCard="selectCityWeather(city.uniqueId)" 
      @addFavorites="addToFavorites(city.uniqueId)" 
      :cityName="city.name" 
    >{{ cityName }}</WeatherCardVue>
  </div>
</template>

<style scoped>

</style>
