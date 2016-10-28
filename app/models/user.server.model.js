'Use strict';
var mongoose = require('mongoose'),
    Schema =   mongoose.Schema;

var UserSchema = new Schema ({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

mongoose.model('User', UserSchema);
