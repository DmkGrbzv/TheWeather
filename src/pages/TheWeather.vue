<script>

import { defineComponent } from "@vue/runtime-core"
import { mapActions, mapState } from 'pinia';
import {useCityWeatherStore} from "../store/cityWeather";

import WeatherCardVue from "../components/WeatherCard/WeatherCard.vue";
import AutoCompleteVue from "../components/AutoComplete/AutoComplete.vue";
import WeatherDiagramVue from "../components/WeatherDiagram/WeatherDiagram.vue";
import AddButton from "../components/AddButton/AddButton.vue";
import CardsListVue from "../components/CardsList/CardsList.vue";

export default {
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
    console.log('weatherPageWatch')
    if(this.getCitiesCommonList.length){
      let copyArr = [...this.getCitiesCommonList];
      let lastAddedCityId = copyArr.pop().uniqueId;
      console.log(lastAddedCityId)
      this.selectCityWeather(lastAddedCityId);
    }
    return window.location.hash === "#/" ? true : false 
   }
  },
  mounted(){
   console.log(this.displayDiagram);
   
  }
}
  
</script>

<template>
  <AutoCompleteVue :resetInputValue="getResetInputValue"/>
  <AddButton @addNewCityToStore = "addNewCity"/>
  <CardsListVue :citiesCommonList="getCitiesCommonList" v-if="getCitiesCommonList.length > 0" :isFavoriteList="false"/>
  <WeatherDiagramVue v-if="displayDiagram && currentPage && getCitiesCommonList.length" :cityName="getSelectedCity.name && getSelectedCity.tempPerDay" :tempYArr="getSelectedCity.tempPerDay" :hourXArr="getSelectedCity.hoursPerDay"/>
</template>

<style scoped>

</style>
