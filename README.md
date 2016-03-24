# microService
Project for web service modiule. This is a project is to be used at a doctors office the secretary to take appointments.

# Code Example
taking all the http req and sending them out with https (ssl) secure
redirectingt the user to tghe secure site

			res.redirect('https://'+res.hostname+':'+app.get('port_https')+req.url);

# Motivation
This project was motivated as i had to create a API for a project in college, i came up with the idea as i wanted to put 
a emailing service, So though of appointments and Docters and it fitted in together.

# Installation / Test
To get this APi runing you need to to running the file mail_gun.js is a command line and api/contacts/app.js in a separate command line 
and then add the scheme to the rest client and away it goes.

# License
using Pubnub, MailGun and GitHub
