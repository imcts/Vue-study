import Vue from 'vue'
import Router from 'vue-router'

import Contacts from '@views/Contacts.vue'
import ContactForm from '@views/ContactForm.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/contacts',
    component: Contacts
  }, {
    path: '/edit/:id',
    component: ContactForm,
    props: true
  }, {
    path: '/new',
    component: ContactForm
  }, {
    path: '/',
    component: Contacts
  }]
})
