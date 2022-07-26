const router = require('express').Router();
const db = require('../db');

router.get('/getAllAppointments', async (req, res) => {
  try {
    const app = await db.query('select * from appointment');
    console.log(app);
    res.status(200).json({
      status: 'success',
      appointment: app.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete('/deleteAppointment/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM appointment where id = $1', [req.params.id]);
    res.status(202).json({
      status: 'success',
      message: 'Deleted Appointment successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.get('/getPatient/:id', async (req, res) => {
  try {
    const patient = await db.query(
      'SELECT * FROM PATIENT t1 INNER JOIN APPOINTMENT t2 ON t1.id = t2.patient_id WHERE t2.id = $1',
      [req.params.id]
    );
    res.status(202).json({
      status: 'success',
      resultCount: patient.rowCount,
      patient: patient.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.get('/getDoctor/:id', async (req, res) => {
  try {
    const doctor = await db.query(
      'SELECT * FROM DOCTOR t1 INNER JOIN APPOINTMENT t2 ON t1.id = t2.doctor_id WHERE t1.id = $1',
      [req.params.id]
    );
    res.status(202).json({
      status: 'success',
      resultCount: doctor.rowCount,
      doctor: doctor.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.get('/getDocAndPat', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT t2.id as appointment_no, t1.name as doctor, t3.name as patient, t2.appointment_date as appointment_date FROM DOCTOR t1 INNER JOIN APPOINTMENT t2 ON t1.id = t2.doctor_id INNER JOIN patient t3 ON t2.patient_id = t3.id; '
    );
    res.status(200).json({
      status: 'success',
      resultCount: result.rowCount,
      appointments: result.rows,
    });
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
