var Intercom = require('intercom-client');
var client = new Intercom.Client({ token: 'dG9rOmM1NWM0YjAyXzJhZjBfNDc3MV9iOTliXzZmODQwNGQxYzg3YToxOjA=' });

const intercomHelper = {

  findUser(email){
    return client.users.find({ email: email }).then(
      function(d){
        return {success: true, user_id: d.body.user_id};
      }
    ).catch(function(err){
      return {success: false, message: err.body.errors[0].message, code: err.body.errors[0].code};
    });
  },

  createUser(email){
    return client.users.create({ email: email }).then(function (r) {
      return {success: true, user_id: r.body.id};
    }).catch(function(err){
      return {success: false, message: err.body.errors[0].message, code: err.body.errors[0].code};
    });
  },

  sendMessage(userId, message){
    // Admin initiated messages:
    // Sending an email to a User
    var message = {
        message_type: "email",
        subject: "Subject line",
        body: message,
        template: "personal",
        from: {
          type: "admin",
          id: "2666355"
        },
        to: {
          type: "user",
          id: userId
        }
    }

    return client.messages.create(message).then(function (r) {
        return {success: true};
    }).catch(function(err){
      return {success: false, message: err.body.errors[0].message, code: err.body.errors[0].code};
    });
  },

  createEvent(userId, eventName) {
    console.log('createEvent', userId, eventName);

    const event = {
      event_name: eventName,
      created_at: Math.round(Date.now() / 1000),
      user_id: userId
    };

    return client.events.create(event).then(function (r) {
        return {success: true};
    }).catch(function(err){
      return {success: false, message: err.body.errors[0].message, code: err.body.errors[0].code};
    });


  },

};


module.exports = intercomHelper;
