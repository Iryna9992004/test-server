const SentSubtest=require('./sent-subtest-model')

module.exports=class SentSubtestService{
    static async add(sentTestId,subtestId,answer,isRight){
        try {
            if (!sentTestId || !subtestId) {
                throw new Error('sentTestId and subtestId are required');
            }

            const sent = await SentSubtest.create({ sentTestId, subtestId, answer, isRight });
            return sent;
        } catch (error) {
            console.error('Error adding SentSubtest:', error);
            throw error;
        }
    }
};