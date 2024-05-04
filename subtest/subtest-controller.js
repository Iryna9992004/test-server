const SubtestService = require('./subtest-service');
const subtestService = new SubtestService();

module.exports = class SubtestController {

    static async add(req, res, next) {
        try {
            const obj = req.body;
            const file = req.file;
            const subtest = await subtestService.add(obj, file);
            return res.json(subtest);
        } catch (e) {
            next(e);
        }
    }

    static async get(req,res,next){
        try{
            const {testId}=req.body;
            const subtests=await subtestService.get(testId);
            return res.json(subtests);
        }
        catch(e){
            next(e)
        }
    }

    static async edit(req,res,next){
        try{
            const obj=req.body;
            const subtest=await subtestService.edit(obj);
            return res.json(subtest)
        }
        catch(e){
            next(e);
        }
    }

    static async delete(req,res,next){
        try{
            const {_id}=req.body;
            const subtest=await subtestService.delete({_id});
            return res.json(subtest)
        }
        catch(e){
            next(e);
        }
    }
};
