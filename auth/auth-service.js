const User=require('./user-model');
const bcrypt=require('bcrypt');
const uuid=require('uuid');
const mailService=require('../gmail/mail-service')
const tokenService=require('../token/token-service')
const UserDto=require('./dto/user-dto')
const ApiError=require('../exceptions/api-error')

class AuthService{
    async registration(name,email,password){
        const candidate=await User.findOne({email});
        if(candidate){
            throw new ApiError.BadRequest('User with this email already exists');
        }
        const hashedPassword=await bcrypt.hash(password,4);
        const activationLink=uuid.v4();
        const user=await User.create({name,email,password:hashedPassword,activationLink});
        await mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`)
        
        const userDto=new UserDto(user)
        const tokens=tokenService.generateTokens({...userDto});
        
        await tokenService.saveToken(user.id,tokens.refreshToken);
        return{...tokens, user:userDto}
    }

    async activate(activationLink){
        const user=await User.findOne({activationLink});
        if(!user){
            throw new ApiError.BadRequest("User with this link doesn`t exist")
        }
        user.isActivated=true;
        await user.save()
    }

    async login(email,password){
        const user=await User.findOne({email});
        if(!user){
            throw ApiError.BadRequest("User with this email doesn`t exist")
        }
        const isPasswordEquals=await bcrypt.compare(password,user.password)
        if(!isPasswordEquals){
            throw ApiError.BadRequest("Wrong password")
        }
        const dto=new UserDto(user);
        const tokens=tokenService.generateTokens({...dto});
        await tokenService.saveToken(user.id,tokens.refreshToken)
        return{...tokens, user:dto}
    }

    async logout(refreshToken){
        const token=await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        console.log(refreshToken);
        const userData=tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb=await tokenService.findToken(refreshToken);

        if(!userData && !tokenFromDb){
            throw ApiError.UnauthorizedError();
         }
        const user=await User.findById(userData.id);
        const userDto=new UserDto(user);
        const tokens=tokenService.generateTokens({...userDto});
  
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens,user:userDto};
      }
    
  
}

module.exports=new AuthService()