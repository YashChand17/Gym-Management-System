const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema({
  MembershipName: {
    type:String,
    required:true,
  },
  
  Duration: {
    type: Number,
    
  },
  Price: {
    type: Number,
    
  },
});
const MembershipPlan = mongoose.model('MembershipPlan', membershipPlanSchema);
module.exports = MembershipPlan;