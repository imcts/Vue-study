import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: []
  },

  getters: {
    contacts: (state, getter) => {
      return state.contacts
    },

    findContact: (state) => (id) => {
      return state.contacts.find((contact) => contact.id === id)
    },

    findSearchContacts: (state) => (search) => {
      const regExp = new RegExp(search, 'g')
      return state.contacts.filter((contact) => regExp.test(contact.name))
    }
  },

  mutations: { // 동기적 처리를 위해서 상태 갱신은 여기서 한다.
    setContacts: (state, contacts) => {
      state.contacts = contacts
    }
  },

  actions: { // 비동기를 위해서 여기에서 API처리를 마무리하고,
    modifyContact: ({commit, state, getters}, { contact, id, router }) => {
      localStorage.modifyContact(contact, id)
      const contacts = localStorage.getContacts()
      commit('setContacts', contacts)
      router.push('/contacts')
    },

    createContact: ({commit, state, getters}, { contact, router }) => {
      localStorage.createContact(contact)
      const contacts = localStorage.getContacts()
      commit('setContacts', contacts)
      router.push('/contacts')
    },

    fetchContacts: ({commit, state, getters}) => {
      const contacts = localStorage.getContacts()
      commit('setContacts', contacts)
    },

    deleteContact: ({commit, state, getters}, { id }) => {
      const contacts = localStorage.deleteContact(id)
      commit('setContacts', contacts)
    },

    searchContact: ({commit, state, getters}, { contacts }) => {
      commit('setContacts', contacts)
    }
  }
})
