<template>
  <div class="container">
    <ContactHeader></ContactHeader>

    <div class="row well">
      <div class="text-center col-sm-6">
        <a href="#new" class="btn btn-lg btn-outline">Add Contact</a>
      </div>
      <div class="text-center col-sm-6">
        <input type="text" class="form-control _search" placeholder="enter contact title to search." v-model="search" @keyup="searchContact">
      </div>
    </div>

    <ul class="media-list row _contacts-content">
      <template v-for="contact in contacts">
        <Contact @deleteContact="deleteContact" :contact="contact"></Contact>
      </template>
    </ul>

    <div class="empty-contacts-placeholder _no-contacts"></div>
    <div class="empty-search-contacts-placeholder _no-search"></div>

    <ContactFooter></ContactFooter>
  </div>
</template>

<script>
  import ContactHeader from '@views/includes/ContactHeader.vue'
  import ContactFooter from '@views/includes/ContactFooter.vue'
  import Contact from '@views/Contact.vue'
  import localStorage from '@/utils/localStorage'

  export default {
    name: 'Contacts',
    components: {
      ContactHeader,
      ContactFooter,
      Contact
    },
    data () {
      return {
        contacts: [],
        search: ''
      }
    },
    mounted () {
      this.contacts = localStorage.getContacts()
    },
    methods: {
      searchContact () {
        if (this.search.trim()) {
          const regExp = new RegExp(this.search, 'ig')
          this.contacts = localStorage.getContacts().filter((contact) => regExp.test(contact.name))
        } else {
          this.contacts = localStorage.getContacts()
        }
      },
      deleteContact (id) {
        this.contacts = this.contacts.filter((contact) => contact.id !== id)
        localStorage.deleteContact(id)
      }
    }
  }
</script>
