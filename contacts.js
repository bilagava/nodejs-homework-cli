const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(data);
    return console.table(list);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(idContact) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const contact = contacts.filter((contact) => contact.id === idContact);

    return console.table(contact);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(idContact) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const filterContact = contacts.filter(
      (contact) => contact.id !== idContact
    );
    await fs.writeFile(contactsPath, JSON.stringify(filterContact, null, 2));
    console.table(filterContact);
    console.log("\x1b[32m Successfully deleted");
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);

    const newContactsList = [...parsedContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
    console.table(newContactsList);
    console.log("\x1b[32m Successfully added");
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
