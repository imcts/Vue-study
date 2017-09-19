<template>
  <li class="media col-md-3 col-sm-4">
    <div class="media-heading">
      <h3>{{ contact.name }}</h3>
    </div>

    <div class="media-body">
      <dl>
        <dt>Phone Number:</dt><dd>{{ contact.phone }}</dd>
        <dt>Email:</dt><dd>{{ contact.email }}</dd>
      </dl>
    </div>

    <div class="contact-btn-wrapper">
      <a :href="'#edit/' + contact.id" class="edit-contact btn btn-outline"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
      <a href="#contacts" class="delete-contact btn btn-outline" @click="deleteContact(contact.id)">
        <span class="glyphicon glyphicon-trash"></span> Delete
      </a>
    </div>

    <hr/>
  </li>
</template>

<script>
  export default {
    name: 'Contact',
    props: ['contact'],
    methods: {
      deleteContact (id) {
        if (!confirm('do you want to delete the contact?')) {
          return
        }
        this.$emit('deleteContact', id)
      }
    }
  }
</script>
