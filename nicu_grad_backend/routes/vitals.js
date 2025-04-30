// const express = require('express');
// const router = express.Router();
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // POST a new vitals entry
// router.post('/', async (req, res) => {
//   const { temp, hr, br, spo2, note, measuredAt } = req.body;

//   if (!temp || !hr || !br || !spo2 || !measuredAt) {
//     return res.status(400).json({ error: 'All vitals and timestamp are required' });
//   }

//   try {
//     const newEntry = await prisma.vitals.create({
//       data: {
//         temp: parseFloat(temp),
//         hr: parseInt(hr),
//         br: parseInt(br),
//         spo2: parseInt(spo2),
//         note: note || '',
//         measuredAt: new Date(measuredAt),
//       },
//     });
//     res.status(201).json(newEntry);
//   } catch (err) {
//     console.error('Error saving vitals:', err);
//     res.status(500).json({ error: 'Failed to save vitals entry' });
//   }
// });

// // GET all vitals entries
// router.get('/', async (req, res) => {
//   try {
//     const all = await prisma.vitals.findMany({
//       orderBy: { measuredAt: 'desc' },
//     });
//     res.json(all);
//   } catch (err) {
//     console.error('Error fetching vitals:', err);
//     res.status(500).json({ error: 'Failed to fetch vitals' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST a new medication entry
router.post('/', async (req, res) => {
  const { name, dosage, frequency, hours, duration } = req.body;

  if (!name || !dosage || !frequency || !duration) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const medication = await prisma.medicationLog.create({
      data: {
        name,
        dosage,
        frequency,
        hours,
        duration,
        lastTaken: null,
        nextDue: null
      },
    });
    res.status(201).json(medication);
  } catch (error) {
    console.error('Error saving medication:', error);
    res.status(500).json({ error: 'Something went wrong saving medication' });
  }
});

// PATCH: Mark medication as taken
router.patch('/:id/take', async (req, res) => {
  const { id } = req.params;

  try {
    const now = new Date();
    const medication = await prisma.medicationLog.findUnique({ where: { id: parseInt(id) } });
    if (!medication) return res.status(404).json({ error: 'Medication not found' });

    const nextDue = new Date(now.getTime() + medication.hours * 60 * 60 * 1000);

    const updated = await prisma.medicationLog.update({
      where: { id: parseInt(id) },
      data: {
        lastTaken: now,
        nextDue: nextDue,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating medication:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET all medications
router.get('/', async (req, res) => {
  try {
    const medications = await prisma.medicationLog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(medications);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ error: 'Failed to fetch medications' });
  }
});

module.exports = router;
