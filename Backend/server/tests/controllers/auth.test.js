
const request = require('supertest');
const { registerUsers, signIn } = require('../../controllers/auth');
const userSchema = require('../../models/user');
const app = require('../../../server/server');

// Mocking the user model
jest.mock('../../models/user');

describe('User Controller Tests', () => {
  describe('registerUsers', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          userInfo: {
            user_name: 'testUser1234',
            first_name: 'Test',
            last_name: 'User',
            contact_no: '123456789',
            email: 'test1234@example.com',
            password: 'test123',
            role: 'User'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      userSchema.findOne.mockResolvedValue(null);
      userSchema.create.mockResolvedValue(req.body.userInfo);

      await registerUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Success',
        message: 'User created!', // Adjusted message to match the case
        user: req.body.userInfo
      });
    });

    it('should return error if user name is already in use', async () => {
      const req = {
        body: {
          userInfo: {
            user_name: 'existingUser',
            // Other user info...
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      userSchema.findOne.mockResolvedValue({ /* Existing user data */ });

      await registerUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Fail',
        message: 'User name already in use!' // Adjusted message to match the case
      });
    });
  });

  describe('signIn', () => {
    it('should sign in a user with valid credentials', async () => {
      const req = {
        body: {
          userCredentials: {
            user_name: 'testUser',
            password: 'test123'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      userSchema.findOne.mockResolvedValue({
        user_name: 'testUser',
        password: 'test123'
      });

      await signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(202);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return error for invalid password', async () => {
      const req = {
        body: {
          userCredentials: {
            user_name: 'testUser',
            password: 'wrongPassword'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      userSchema.findOne.mockResolvedValue({
        user_name: 'testUser12345',
        password: 'test123'
      });

      await signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Fail',
        message: 'invalid passowrd!'
      });
    });

    it('should return error for invalid username', async () => {
      const req = {
        body: {
          userCredentials: {
            user_name: 'nonExistingUser',
            password: 'test123'
          }
        }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      userSchema.findOne.mockResolvedValue(null);

      await signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Fail',
        message: 'invalid username!'
      });
    });
  });
});
