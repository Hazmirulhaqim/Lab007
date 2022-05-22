const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {
	it('should return hello world', async () => {
		return request.get('/hello')
			.expect(200)
			.expect('Content-Type', /text/)
			.then(res => {
				expect(res.text).toBe('Hello BENR2423');
			});
	})

	it('login successfully', async () => {
		return request
			.post('/login')
			.send({_Username: 'Ali', _Password: "12345" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Login success");
					
			});
	});

	it('login failed', async () => {
		return request
			.post('/login')
			.send({_Username: 'Kel', _Password: "35123" })
			.expect('Content-Type', /text/)
			.expect(404)
			.then(response => {
				expect(response.text).toEqual("Login failed")
			});
	});

	it('register', async () => {
		return request
			.post('/register')
			.send({_Username: 'John', _Password: "10110" })
			.expect('Content-Type', /text/)
			.expect(200)
			.then(response => {
				expect(response.text).toEqual("The user is saved.");
			});
	});

	it('register failed', async () => {
		return request
			.post('/register')
			.send({_Username: 'Ali', _Password: "12345" })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("User already exits!");
			});
	});

	it('update successfully', async () => {
		return request
			.patch('/update')
			.send({username: 'Shelia Schinner'})
			.expect(200)
		});
	  
	  it('delete successfully', async () => {
		return request
		  .post('/delete')
		  .send({'username': 'alip', 'password': "qwmcirgr"})
		  .expect('Content-Type', /text/)
		  .expect(200).then(response => {
			expect(response.text).toEqual("delete successfully");
		  });
	  })
		
	  it('delete failed', async () => {
		return request
		  .post('/delete')
		  .send({'username': 'alip', 'password': "1010"})
		  .expect('Content-Type', /text/)
		  .expect(404).then(response => {
			expect(response.text).toEqual("cannot find the username");
		  });
	  })
});