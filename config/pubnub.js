'use strict';

// Mail service configuration
// ===========================
module.exports = require("pubnub").init({
            publish_key : "pub-c-beb54104-c59d-48e3-b3a4-615fe3bc20c2",
            subscribe_key : "sub-c-ec24ef58-da1c-11e5-a9de-0619f8945a4f"
     });