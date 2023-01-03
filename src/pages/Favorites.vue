<script>

import { defineComponent } from "@vue/runtime-core"
import { mapActions, mapState } from 'pinia';
import {useCityWeatherStore} from "../store/cityWeather";

import WeatherCardVue from "../components/WeatherCard/WeatherCard.vue";
import AutoCompleteVue from "../components/AutoComplete/AutoComplete.vue";
import WeatherDiagramVue from "../components/WeatherDiagram/WeatherDiagram.vue";
import AddButton from "../components/AddButton/AddButton.vue";
import CardsListVue from "../components/CardsList/CardsList.vue";

export default defineComponent({
  name: "Weather",
  components: {
    WeatherCardVue,
    AutoCompleteVue,
    WeatherDiagramVue,
    CardsListVue,
    AddButton,
},
  data() {
    const {setFavoritesCity} = mapActions(useCityWeatherStore,['setFavoritesCity']);
    const {selectCityWeather} = mapActions(useCityWeatherStore,['selectCityWeather']);
    // const {getFavoritesList} = mapState(useCityWeatherStore,['getFavoritesList']);
    const {addSelectedCityToComonList} = mapActions(useCityWeatherStore,['addSelectedCityToComonList'])
    return {
     addSelectedCityToComonList,
     setFavoritesCity,
     selectCityWeather,
     diagramIsLoad: false,
    }
  },
  methods:{
   addNewCity(value){
    this.addSelectedCityToComonList(value);
   }
  },
  computed:{
   ...mapState(useCityWeatherStore,['getResetInputValue']),
   ...mapState(useCityWeatherStore,['getCitiesCommonList']),
   ...mapState(useCityWeatherStore,['getFullCityData']),
   ...mapState(useCityWeatherStore,['getHoursForDiagram']),
   ...mapState(useCityWeatherStore,['getTemperatureForDiagram']),
   ...mapState(useCityWeatherStore,['getLoadedDiagramData']),
   ...mapState(useCityWeatherStore,['getSelectedCity']),
   ...mapState(useCityWeatherStore,['getFavoritesList']),
   displayDiagram(){
    return this.getLoadedDiagramData ? this.getLoadedDiagramData : this.diagramIsLoad 
   },
   currentPage(){
    console.log('FavoritePageWatch');
    this.selectCityWeather(this.getFavoritesList[0].uniqueId);
    return window.location.hash === "#/favorites" ? true :false 
   },
   isNonEmptyListWithLimit(){
    return this.getFavoritesList.length && this.getFavoritesList.length <= 5
   }
  },
})
  
</script>

<template>
  Favorites
  {{ getFavoritesList }}
  
  <CardsListVue :citiesCommonList="getFavoritesList" v-if="getFavoritesList.length > 0" :isFavoriteList="true"/>
  <!-- <WeatherDiagramVue v-if="displayDiagram && isNonEmptyListWithLimit && currentPage" :cityName="getSelectedCity.name" :tempYArr="getSelectedCity.tempPerDay" :hourXArr="getSelectedCity.hoursPerDay"/> -->
</template>

<style scoped>

</style>
