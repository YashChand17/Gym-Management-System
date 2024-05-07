
const islogin= async(req,res,next)=>{
    try {
        if(req.session.user_id && req.session.is_admin==0 && req.session.is_trainer==0){

        }
        else{
            res.redirect('login')
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
    
}

const islogout= async(req,res,next)=>{
    try {
        if(req.session.user_id  && req.session.is_admin==0 && req.session.is_trainer==0){
            res.redirect('userdashboard');
        }
        next()
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    islogin,
    islogout
}