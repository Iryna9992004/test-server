const {model,Schema}=require('mongoose')

const SentSubtestSchema=new Schema({
    sentTestId:{type:String,required:true},
    subtestId:{type:String,required:true},
    answer:{type:[String]},
    isRight:{type:Boolean}
})

module.exports=model('SentSubtest',SentSubtestSchema)