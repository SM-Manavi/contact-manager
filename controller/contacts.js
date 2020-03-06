const User = require("../model/user");

module.exports.getContacts = (req, res, next) => {
  User.findById({ _id: req.session.userId }).then(user => {
    if (!user) {
      res.redirect("/login");
    } else {
      res.render("./user/contacts", { user });
    }
  });
};

module.exports.addContact = (req, res, next) => {
  res.render("./user/add-contact");
};

module.exports.postAdd = (req, res, next) => {
  const ContactName = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const newContact = { name: ContactName, mobile: mobile, email: email };
  User.findById(req.session.userId)
    .then(user => {
      user.contacts.push(newContact);
      return user.save();
    })
    .then(updatedUser => {
      res.redirect("/contacts");
    });
};

module.exports.getEdit = (req, res, next) => {
  const contactId = req.params.id;
  const userId = req.session.userId;
  User.findById(userId)
    .then(user => {
      if (!user) {
        res.redirect("/login");
      } else {
        contacts = user.contacts;
        for (var contact of contacts) {
          if (contact.contactId.toString() === contactId.toString()) {
            return contact;
          }
        }
      }
    })
    .then(contact => {
      if (!contact) {
        res.redirect("/contacts");
      } else {
        res.render("./user/edit-contact", { contact: contact });
      }
    });
};

module.exports.postEdit = (req, res, next) => {
  const contactId = req.params.id;
  const ContactName = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;

  User.findById(req.session.userId)
    .then(user => {
      const contacts = user.contacts;
      contacts.map(contact => {
        if (contact.contactId.toString() === contactId.toString()) {
          contact.name = ContactName;
          contact.mobile = mobile;
          contact.email = email;
        }
      });
      return user.save();
    })
    .then(updatedUser => {
      res.redirect("/contacts");
    });
};

module.exports.getDelete = (req, res, next) => {
  const contactId = req.params.id;
  const userId = req.session.userId;

  User.findById(userId)
    .then(user => {
      if (!user) {
        res.redirect("./auth/login");
      } else {
        user.contacts = user.contacts.filter(
          contact => contact.contactId.toString() !== contactId.toString()
        );
        return user.save();
      }
    })
    .then(updatedUser => {
      res.redirect("/contacts");
    });
};

module.exports.Search = (req, res, next) => {
  const name = req.query.name;
  const userId = req.session.userId;
  
  User.findById(userId).then(user => {
    if (!user) {
      res.status(300).json({ mess: "Authentication faild." });
    } else {
      const contacts = user.contacts.filter(
        contact => contact.name === name.toString()
      );
      if (contacts.length > 0) {
        res.status(200).json({ contacts: contacts, mess: "Success" });
      } else {
        res.status(200).json({contacts : contacts, mess : "Not found."});
      }
    }
  });
};
