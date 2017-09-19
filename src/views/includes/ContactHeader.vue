<template>
  <header class="bs-header _header">
    <div class="container">
      <h1><a href="#contacts">{{ title }}</a></h1>
      <p>{{ useLibrary }}</p>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'ContactHeader',
    data () {
      return {
        title: 'Contact Manager',
        useLibrary: 'Using vue.js, Localstorage, Bootstrap, Webpack'
      }
    }
  }
</script>
