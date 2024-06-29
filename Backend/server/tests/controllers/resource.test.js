const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported as 'app'
const mongoose = require('mongoose');
const ResourceSchema = require('../../models/resource');

// Mocking the Resource model to prevent actual database operations
jest.mock('../../models/resource');


describe('Resource Controller Tests', () => {
  describe('addResource', () => {
    it('Throw an error ', async () => {
      // Mocking the request body
      const reqBody = {
        resourceInfo: {
          resourceType: 'AudioLab',
          name: 'A405'
        }
      };

      // Mocking the created resource
      const mockResource = {
        _id: new mongoose.Types.ObjectId(), // Corrected line
        resourceType: reqBody.resourceInfo.resourceType,
        name: reqBody.resourceInfo.name
      };

      // Mocking the ResourceSchema.create method
      ResourceSchema.create.mockResolvedValue(mockResource);

      // Making the request to the addResource endpoint
      const response = await request(app)
        .post('/addResource')
        .send(reqBody);

      // Asserting the response
      expect(response.status).toBe(404);
    
    });
  });

  describe('getAllResources', () => {
    it('throw an error', async () => {
      // Mocking the resources to be returned
      const mockResources = [
        {
          _id: new mongoose.Types.ObjectId(), // Corrected line
          resourceType: 'AudioLab',
          name: 'A405'
        },
        {
          _id: new mongoose.Types.ObjectId(), // Corrected line
          resourceType: 'ComputerLab',
          name: 'C302'
        }
      ];

      // Mocking the ResourceSchema.find method
      ResourceSchema.find.mockResolvedValue(mockResources);

      // Making the request to the getAllResources endpoint
      const response = await request(app)
        .get('/getAllResources');

      // Asserting the response
      expect(response.status).toBe(404);
    
    });
  });
});

