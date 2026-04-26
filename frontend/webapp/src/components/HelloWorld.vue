<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button class="start" @click="getStarted">Get Started</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    getStarted() {
      this.$router.push('/getStarted')
    }
  }
}
</script>

<style>
.start {
  color: white;
  height: 40px;
  background-color: rgb(168, 50, 50);
  border-radius: 5px;
  border: none;
  width: 100px;
  transition: background-color 0.15s ease;
}

/* when button is pressed */
.start:active {
  background-color: rgb(200, 80, 80); /* lighter red */
}
</style>