const {Schema,model}=require('mongoose');

const TestSchema=new Schema({
    name:{type:String, required:true,unique:true},
    userEmail:{type:String,required:true},
    isImportant:{type:Boolean,default:false},
    title:{type:String},
    description:{type:String}
})

module.exports=model('Test',TestSchema)
