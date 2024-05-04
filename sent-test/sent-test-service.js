const Test = require('../test/test-model');
const SentTest = require('./sent-test-model');
const mailService = require('../gmail/mail-service');
const sentSubtestService = require('../sent-subtest/sent-subtest-service');
const Subtest = require('../subtest/subtest-model');
const SentSubtest = require('../sent-subtest/sent-subtest-model');

module.exports = class SentTestService {
    static async add(_id, student, answer,points) {
        console.log(_id,student,answer)
        try {
            const test = await SentTest.findOne({ student });
            if(test){
                throw new Error()
            }
            const sent=await SentTest.create({testId:_id,student:student,points:points})
    
             await Promise.all(answer.map(async (item) => {
                 await sentSubtestService.add(item.sentTestId, item.subtestId, item.answer, item.isRight);
             }));
    
            return sent;
        } catch (e) {
            throw e;
        }
    }
    

    static async get(_id) {
        try {
            const sentTest = await SentTest.findOne({ testId: _id });
            if (!sentTest) {
                throw new Error('SentTest not found');
            }
            
            const subtest = await Subtest.find({ testId: _id });
            const sentSubtest = await SentSubtest.find({ sentTestId: _id });
            
            const arr = sentSubtest.map(item => {
                const correspondingSubtest = subtest.find(sub => sub._id.equals(item.subtestId));
                if (!correspondingSubtest) return null;
    
                const rightAnswers = correspondingSubtest.rightAnswers;
                const answer = item.answer;
                const wrongAnswers = rightAnswers.filter(right => !answer.includes(right));
                const correctAnswers = rightAnswers.filter(right => answer.includes(right));
                const oneAnswer = correspondingSubtest.variants.length === 0 && correspondingSubtest.rightAnswers.length === 0 ? item.answer : [];
    
                // Перевіряємо, чи є хоча б одна неправильна відповідь і встановлюємо кількість балів
                const points = wrongAnswers.length > 0 ? 0 : correspondingSubtest.points;
    
                return {
                    ...correspondingSubtest.toObject(),
                    points,
                    wrongAnswers,
                    rightAnswers,
                    oneAnswer
                };
            }).filter(item => item !== null);
            
            return arr;
        } catch (error) {
            console.error('Error in SentTestService.get:', error);
            throw error;
        }
    }
    

    static async getList(email) {
        const tests = await Test.find({ userEmail: email });
        const arr = await Promise.all(tests.map(async (item) => {
            const sentTests = await SentTest.find({ testId: item._id });
            const subtests=await Subtest.find({testId:item._id})
            const maxPoints = subtests.reduce((sum, it) => sum + it.points, 0);
            return sentTests.map(sentTest => ({ ...sentTest.toObject(), test: item.name ,maxPoints}));
        }));
    
        return arr.reduce((acc,curr)=>acc.concat(curr),[]);
    }
    
};
