const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.wigci.mongodb.net/?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login', async (req, res) => {
	console.log(req.body);

	const user = await User.login(req.body.username, req.body.password);
	console.log("Name: ", _Username)
	console.log("Password: ", _Password)

	if (user == "Invalid password!" || user == "Invalid username!" )
	{
		return res.status(404).send("Login failed")
	}
	return res.status(200).send("Login success")
})

app.post('/register', async (req, res) => {
	console.log(req.body);
	const user = await User.register(req.body.username, req.body.password);
	if (user == "Username Was Already Taken.") {
		return res.status(404).send("User already exits!")
	} 
	return res.status(200).send("A New User Has Joined")	
})


app.patch('/update', async(req,res) => {
	//console.log(req.body);
	const user = await User.update(req.body.username)
	if (user == 'username is not match'){
	  return res.status(404).send("can't update the data!")
	}
	return res.status(200).send('username updated !')
  })
  
  app.post('/delete', async(req,res) => {
	console.log(req.body);
	const user = await User.delete(req.body.username,req.body.password);
	if (user == 'invalid password' || user == "wrong username"){
	  return res.status(404).send('cannot find the username')
	}
	return res.status(200).send('delete successfully')
  })

  
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})