const router = require('express').Router();
const db = require('../db');

router.get('/adminAuth', async (req, res) => {
  try {
    const admin = await db.query('select * from admin');
    console.log(admin);
    res.status(200).json({
      status: 'success',
      admin: admin.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/getDepartments', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM department');

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      department: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.get('/getSymptoms', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM disease');
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      symptoms: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.post('/bookAppointment', async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date } = req.body;
    await db.query(
      'INSERT INTO appointment (patient_id, doctor_id, appointment_date) VALUES ($1, $2, $3) returning *',
      [patient_id, doctor_id, appointment_date]
    );
    res.status(201).json({
      status: 'success',
      message: 'Appointment booked successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.get('/getDate/:id', async (req, res) => {
  try {
    const result = await db.query(
      'select coalesce(max(appointment_date)+1, current_date+1) as date from appointment where doctor_id = $1',
      [req.params.id]
    );
    const d = new Date(
      new Date(result.rows[0].date).getTime() + 60 * 60 * 24 * 1000
    );
    res.status(200).json({
      status: 'success',
      date: d.toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

module.exports = router;
