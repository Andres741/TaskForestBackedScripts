
const db = require('./firestoreInstance.js').db;


const forEachTaskAsync = async (callback /*: (QueryDocumentSnapshot)=>void*/) => {

    const tasks = (await db.collectionGroup('tasks').get()).docs;

    const promises = tasks.map( async task => {
        callback(task);
    });

    //await Promise.all(promises);
    promises.forEach( async promise => { 
        await promise;
    });


    /* const users = (await db.collection("users").get()).docs;  //Does not see real users

    console.log("users.length:", users.length)

    users.forEach( async user => {
        console.log("user/id:", user.id);

        const tasksColl = user.ref.collection("tasks");
        const tasks = await tasksColl.get();

        tasks.forEach( async task => {
            const data = task.data()
            console.log(task.id, '=>', data);
    
            console.log("data.title", '=', data.title);
            console.log("data.deleted", '=', data.deleted);
            console.log();
    
            callback(task);
        });
    }); */
}

const showTask = (task) => {
    const data = task.data();
    console.log(task.id, '=>', data);

    console.log("data.title", '=', data.title);
    console.log("data.deleted", '=', data.deleted);
    console.log();
}

const showAllTasks = async () => {
    await forEachTaskAsync( task => {
        showTask(task);
    });
}



exports.forEachTask = forEachTaskAsync;
exports.showTask = showTask;
exports.showAllTasks = showAllTasks;

