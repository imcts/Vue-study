<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Contacts from '@/views/Contacts.vue'
  import ContactForm from '@/views/ContactForm.vue'

  export default {
    name: 'home',
    components: { Contacts, ContactForm }
  }
</script>
