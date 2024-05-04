const {Schema,model}=require('mongoose');

const SubtestSchema=new Schema({
    question:{type:String,required:true},
    variants:{type:[String]},
    rightAnswers:{type:[String]},
    isRequired:{type:Boolean,default:false},
    points:{type:Number,default:5},
    longText:{type:String},
    img:{type:String,default:''},
    testId:{type:String,required:true}
})

module.exports=model('Subtest',SubtestSchema)