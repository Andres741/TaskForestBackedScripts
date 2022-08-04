
const db = require('./firestoreInstance.js').db;
const { forEachTask: forEachTaskAsync, showTask, showAllTasks} = require('./FirestoreUtil');


const addAttribute = async (newAtt, value) => {
    try{
        await db.runTransaction(async tran => {
            await forEachTaskAsync( async task => {

                showTask(task);
        
                if (task.data()[newAtt] === undefined) {
                    tran.update(task.ref, newAtt, value);
                }
            });    
        });

        await showAllTasks()
        console.log('Transaction success');
    } catch (e) {
        console.log('Transaction failure:', e);
    }
}

const addAttribute_deleted = async () => {
    await addAttribute("deleted", false);
}

const addAttribute_adviseDate = async () => {
    await addAttribute("adviseDate", null);
}


exports.addAttribute_deleted = addAttribute_deleted;
exports.addAttribute_adviseDate = addAttribute_adviseDate;

