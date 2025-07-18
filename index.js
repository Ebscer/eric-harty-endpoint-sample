const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose 
	.connect('mongodb://localhost:27017/data', { })   
	.then(() => console.log("Database connected!"))
	.catch(err => console.log(err));

const usersSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	email: String,
	age: Number,
});

const User = mongoose.model('User', usersSchema);

app.get('/users/:id', async (req, res) => {
	const userId = req.params.id;

	if (mongoose.Types.ObjectId.isValid(userId)) {
		try {
			const user = await User.findById(userId);
			if (user) {
				if (user.age >= 21) { // users that are exactly 21 are included as this is typically how ages are handled
					return res.status(200).json(user);
				}
			}
			return res.status(404).json({ error: 'User over 21 is not found' });
		} catch (error) {
			console.error('Error fetching user:', error);
			return res.status(500).json({ error: error.message });
		}
	} else {
		return res.status(200).json({ error: 'Invalid user ID format' });
	}
});

// / is used to first create the database, and then to show all users to allow quickly testing the data
app.get('/', async (req, res) => {
	// try {
	// 	const sampleUsers = [
	// 		new User({ _id: new mongoose.Types.ObjectId(), name: 'Amy', email: 'amy@ebscer.com', age: 30 }),
	// 		new User({ _id: new mongoose.Types.ObjectId(), name: 'Ben', email: 'ben@ebser.com', age: 25 }),
	// 		new User({ _id: new mongoose.Types.ObjectId(), name: 'Chris', email: 'chris@ebscer.com', age: 18 }),
	// 		new User({ _id: new mongoose.Types.ObjectId(), name: 'Dave', email: 'dave@ebscer.com', age: 21 }),
	// 		new User({ _id: new mongoose.Types.ObjectId(), name: 'Eric', email: 'eric@ebscer.com', age: 37 }),
	// 		new User({ _id: new mongoose.Types.ObjectId(), name: 'Frank', email: 'frank@ebscer.com', age: 20 }),
	// 	];
	// 	await User.insertMany(sampleUsers);
	// 	console.log('Users saved successfully:', test);
	// } catch (error) {
	// 	console.error('Error saving user:', error);
	// 	return res.status(500).json({ error: error.message });
	// }

  try {
	const User = mongoose.model('User', usersSchema);
	const users = await User.find();

	res.json(users);
  } catch (error) {
	console.error('Error accessing User model:', error);
	return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});