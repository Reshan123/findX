const request = require('supertest');
const app = require('../../app'); // Path to your Express app
const Course = require('../../models/course'); // Path to your Course model

describe('Course Controller Tests', () => {
    // Set timeout for the entire test suite
    jest.setTimeout(10000); // 10000 milliseconds = 10 seconds


  describe('addCourse', () => {
    it('should throw an error', async () => {
      const res = await request(app)
        .post('/courses/add')
        .send({
          courseInfo: {
            name: "Database Management System 2",
            code: "IT2129",
            description: "Relational and non-relational databases",
            credits: "4"
          }
        });
      expect(res.status).toBe(404);
      expect(res.body.status).toBe(undefined);
    
    });
  });

  describe('getAllCourses', () => {
    it('it should throw an error', async () => {
      const res = await request(app).get('/courses');
      expect(res.status).toBe(404);
      expect(res.body.status).toBe(undefined);
      // expect(Array.isArray(res.body.courseInfo)).toBe(true);
    });
  });


});
