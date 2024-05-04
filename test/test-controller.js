const TestService=require('./test-service')

module.exports=class TestController{
    static async addTest(req,res,next){
        try{
            const {name,email}=req.body;
            const test=await TestService.add(name,email);
            return res.json(test);
        }
        catch(e){
            next(e)
        }
    }

    static async deleteTest(req,res,next){
        try{
            const {_id}=req.body;
            const test=await TestService.delete(_id);
            return res.json(test);
        }
        catch(e){
            next(e)
        }
    }

    static async edit(req,res,next){
        try{
            const {_id,name}=req.body;
            const test=await TestService.edit(_id,name);
            return res.json(test);
        }
        catch(e){
           next(e) 
        }
    }

    static async get(req,res,next){
        try{
            const {email}=req.body;
            const tests=await TestService.get(email);
            return res.json(tests);
        }
        catch(e){
            next(e)
        }
    }

    static async markAsImportant(req,res,next){
        try{
            const {_id}=req.body;
            const test=await TestService.markAsImportant(_id);
            return res.json(test)
        }
        catch(e){
            next(e)
        }
    }

    static async editTitle(req,res,next){
        try{
            const {_id,title,description}=req.body;
            const test=await TestService.editTitle(_id,title,description)
            return res.json(test)
        }
        catch(e){
            next(e)
        }
    }

    static async getTestById(req,res,next){
        try{
            const {_id}=req.body;
            const test=await TestService.getById(_id);
            return res.json(test)
        }
        catch(e){
            next(e)
        }
    }
}
