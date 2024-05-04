const {model,Schema}=require('mongoose');

const SentTestSchema=new Schema({
    testId:{type:String,required:true},
    student:{type:String,required:true},
    points:{type:Number,default:0}
})

module.exports=model('SentTest',SentTestSchema)