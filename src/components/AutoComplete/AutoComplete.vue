<script>
import { mapActions, mapState} from 'pinia';
import {useCityWeatherStore} from "../../store/cityWeather";
export default {
  name: "AutoComplete",
  props:["resetInputValue"],
  components: {
},
  data() {
    const {setSelectedCity} =  mapActions( useCityWeatherStore,["setSelectedCity"])
    return {
     value: {
      name: null
     },
     currentLat : 0,
     currentLon : 0,
     setSelectedCity
    }
  },
  methods:{
  autocompleteHandler(){
    const originAutocomplete = new google.maps.places.Autocomplete( document.getElementById("search"), {types: ['(cities)']});
    
    originAutocomplete.addListener('place_changed',()=>{
      this.value = originAutocomplete.getPlace();
      if(this.value.url){
        this.setSelectedCity(this.value);
      }
    })
  },
  resetInput(){
    this.value = {};
    this.value.name = "";
  }
  
  },
  computed:{
    ...mapState(useCityWeatherStore,['getCitiesCommonList']),
  },
  watch:{
    resetInputValue(){
      console.log('watch')
      if(this.resetInputValue){
        this.resetInput();
        return
      }
    }
  },  
  mounted(){
    this.autocompleteHandler();
  }
  
}
  
</script>

<template>
  <label for="search">
  </label>
  <input type="text" id="search" placeholder="Type here..." v-model="value.name">
</template>

<style scoped>

</style>
