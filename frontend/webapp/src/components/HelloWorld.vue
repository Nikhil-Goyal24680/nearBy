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
      
    }
  }
}
</script>

<style>
.start {
  color: white;
  height: 20px;
  background-color: rgb(168, 50, 50);
  border-radius: 5px;
  border: none;
  size: 100px;
}
</style>