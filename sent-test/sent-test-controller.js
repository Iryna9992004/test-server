const sentTestService=require('./sent-test-service')

module.exports=class SentTestController{
    static async sendSubtest(req,res,next){
        try{
            const {_id,student,answer,points}=req.body
            const sentTest=await sentTestService.add(_id,student,answer,points);
            return res.json(sentTest);
        }
        catch(e){
            next(e)
        }
    }

    static async get(req,res,next){
        try{
            const {_id}=req.body;
            console.log(_id)
            const sentTest=await sentTestService.get(_id);
            return res.json(sentTest)
        }
        catch(e){
            next(e)
        }
    }

    static async getList(req,res,next){
        try{
            const {email}=req.body;
            const tests=await sentTestService.getList(email);
            return res.json(tests)
        }
        catch(e){
            next(e)
        }
    }
}