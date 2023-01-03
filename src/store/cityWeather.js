import axios from "axios";
import { defineStore } from "pinia";

export const useCityWeatherStore = defineStore("cityWeather", {
  state: () => {
    return {
      defaultCity: {},
      city: {},
      cityName: null,
      lat: null,
      lon: null,
      mainWeatherInfo: null,
      citiesList: [],
      favoriteslist: [],
      limitCommonSizeCards: 5,
      isResetInputValue: false,
      diagramDataLoaded: false,
      hourXArr: [],
      tempYArr: [],
      localStData: [],
    };
  },
  getters: {
    getNameOfCity() {
      return this.cityName ? this.cityName : null;
    },
    getWeatherInCity() {
      return this.mainWeatherInfo ? this.mainWeatherInfo : null;
    },
    getFullCityData() {
      return this.city ? this.city : {};
    },
    getCitiesCommonList() {
      return this.citiesList;
    },
    getResetInputValue() {
      return this.isResetInputValue;
    },
    getFavoritesList() {
      return this.favoriteslist;
    },
    getHoursForDiagram() {
      return this.hourXArr;
    },
    getTemperatureForDiagram() {
      return this.tempYArr;
    },
    getLoadedDiagramData() {
      return this.diagramDataLoaded;
    },
    getSelectedCity() {
      return this.city;
    },
    getUserGeolocation() {
      return;
    },
    getDefaultCity() {
      this.fetchCityWetherByHours(this.lat, this.lon);
    },
    getError() {
      console.log("Unable to retrieve your location");
    },
  },
  actions: {
    addToCitiesList(name, city) {
      if (this.checkCitiesList(name)) {
        this.citiesList.push(city);
        this.resetSelectedWether();
      }
    },
    locationOfUser() {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
        return;
      }
      navigator.geolocation.getCurrentPosition(this.success, this.getError);
    },
    async success(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      // await this.fetchReverseGeocodingWithGoogle(this.lat, this.lon).then(
      //   () => {
      //     this.fetchWeatherByCoordinates(this.lat, this.lon).then(() => {
      //       this.city = {
      //         name: this.cityName,
      //         info: this.mainWeatherInfo,
      //         uniqueId: `id${Date.now()}`,
      //         tempPerDay: [],
      //         hoursPerDay: [],
      //         favorite: false,
      //       };
      //     });
      //   }
      // );
      this.fetchCitiesFullData(this.lat, this.lon);
    },
    setLocalStorageData(listFromLocalSt) {
      console.log("WorkingHere");
      localStorage.setItem("favorites", JSON.stringify(listFromLocalSt));
    },
    deleteFromFavorites() {
      if (this.favoriteslist.length === 0) {
        localStorage.clear();
      } else {
        let arrAfterDelete = this.favoriteslist.filter((favoriteCity) => {
          return favoriteCity.favorite;
        });
        this.favoriteslist = arrAfterDelete;
        if (!this.favoriteslist.length) {
          localStorage.clear();
          return;
        }
      }
    },
    initStartStates(arrayFromLocalStorage) {
      this.citiesList.push(this.city);
      if (arrayFromLocalStorage && this.favoriteslist) {
        this.diagramDataLoaded = true;
        this.favoriteslist = arrayFromLocalStorage;
        console.log(this.favoriteslist);
        this.city = this.favoriteslist[0];
      }
      // this.citiesList.push(this.city);
    },
    selectCityWeather(cityId) {
      console.log(cityId);
      if (this.favoriteslist.length && !this.citiesList.length) {
        // one the future will use that
        // this.favoriteslist.forEach((favoriteCity) => {
        //   if (favoriteCity.uniqueId === cityId) {
        //     console.log(favoriteCity);
        //     this.city = favoriteCity;
        //   }
        // });
        ///now use that
        this.favoriteslist.map((favoriteCity) => {
          if (favoriteCity.favorite) {
            return;
          }
        });
        return;
      }
      this.citiesList.forEach((cityInList) => {
        if (cityInList.uniqueId === cityId) {
          this.city = cityInList;
          return;
        }
      });
      return;
    },
    checkCitiesList(name) {
      let resultOfCheck = this.citiesList.map((city) => {
        return city.name === name;
      });
      return !resultOfCheck.includes(true) ? true : false;
    },
    checkFavoritesList(name) {
      console.log(name);
      let index = this.favoriteslist.findIndex((favoriteCity) => {
        return favoriteCity.name === name;
      });
      return index;
    },
    setSelectedCity(inputCity) {
      this.isResetInputValue = false;
      this.cityName = inputCity.formatted_address;
      this.lat = inputCity.geometry.location.lat();
      this.lon = inputCity.geometry.location.lng();
      return;
    },
    setFavoritesCity(id) {
      console.log(id);
      //situation when we got just favoritesList
      if (!this.citiesList.length) {
        this.favoriteslist.forEach((favoriteCity) => {
          if (favoriteCity.uniqueId === id) {
            favoriteCity.favorite = false;
            this.deleteFromFavorites();
            this.setLocalStorageData(this.favoriteslist);
            return favoriteCity;
          }
        });
      }
      //Bad method have to rewrite!!
      this.citiesList.forEach((city) => {
        if (city.uniqueId === id) {
          city.favorite = true;
          let checkFavArray = this.favoriteslist.map((favoriteCity) => {
            return favoriteCity.name === city.name ? true : false;
          });
          if (!checkFavArray.includes(true)) {
            this.favoriteslist.push(city);
            this.setLocalStorageData(this.favoriteslist);
          } else {
            city.favorite = false;
            this.deleteFromFavorites();
          }
          console.log(checkFavArray);
        }
      });
    },
    async addSelectedCityToComonList(cityData) {
      if (
        cityData &&
        this.cityName &&
        this.citiesList.length < this.limitCommonSizeCards
      ) {
        if (this.checkFavoritesList(this.city.name) !== -1) {
          this.favoriteslist[this.checkFavoritesList(this.city.name)] =
            this.city;
        }
        return;
      }
      this.resetSelectedWether();
    },
    resetSelectedWether() {
      this.cityName = "";
      this.mainWeatherInfo = {};
      this.isResetInputValue = true;
      this.tempYArr = [];
      this.hourXArr = [];
    },
    async fetchReverseGeocodingWithGoogle(lat, lon) {
      let resultNameAfterParse;
      const response = await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCIt3WIyzzhamY1yX4emhQHy84jHZ0K06I`
        )
        .then((response) => {
          console.log(response.data.plus_code.compound_code);
          resultNameAfterParse = response.data.plus_code.compound_code
            .trim()
            .split(", ")
            .slice(1)
            .join(",");
        })
        .catch((status) => {
          console.log("Request failed.  Returned status of", status);
        });
      return resultNameAfterParse;
    },
    async fetchWeatherByCoordinates(lat, lon) {
      if (lat && lon) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5d7bc52b58218aae3de5635d8e5b358d&units=metric`
        );
        // this.mainWeatherInfo = response.data.main;
      }
    },
    async fetchCityWetherByHours(lat, lon) {
      let tempArr = [];
      let hoursArr = [];
      await axios
        .get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=5d7bc52b58218aae3de5635d8e5b358d&units=metric&exclude=minutely,daily`
        )
        .then((response) => {
          let hourlyArray = response.data.hourly;
          let currentDateTime = Date.now();
          let currentDayRange = new Date();
          currentDayRange.setHours(24, 0, 0, 0);
          let todayTimeLimit = currentDayRange.getTime();
          let rangeOneDay = 24 * 60 * 60;
          hourlyArray.forEach((item) => {
            if (
              currentDateTime < item.dt * 1000 &&
              item.dt * 1000 <= todayTimeLimit + rangeOneDay
            ) {
              hoursArr.push(new Date(item.dt * 1000).toTimeString());
              tempArr.push(Math.round(item.temp));
              return;
            }
          });
          return;
        });
      return [hoursArr, tempArr];
    },
    async fetchCitiesFullData(lat, lon) {
      await Promise.all([
        this.fetchReverseGeocodingWithGoogle(lat, lon),
        this.fetchCityWetherByHours(lat, lon),
      ]).then((values) => {
        console.log(values);
        this.diagramDataLoaded = true;
      });
    },
  },
});
