"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const morgan_1 = __importDefault(require("morgan"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("./config");
const custom_package_application_1 = require("./routes/custom-package-application");
const expense_1 = require("./routes/expense");
const relocation_1 = require("./routes/relocation");
const testimonial_1 = require("./routes/testimonial");
const tour_1 = require("./routes/tour");
const tour_application_1 = require("./routes/tour-application");
const user_1 = require("./routes/user");
const visa_1 = require("./routes/visa");
const visa_application_1 = require("./routes/visa-application");
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
                url: `http://localhost:${config_1.port}/api`,
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
// Set up your Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, compression_1.default)());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
// Define your routes here
app.use('/api/custom-package-applications', custom_package_application_1.customPackageApplicationRouter);
app.use('/api/expenses', expense_1.expenseRouter);
app.use('/api/relocations', relocation_1.relocationRouter);
app.use('/api/testimonials', testimonial_1.testimonialRouter);
app.use('/api/tours', tour_1.tourRouter);
app.use('/api/tour-applications', tour_application_1.tourApplicationRouter);
app.use('/api/users', user_1.userRouter);
app.use('/api/visas', visa_1.visaRouter);
app.use('/api/visa-applications', visa_application_1.visaApplicationRouter);
app.get('/', (req, res) => {
    res.send('Easytravelex API');
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Start your server
exports.server = app.listen(config_1.port, () => {
    console.log(`Server started on port ${config_1.port}`);
    // Set up your Mongoose connection
    (0, mongoose_1.connect)(config_1.mongodbUri).then(() => {
        console.log('Connected to MongoDB');
    });
});
exports.default = app;
