const Subtest=require('./subtest-model')
const {S3Client,PutObjectCommand,DeleteObjectCommand, GetObjectCommand}=require('@aws-sdk/client-s3')
const uuid=require('uuid');
const {getSignedUrl}=require('@aws-sdk/s3-request-presigner')

module.exports = class SubtestService {
    constructor() {
        this.s3Bucket = new S3Client({
            credentials: {
                accessKeyId: process.env.BUCKET_ACCESS,
                secretAccessKey: process.env.BUCKET_SECRET,
            },
            region: process.env.BUCKET_REGION
        });
    }

    async add(obj, file) {
        if(file){
            const name = uuid.v4();
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: name,
                Body: file.buffer,
                ContentType: file.mimetype
            };
            const command = new PutObjectCommand(params);
            await this.s3Bucket.send(command);

            let variant=JSON.parse(obj.variants);
            let rightAnswers=JSON.parse(obj.rightAnswers)
            const test = await Subtest.create({ ...obj,img:name,variants:variant,rightAnswers:rightAnswers });
            return test;
        }
        else{
            let variant=JSON.parse(obj.variants);
            let rightAnswers=JSON.parse(obj.rightAnswers)
            const test = await Subtest.create({ ...obj,variants:variant,rightAnswers:rightAnswers });
            return test;
        }
    }

    async delete(_id) {
        const test = await Subtest.findOne({ _id });
        console.log(test)
        if(test.img){
        const params={
            Bucket:'test-service-app-999',
            Key:test.img,
        }
        const command=new DeleteObjectCommand(params);
        await this.s3Bucket.send(command);
        }
        const test1=await Subtest.findOneAndDelete({_id:_id})
        return test1;
    }

    async edit(obj) {
        const test = await Subtest.findOneAndUpdate({ _id:obj._id }, { ...obj });
        return test;
    }

    async get(testId){
        const subtests=await Subtest.find({testId});
        let arr=[];
        for(const subtest of subtests){
            if(subtest.img!=''){
                const getObjectParams={
                    Bucket:process.env.BUCKET_NAME,
                    Key:subtest.img
                }
                const command=new GetObjectCommand(getObjectParams)
                const url=await getSignedUrl(this.s3Bucket,command,{expiresIn:3600});
                arr.push({...subtest.toObject(),img:url})
            }
            else{
                arr.push({...subtest.toObject()})
            }
        }
        return arr;
    }
};
