<script>
export default {
  name: "AddButton",
  components: {
  },
  data() {
    return {
    }
  },
  methods:{
    addNewCity(){
      this.$emit("addNewCityToStore",true);
    }
  },
  computed:{
 
  },
    
  mounted(){
   
  }
}
  
</script>

<template>
  <button @click="addNewCity">+</button>
</template>

<style scoped>

</style>
