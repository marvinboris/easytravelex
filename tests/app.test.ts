import mongoose from 'mongoose';
import request from 'supertest';

import app, { server } from '../src/app';

// Import the models
import { CustomPackageApplication } from '../src/models/custom-package-application';
import { Expense } from '../src/models/expense';
import { Relocation } from '../src/models/relocation';
import { Testimonial } from '../src/models/testimonial';
import { TourApplication } from '../src/models/tour-application';
import { VisaApplication } from '../src/models/visa-application';
import { User } from '../src/models/user';

// Define the mock data objects
const mockTestimonial: (typeof Testimonial)['schema']['obj'] = {
  name: 'John Doe',
  job: 'Software Engineer',
  rating: 5,
  text: 'This is a testimonial',
  photo: 'https://via.placeholder.com/150',
};

const mockRelocation: (typeof Relocation)['schema']['obj'] = {
  name: 'Relocation mock',
  description: 'Relocation description',
  details: 'Relocation details',
  price: 100,
};

const mockVisaApplication: (typeof VisaApplication)['schema']['obj'] = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  adult: true,
  nationality: 'Japan',
  passportExpiryDate: '2022-01-01',
  phone: '123456789',
  photos: {
    passport: 'https://via.placeholder.com/150',
    selfie: 'https://via.placeholder.com/150',
    birthCertificate: 'https://via.placeholder.com/150',
    paymentProof: 'https://via.placeholder.com/150',
  },
  status: 'Pending',
};

const mockTourApplication: (typeof TourApplication)['schema']['obj'] = {
  name: 'John Doe',
  customerType: 'Individual',
  nationality: 'Japan',
  persons: 1,
  phone: '123456789',
  preferredDate: '2022-01-01',
  passportIdPhoto: 'https://via.placeholder.com/150',
  status: 'Pending',
};

const mockCustomPackageApplication: (typeof CustomPackageApplication)['schema']['obj'] =
  {
    name: 'John Doe',
    customerType: 'Individual',
    nationality: 'Japan',
    persons: 1,
    places: ['Tokyo', 'Kyoto'],
    startingDate: '2022-01-01',
    passportPhoto: 'https://via.placeholder.com/150',
    photo: 'https://via.placeholder.com/150',
    status: 'Pending',
  };

const mockExpense: (typeof Expense)['schema']['obj'] = {
  amount: 100,
  description: 'Expense description',
  type: 'Relocation',
  paymentDate: '2022-01-01',
  status: 'Pending',
};

const mockUser: (typeof User)['schema']['obj'] = {
  email: 'johndoe@gmail.com',
  password: 'password',
};

describe('Test the testimonial path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/api/testimonials');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the POST method', async () => {
    const response = await request(app)
      .post('/api/testimonials')
      .send(mockTestimonial);
    expect(response.statusCode).toBe(201);
  });

  test('It should respond to the PUT method', async () => {
    const testimonial = await Testimonial.create(mockTestimonial);
    const response = await request(app)
      .put(`/api/testimonials/${testimonial._id}`)
      .send({
        message: 'This is an updated message',
      });
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the DELETE method', async () => {
    const testimonial = await Testimonial.create(mockTestimonial);
    const response = await request(app).delete(
      `/api/testimonials/${testimonial._id}`,
    );
    expect(response.statusCode).toBe(204);
  });
});

describe('Test the relocation path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/api/relocations');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the POST method', async () => {
    const response = await request(app)
      .post('/api/relocations')
      .send(mockRelocation);
    expect(response.statusCode).toBe(201);
  });

  test('It should respond to the PUT method', async () => {
    const relocation = await Relocation.create(mockRelocation);
    const response = await request(app)
      .put(`/api/relocations/${relocation._id}`)
      .send({
        to: 'San Francisco',
      });
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the DELETE method', async () => {
    const relocation = await Relocation.create(mockRelocation);
    const response = await request(app).delete(
      `/api/relocations/${relocation._id}`,
    );
    expect(response.statusCode).toBe(204);
  });
});

describe('Test the visa application path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/api/visa-applications');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the POST method', async () => {
    const response = await request(app)
      .post('/api/visa-applications')
      .send(mockVisaApplication);
    expect(response.statusCode).toBe(201);
  });

  test('It should respond to the PUT method', async () => {
    const visaApplication = await VisaApplication.create(mockVisaApplication);
    const response = await request(app)
      .put(`/api/visa-applications/${visaApplication._id}`)
      .send({
        visaType: 'Business',
      });
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the DELETE method', async () => {
    const visaApplication = await VisaApplication.create(mockVisaApplication);
    const response = await request(app).delete(
      `/api/visa-applications/${visaApplication._id}`,
    );
    expect(response.statusCode).toBe(204);
  });
});

describe('Test the tour application path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/api/tour-applications');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the POST method', async () => {
    const response = await request(app)
      .post('/api/tour-applications')
      .send(mockTourApplication);
    expect(response.statusCode).toBe(201);
  });

  test('It should respond to the PUT method', async () => {
    const tourApplication = await TourApplication.create(mockTourApplication);
    const response = await request(app)
      .put(`/api/tour-applications/${tourApplication._id}`)
      .send({
        tourPackage: 'Kyoto Tour',
      });
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the DELETE method', async () => {
    const tourApplication = await TourApplication.create(mockTourApplication);
    const response = await request(app).delete(
      `/api/tour-applications/${tourApplication._id}`,
    );
    expect(response.statusCode).toBe(204);
  });
});

describe('Test the custom package application path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/api/custom-package-applications');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the POST method', async () => {
    const response = await request(app)
      .post('/api/custom-package-applications')
      .send(mockCustomPackageApplication);
    expect(response.statusCode).toBe(201);
  });

  test('It should respond to the PUT method', async () => {
    const customPackageApplication = await CustomPackageApplication.create(
      mockCustomPackageApplication,
    );
    const response = await request(app)
      .put(`/api/custom-package-applications/${customPackageApplication._id}`)
      .send({
        packageDetails: 'Updated Package',
      });
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the DELETE method', async () => {
    const customPackageApplication = await CustomPackageApplication.create(
      mockCustomPackageApplication,
    );
    const response = await request(app).delete(
      `/api/custom-package-applications/${customPackageApplication._id}`,
    );
    expect(response.statusCode).toBe(204);
  });
});

describe('Test the expense path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/api/expenses');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the POST method', async () => {
    const response = await request(app).post('/api/expenses').send(mockExpense);
    expect(response.statusCode).toBe(201);
  });

  test('It should respond to the PUT method', async () => {
    const expense = await Expense.create(mockExpense);
    const response = await request(app)
      .put(`/api/expenses/${expense._id}`)
      .send({
        amount: 200,
      });
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the DELETE method', async () => {
    const expense = await Expense.create(mockExpense);
    const response = await request(app).delete(`/api/expenses/${expense._id}`);
    expect(response.statusCode).toBe(204);
  });
});

describe('Test the user path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the POST method', async () => {
    const response = await request(app).post('/api/users').send(mockUser);
    expect(response.statusCode).toBe(201);
  });

  test('It should respond to the PUT method', async () => {
    const user = await User.create(mockUser);
    const response = await request(app).put(`/api/users/${user._id}`).send({
      password: 'newpassword',
    });
    expect(response.statusCode).toBe(200);
  });

  test('It should respond to the DELETE method', async () => {
    const user = await User.create(mockUser);
    const response = await request(app).delete(`/api/users/${user._id}`);
    expect(response.statusCode).toBe(204);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});
