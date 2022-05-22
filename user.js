let users;
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
let encrypted_Password;

class User {
	static async injectDB(conn) {
    	users = await conn.db("Lab07").collection("User")
  	}
	
	//Password hashing by using bycrypt
  	static async register(_Username, _Password) {
		bcrypt.genSalt(saltRounds, function (saltError, salt) {
			if (saltError) {
				throw saltError
			} else {
				bcrypt.hash(_Password, salt, function(hashError, hash) {
			  	if (hashError) {
					throw hashError
			  	} else {
					encrypted_Password=hash;
					console.log("Hash:",hash);
			  	}
				})
			}
			})

   		// TODO: Check if username exists
		return users.findOne({       
			 'username': _Username,
			  'password' : _Password,
			
			}).then(async user =>{
			if (user) {
				if ( user.username == _Username )
				{
					return "Username Was Already Taken.";
				}
			}
			  else{

   		// TODO: Save user to database
   		await users.insertOne({      
    		'username' : _Username,
    		'password' : _Password,
			'encrypt'  : encrypted_Password
   		})
   			return "A New User Has Joined";
  			}
   		}) 
		//return user;
	}
 
  	static async login(_Username, _Password) {
   		// TODO: Check if username exists
   		const user = await users.findOne({        
  			'username': _Username
			  
   		}).then(async user =>{

   		// TODO: Validate password,username
  		if (user) {
		  
			 if(user.password != _Password){
				return "Incorrect Password";
		 	}

			// TODO: Return user object
    		else{
    			return user;
    		}
  		}

		else{
   			return "Error";
  		}		
   		})
	}	
		
	static async update(_Username) {
		return users.findOne({
		  'username' : _Username
		}).then(async user =>{
		  console.log(user)
	
		if (user){
		  return users.updateOne({ 
			'username' : _Username},
			{"$set" : {"Gender" : male}
		  }).then(result => {
			console.log(result)
		  })
		}
		else {
		  return "username is not match"
		}
		})
	  
	}

	static async delete (_Username,_Password){
		return users.findOne({
		  'username' : _Username
		}).then(async user =>{
	
		  if (user){
			if (user.password != _Password){
			  return "invalid password"
			}
			else {
			  await users.deleteOne({username:_Username})
				return "delete data successfully"
			}
		  }
		  else {
			return "wrong username"
		  }
		})
	  }
}

module.exports = User;