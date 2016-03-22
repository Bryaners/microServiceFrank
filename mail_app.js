var api_key = 'key-fbc70a3e473078ceeefb9b8e5737b0ef';
var domain = 'sandboxbf7ab31a02984fc2a46af245f1c62f6e.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var pubnub = require('./config/pubnub.js');
console.log("---Mailing sever in operation---");
// Subscribe to the demo_tutorial channel
pubnub.subscribe({
    channel: 'create_appointment_event',
    message: function(m){console.log('Send email to '+JSON.parse(m).email);
            var data = {
            from: 'Powers Doctors <me@wit.ie>',
            to: JSON.parse(m).email,
            subject: 'Doc Appointment',
            text: 'Your Appointment has been made so contact the office to comfirm times!!!'
            };

        mailgun.messages().send(data, function (error, body) {
        console.log(body);
        });
    }
});