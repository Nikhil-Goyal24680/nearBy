<template>
  <div>
    <div v-if="loading">
      <h1>Finding a match for you...</h1>
    </div>
    <div v-else class="get-started">
      <h1>Welcome to Get Started Page</h1>
      <input v-if="radiusAllow" type="text" v-model="radius" placeholder="enter radius in km">
      <form @submit.prevent="startSearch" style="display: flex; flex-direction: column;">
        <input type="text" v-model="userGender" placeholder="enter your gender">
        <input type="text" v-model="userInterestGender" placeholder="enter your interest in">
        <vue-multiselect v-model="userMood" :options="moodOptions || []" placeholder="select mood"></vue-multiselect>
        <vue-multiselect v-model="userActivity" :options="activityOptions || []" placeholder="select activity"></vue-multiselect>
        <button type="submit">submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'GetStartedComponent',
  components: {
    VueMultiselect,
  },
  methods: {
    startSearch() {
      if(!this.radius || !this.userGender || !this.userInterestGender || !this.userMood || !this.userActivity) {
        alert('Please fill all the fields');
        return;
      }
      if(!this.latitude || !this.longitude) {
        alert('Location not available');
        return;
      }
      this.loading = true;
      const url = 'searchRadius';
      const body = {
        radius: this.radius,
        userGender: this.userGender,
        userInterestGender: this.userInterestGender,
        userMood: this.userMood,
        userActivity: this.userActivity,
        lat: this.latitude,
        lon: this.longitude,
      }
      this.$http.post(url, body)
        .then(response => {
          this.loading = false;
          this.$router.push({
            path: '/room',
            state: { responseData: response.data }
          })
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        })
    },
    requestLocation() {
      if (!navigator.geolocation) {
        console.warn('Geolocation is not supported by this browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          console.log("Location:", this.latitude, this.longitude);
          this.radiusAllow = true;
        }
      );
    }
  },
  data() {
    return {
      radius: '',
      userGender: '',
      userInterestGender: '',
      userMood: null,
      loading: false,
      userActivity: null,
      moodOptions: ['chill', 'party', 'adventure'],
      activityOptions: ['night walk', 'just for walk', 'game play'],
      latitude: null,
      longitude: null,
      radiusAllow: false,
    }
  },
  mounted() {
    this.requestLocation();
  }
}
</script>

<style>
</style>