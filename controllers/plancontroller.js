const MembershipPlan =require("../models/plan");
const User = require("../models/user");
const attendance = require("../models/attendance");

const CreateMembershipPlan=async (req, res, next) => {
    if (!req.body) {
        res.status(400).send({ message: "content cant be empty" });
        return;
      }
    const {  MembershipName, Price, Duration } = req.body; // assuming your form inputs are named 'name', 'price', and 'duration'
  
    
      // create a new membership plan object with the form data
      const membershipPlan = new MembershipPlan({
        MembershipName:MembershipName,
        Price:Price,
        Duration:Duration,
      });
  
      // save the membership plan to the database
    membershipPlan.save()
    .then(data=>{
        res.redirect('/dashboard/Plans/add_plan')
     })
     .catch(err=>{
        res.status(500).send({
            message:err.message ||"Some error occured while creating a create Operation"
        });
     })
    }

    const FindPlan=async(req,res)=>{
      if(req.query.id){
         const id=req.query.id;
     
         MembershipPlan.findById(id)
         .then(data=>{
             if(!data){
                 res.status(404).send({message:"not found user with id" +id})
             }else{
                 res.send(data)
             }
         })
         .catch(err=>{
             res.status(500).send({message:"Erro retrieving user with id" +id})
         })
      }   
      else{
        MembershipPlan.find()
      .then(Plan=>{
        res.send(Plan)
      })
      .catch(err=>{
        res.status(500).send({
            message:err.message ||" error occured while retrieving user information"
        });
     })
     }
     }
     
     
     // Update a new identified user by userid
     const UpdatePlan=async(req,res)=>{
        if(!req.body){
           return res
               .status(400)
               .send({ message : "Data to update can not be empty"})
       }
     
       const id = req.params.id;
       MembershipPlan.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
           .then(data => {
               if(!data){
                   res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
               }else{
                   res.send(data)
               }
           })
           .catch(err =>{
               res.status(500).send({ message : "Error Update user information"})
           })
     }
     
     // Delete member with specified userid
     const DeletePlan=async(req,res)=>{
        const id = req.params.id;
     
         MembershipPlan.findByIdAndDelete(id)
             .then(data => {
                 if(!data){
                     res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
                 }else{
                     res.send({
                         message : "User was deleted successfully!"
                     })
                 }
             })
             .catch(err =>{
                 res.status(500).send({
                     message: "Could not delete User with id=" + id
                 });
             });
     }

    module.exports={
        CreateMembershipPlan,
        FindPlan,
        DeletePlan,
        UpdatePlan
        
        
    };
      
     