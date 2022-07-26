const router = require('express').Router();
const db = require('../db');

// Get all Patients
router.get('/getAllPatients', async (req, res) => {
  try {
    db.query(`SELECT * FROM patient`, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: err.message,
        });
      }
      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 'failed',
          message: 'Patient Record is Empty',
        });
      }
      res.status(200).json({
        status: 'success',
        results: result.rows.length,
        patients: result.rows,
      });
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
    const patient = await db.query('select * from patient where id = $1', [
      req.params.id,
    ]);

    res.status(200).json({
      status: 'success',
      patient: patient.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// Add Patient
router.post('/addPatient', async (req, res) => {
  try {
    const { name, age, mobile, address } = req.body;
    await db.query(
      'INSERT INTO patient (name, age, mobile, address) VALUES ($1, $2, $3, $4) returning *',
      [name, age, mobile, address]
    );
    res.status(201).json({
      status: 'success',
      message: 'Patient added successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

router.post('/addPatientId', async (req, res) => {
  try {
    const { id, name, age, mobile, address } = req.body;
    await db.query(
      'INSERT INTO patient (id, name, age, mobile, address) VALUES ($1, $2, $3, $4, $5) returning *',
      [id, name, age, mobile, address]
    );
    res.status(201).json({
      status: 'success',
      message: 'Patient added successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

// Update Patient
router.put('/updatePatient/:id', async (req, res) => {
  try {
    const { name, age, mobile, address } = req.body;
    await db.query(
      'UPDATE patient SET name = $1, age = $2, mobile = $3, address = $4 WHERE id = $5 returning *',
      [name, age, mobile, address, req.params.id]
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

// Delete Patient
router.delete('/deletePatient/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM patient where id = $1', [req.params.id]);
    res.status(202).json({
      status: 'success',
      message: 'Deleted Patient successfully',
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
    const patient = await db.query(
      'select * from appointment where patient_id = $1',
      [req.params.id]
    );
    res.status(200).json({
      status: 'success',
      patient: patient.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
