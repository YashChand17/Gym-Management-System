const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config({path:'config.env'})
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

async function main() {
    
    await mongoose.connect(process.env.MONGO_URI,
    (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("successfully connected")
        }
    });
}






