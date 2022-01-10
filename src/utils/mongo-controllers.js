const User = require('../database/mongo-model');

const createUser =async ()=>{

try {

    const newUser = new User({
      username: "Test",
    });

    await newUser.save();
  }
 catch (err) { console.log(err) }

}

module.exports={createUser}


