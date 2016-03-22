var _ = require('lodash');
var Appointment = require('./contact.model');  
var pubnub = require("../../config/pubnub.js")
  //appointment



  //working form here

// Get list of contacts
exports.index = function(req, res) {
          // Connect to the db
   Appointment.find(function (err, appointments) {
    if(err) { return handleError(res, err); }
    return res.json(200, appointments);
  });

} ;

// Creates a new appointment in datastore.
exports.create = function(req, res) {
  console.log('--------------1-----------------');
  Appointment.create(req.body, function(err, appointment) {
    if(err) { return handleError(res, err); }
    
    
    //
    console.log('--------------2-----------------');
    pubnub.publish({
                        channel: 'create_appointment_event',        
                        message: JSON.stringify(appointment),
                        callback : function(m){console.log('New_Appointment_Event:' + m)}
                });
    //
    return res.json(201, appointment);
  });
  

};

// Updates an existing appointment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Appointment.findById(req.params.id, function (err, appointment) {
    if (err) { return handleError(res, err); }
    if(!appointment) { return res.send(404); }
    var updated = _.merge(appointment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, appointment);
    });
  });
};

// delete an existing appointment in datastore.
exports.delete = function(req, res) {
    Appointment.findById(req.params.id, function (err, appointment) {
    if(err) { return handleError(res, err); }
    if(!appointment) { return res.send(404); }
    appointment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
};