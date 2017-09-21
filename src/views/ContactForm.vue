<template>
  <div class="container">
    <ContactHeader></ContactHeader>

    <h2 class="page-header text-center">
      <div v-if="isModify">Modify Contact</div>
      <div v-else="isModify">Create Contact</div>
    </h2>

    <div class="form-horizontal _form">
      <div :class="hasError('name')">
        <label class="col-sm-4 control-label">Full name:</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="contact.name" placeholder="please enter your name.">
          <small class="help-block _help"><span v-if="validate.name">name is required</span></small>
        </div>
      </div>
      <div :class="hasError('email')">
        <label class="col-sm-4 control-label">Email address:</label>
        <div class="col-sm-6">
          <input type="email" class="form-control" v-model="contact.email" placeholder="please enter your email">
          <small class="help-block _help"><span v-if="validate.email">enter an email format</span></small>
        </div>
      </div>
      <div :class="hasError('phone')">
        <label class="col-sm-4 control-label">Telephone number:</label>
        <div class="col-sm-6">
          <input type="tel" class="form-control" v-model="contact.phone" placeholder="please enter your cell phone number">
          <small class="help-block _help"><span v-if="validate.phone">phone is required</span></small>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-3">
          <button @click="isModify ? clickModify() : clickCreate()" type="submit" class="btn btn-outline btn-lg btn-block">Submit</button>
        </div>
        <div class="col-sm-3">
          <button @click="moveToContacts" class="btn-close-form btn btn-outline btn-lg btn-block">Cancel</button>
        </div>
      </div>
    </div>

    <ContactFooter></ContactFooter>
  </div>
</template>

<script>
  import _ from 'lodash'
  import ContactHeader from '@views/includes/ContactHeader.vue'
  import ContactFooter from '@views/includes/ContactFooter.vue'
  import { isEmail } from '@/utils/common'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'ContactForm',
    components: { ContactHeader, ContactFooter },
    props: ['id'],
    data () {
      return {
        contact: {
          name: '',
          email: '',
          phone: ''
        },

        validate: {
          name: false,
          email: false,
          phone: false
        }
      }
    },
    mounted () {
      if (this.id) {
        this.fetchContacts()
        const contact = this.findContact()(this.id)
        if (contact) {
          this.contact = contact
        }
      }
    },
    computed: {
      isModify () {
        return Boolean(this.id)
      }
    },
    methods: {
      ...mapGetters([
        'findContact',
        'contacts'
      ]),

      ...mapActions([
        'fetchContacts',
        'createContact',
        'modifyContact'
      ]),

      clickCreate () {
        if (this.isValid()) {
          this.createContact({
            contact: this.contact,
            router: this.$router
          })
        }
      },

      clickModify () {
        if (this.isValid()) {
          this.modifyContact({
            id: this.id,
            contact: this.contact,
            router: this.$router
          })
        }
      },

      isValid () {
        this.validate.name = _.isEmpty(this.contact.name)
        this.validate.email = !isEmail(this.contact.email)
        this.validate.phone = _.isEmpty(this.contact.phone)

        for (const key in this.validate) {
          if (this.validate[key]) {
            return false
          }
        }
        return true
      },

      moveToContacts () {
        this.$router.push('/contacts')
      },

      hasError (type) {
        if (this.validate[type]) {
          return 'has-error'
        }
      }
    }
  }
</script>
