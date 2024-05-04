const ApiError = require("../exceptions/api-error")
const tokenService=require("../token/token-service")

module.exports=function(req,res,next){
    try{
        const header=req.headers.authorization;
        if(!header){
            return next(ApiError.UnauthorizedException())
        }
        const accessToken=header.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedException())
        }
        const userData=tokenService.validateAccessToken(accessToken);

        if(!userData){
            return next(ApiError.UnauthorizedException())
        }

        req.user=userData;
        next()
    }
    catch(e){
        return next(ApiError.UnauthorizedException())
    }
}