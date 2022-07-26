const router = require('express').Router();
const db = require('../db');

// Get all doctors
router.get('/getAllDoctors', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM doctor');

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      doctors: result.rows,
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
    const doctor = await db.query('select * from doctor where id = $1', [
      req.params.id,
    ]);
    res.status(200).json({
      status: 'success',
      doctor: doctor.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// Add Doctor
router.post('/addDoctor', async (req, res) => {
  try {
    const { name, age, mobile, department } = req.body;
    await db.query(
      'INSERT INTO doctor (name, age, mobile, department) VALUES ($1, $2, $3, $4) returning *',
      [name, age, mobile, department]
    );
    res.status(201).json({
      status: 'success',
      message: 'Doctor added successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.post('/addDoctorId', async (req, res) => {
  try {
    const { id, name, age, mobile, password, department_id } = req.body;
    await db.query(
      'INSERT INTO doctor VALUES ($1, $2, $3, $4, $5, $6) returning *',
      [id, name, age, mobile, password, department_id]
    );
    res.status(201).json({
      status: 'success',
      message: 'Doctor added successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

// Update Doctor
router.put('/updateDoctor/:id', async (req, res) => {
  try {
    const { name, age, mobile } = req.body;
    await db.query(
      'UPDATE doctor SET name = $1, age = $2, mobile = $3 WHERE id = $4 returning *',
      [name, age, mobile, req.params.id]
    );
    res.status(202).json({
      status: 'success',
      message: 'Updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

// Delete Doctor
router.delete('/deleteDoctor/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM doctor where id = $1', [req.params.id]);
    res.status(202).json({
      status: 'success',
      message: 'Deleted doctor successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.get('/getAppointments/:id', async (req, res) => {
  try {
    const doctor = await db.query(
      'select * from appointment where doctor_id = $1',
      [req.params.id]
    );
    res.status(200).json({
      status: 'success',
      doctor: doctor.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
