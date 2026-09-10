const UserService = require('../services/user-service');
const userService = new UserService();
const create = async(req,res)=>{
    try{
       const response= await userService.create({ 
        email:req.body.email,
        password : req.body.password
    });
    return res.status(201).json({
        success:true,
        message:'successfully created a new user',
        data:response,
        err:{}

    });

    }
    catch(error)
    {
        console.log(error);
        return res.status(error.statusCode || 400).json({
            message:'something went wrong',
            data:{},
            success:false,
            err:error
        });
    }
}

const login = async (req, res) => {
    try {
        const response = await userService.login({ email: req.body.email, password: req.body.password });
        return res.status(200).json({ success: true, data: response, err: {}, message: 'login successful' });
    } catch (error) {
        return res.status(error.statusCode || 401).json({ success: false, data: {}, err: { message: error.message }, message: error.message });
    }
};

module.exports={
    create,
    login
};
