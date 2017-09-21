<template>
  <div class="container">
    <ContactHeader></ContactHeader>

    <div class="row well">
      <div class="text-center col-sm-6">
        <a href="#" class="btn btn-lg btn-outline" @click.prevent="moveToCreateContact">Add Contact</a>
      </div>
      <div class="text-center col-sm-6">
        <input type="text" class="form-control _search" placeholder="enter contact title to search." v-model="search" @keyup="searchKeyup">
      </div>
    </div>

    <ul class="media-list row _contacts-content">
      <template v-for="contact in contacts">
        <Contact :contact="contact"></Contact>
      </template>
    </ul>

    <div class="empty-contacts-placeholder _no-contacts"></div>
    <div class="empty-search-contacts-placeholder _no-search"></div>

    <ContactFooter></ContactFooter>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ContactHeader from '@views/includes/ContactHeader.vue'
  import ContactFooter from '@views/includes/ContactFooter.vue'
  import Contact from '@views/Contact.vue'

  export default {
    name: 'Contacts',
    components: {
      ContactHeader,
      ContactFooter,
      Contact
    },
    data () {
      return {
        search: ''
      }
    },
    mounted () {
      this.fetchContacts()
    },
    computed: {
      ...mapGetters([
        'contacts'
      ])
    },
    methods: {
      ...mapGetters([
        'findSearchContacts'
      ]),
      ...mapActions([
        'fetchContacts',
        'searchContact'
      ]),

      searchKeyup () {
        if (this.search.trim()) {
          const contacts = this.findSearchContacts()(this.search)
          this.searchContact({ contacts })
        } else {
          this.fetchContacts()
        }
      },
      deleteContact (id) {
        this.contacts = this.contacts.filter((contact) => contact.id !== id)
        localStorage.deleteContact(id)
      },
      moveToCreateContact () {
        this.$router.push('/new')
      }
    }
  }
</script>
