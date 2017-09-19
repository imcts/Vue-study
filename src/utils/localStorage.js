import { LOCAL_STORAGE } from '@/constants/'

function getContacts () {
  const contactsKeys = Reflect.ownKeys(localStorage).filter((key) => key.indexOf(LOCAL_STORAGE.name) !== -1)
  return contactsKeys.map((key) => JSON.parse(localStorage[key]))
}

function findContact (id) {
  const contacts = getContacts()
  return contacts.find((contact) => contact.id === id)
}

function deleteContact (id) {
  localStorage.removeItem(`${LOCAL_STORAGE.name}${id}`)
}

function createContact ({ name, email, phone }) {
  const id = getNewId().toString()
  const contact = {
    id,
    name,
    email,
    phone
  }
  localStorage.setItem(`${LOCAL_STORAGE.name}${getNewId()}`, JSON.stringify(contact))
}

function modifyContact ({ name, email, phone }, id) {
  const contact = {
    id,
    name,
    email,
    phone
  }
  localStorage.setItem(`${LOCAL_STORAGE.name}${id}`, JSON.stringify(contact))
}

function getNewId () {
  const contacts = getContacts()
  if (contacts.length === 0) {
    return 0
  }
  const contact = contacts.reduce((prev, next) => prev.id > next.id ? prev : next)
  return Number(contact.id) + 1
}

export default {
  findContact,
  getContacts,
  deleteContact,
  createContact,
  modifyContact
}
