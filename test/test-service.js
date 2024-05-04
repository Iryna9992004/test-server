const Test=require('./test-model');
const Subtest=require('../subtest/subtest-model')
const subtestService=require('../subtest/subtest-service')

module.exports=class TestService{
    static async add(name,userEmail){
        const test=await Test.create({name,userEmail:userEmail});
        return test;
    }

    static async delete(_id){
        const test=await Test.findOneAndDelete({_id});
        const subtests=await Subtest.find({testId:_id});
        for(const subtest of subtests){
            await subtestService.delete(subtest._id)
        }
        return test;
    }

    static async edit(_id,name){
        const test = await Test.findOneAndUpdate({_id}, {name}, {new:true});
        return test;
    }

    static async get(email){
        const tests=await Test.find({userEmail:email})
        return tests;
    }

    static async markAsImportant(_id){
        const test=await Test.findOne({_id});
        const importanceValue=!test.isImportant;
        const updatedTest=await Test.findOneAndUpdate({_id},{isImportant:importanceValue},{new:true});
        return updatedTest;
    }

    static async editTitle(_id,title,description){
        const test=await Test.findOneAndUpdate({_id},{title,description},{new:true})
        return test;
    }

    static async getById(_id){
        const test=await Test.findOne({_id});
        return test;
    }
}