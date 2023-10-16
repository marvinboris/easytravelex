import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import express from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { mongodbUri, port } from './config';

import { customPackageApplicationRouter } from './routes/custom-package-application';
import { expenseRouter } from './routes/expense';
import { relocationRouter } from './routes/relocation';
import { testimonialRouter } from './routes/testimonial';
import { tourRouter } from './routes/tour';
import { tourApplicationRouter } from './routes/tour-application';
import { userRouter } from './routes/user';
import { visaRouter } from './routes/visa';
import { visaApplicationRouter } from './routes/visa-application';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Easytravelex API',
      version: '1.0.0',
      description: 'Easytravelex API',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

// Set up your Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));

// Define your routes here
app.use('/api/custom-package-applications', customPackageApplicationRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/relocations', relocationRouter);
app.use('/api/testimonials', testimonialRouter);
app.use('/api/tours', tourRouter);
app.use('/api/tour-applications', tourApplicationRouter);
app.use('/api/users', userRouter);
app.use('/api/visas', visaRouter);
app.use('/api/visa-applications', visaApplicationRouter);

app.get('/', (req, res) => {
  res.send('Easytravelex API');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start your server
export const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);

  // Set up your Mongoose connection
  connect(mongodbUri).then(() => {
    console.log('Connected to MongoDB');
  });
});

export default app;
