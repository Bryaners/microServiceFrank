var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validator = require("email-validator");


//AppointmentSchema 
var AppointmentSchema = new Schema({
  full_name: {type: String, required : true},
  second: String,
  address: String,
  age: { type: Number, min: 0, max: 120 },
  email: String,
  notes: String,
  updated: { type: Date, default: Date.now }
});

//for second collection in mongo
//var Contact2Model = mongoose.model('contacts2', AppointmentSchema);


//address long then 5 and shorter than 40
AppointmentSchema.path('address').validate(function (v){
	if(v.length > 40 || v.length < 5) {
		return false
	}
	return true
}, 'Contact address should be between 5 and 40 characters');

//if notes add must be 5 charatcter and less then 200
AppointmentSchema.path('notes').validate(function (v){
	if(v.length > 200 || v.length < 5) {
		return false
	}
	return true
}, 'CNodes onPatients should be between 5 and 40 characters');


//email validator
AppointmentSchema.path('email').validate(function (v){
	
	return validator.validate(v);

}, 'Email is not valid must contain @');




/*
var newContact2 = {
	name: 'Bryan right',
	age: 2,
	address: 'micheal street init',
	email: 'bryan@web.com'
}

Contact2Model.create(newContact2, function(err, contact){
	if(err){
		console.log(err)
	}
});*/

module.exports = mongoose.model('Contact', AppointmentSchema);