const jwt=require('jsonwebtoken');
const Token=require('./token-model');
const tokenModel = require('./token-model');

class TokenService{
    generateTokens(payload){
        const accessToken=jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn:'30m'});
        const refreshToken=jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:'3d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId,refreshToken){
        const tokenData=await tokenModel.findOne({user:userId})
        if(tokenData){
            tokenData.refreshToken=refreshToken
            return tokenData.save()
        }
        const token=await Token.create({user:userId,refreshToken})
        return token;
    }

    async removeToken(refreshToken){
        const token=await tokenModel.deleteOne({refreshToken})
        return token
    }

    validateAccessToken(token){
        try{
            const userData=jwt.verify(token,process.env.JWT_ACCESS_SECRET);
            return userData
        }
        catch(e){
            return null
        }
    }

    validateRefreshToken(token){
        try {
            console.log(token);
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            console.log(e)
            throw new Error('Invalid refresh token');
        }
    }

    async findToken(refreshToken){
        try{
            const token=await Token.findOne({refreshToken});
            return token;
        }
        catch(e){

        }
    }
}

module.exports=new TokenService()