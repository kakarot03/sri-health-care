require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const patientRouter = require('./routes/patientRoute');
const doctorRouter = require('./routes/doctorRoute');
const appointmentRouter = require('./routes/appointmentRoute');
const generalRouter = require('./routes/generalRoute');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
const port = process.env.PORT;

app.use(cors());
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/appointment', appointmentRouter);
app.use('/api/v1/general', generalRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
