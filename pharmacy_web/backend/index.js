const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require("cors");
const path = require("path");
const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the database.');

        db.serialize(() => {

            //create users table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                username TEXT,
                password TEXT,
                role TEXT
            )`);

            // Create medications table
            db.run(`CREATE TABLE IF NOT EXISTS medications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                quantity INTEGER,
                isDeleted INTEGER DEFAULT 0      
            )`);

            // Create medications table
            db.run(`CREATE TABLE IF NOT EXISTS customers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                address TEXT,
                phone TEXT CHECK(length(phone) = 10 AND phone GLOB '[0-9]*'),
                medicinedes TEXT,
                isDeleted INTEGER DEFAULT 0      
            )`);

            // Hardcoded user data for simplicity (should be stored securely in production)
            const insertUser = db.prepare(`INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)`);
            insertUser.run('Owner', 'owner', 'owner123', 'Owner');
            insertUser.run('Manager', 'manager', 'manager123', 'Manager');
            insertUser.run('Cashier', 'cashier', 'cashier123', 'Cashier');
            insertUser.finalize();
        });
    }
});

app.post('/api/v1/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error('Error finding user', err.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else if (!row) {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        } else {
            res.json({ success: true, message: 'Login successful', user: row });
        }
    });
});

// Add new medication
app.post('/addMedication', (req, res) => {
    const { name, description, quantity } = req.body;
    db.run('INSERT INTO medications (name, description, quantity) VALUES (?, ?, ?)', [name, description, quantity], function (err) {
        if (err) {
            console.error('Error inserting medication', err.message);
            res.status(500).json({ success: false, message: 'Error inserting medication' });
        } else {
            res.json({ success: true, message: 'Medication inserted successfully', id: this.lastID });
        }
    });
});

// Get all medications
app.get('/getMedication', (req, res) => {
    db.all('SELECT * FROM medications WHERE isDeleted = 0 ', (err, rows) => {
        if (err) {
            console.error('Error getting medications', err.message);
            res.status(500).json({ success: false, message: 'Error getting medications' });
        } else {
            res.json({ success: true, medications: rows });
        }
    });
});

// Get medication by ID
app.get('/getMedicationById/:id', (req, res) => {
    const { id } = req.params; // Extract the ID from request parameters

    db.get('SELECT * FROM medications WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error getting medication by ID', err.message);
            res.status(500).json({ success: false, message: 'Error getting medication by ID' });
        } else {
            if (row) {
                res.json({ success: true, medication: row });
            } else {
                res.status(404).json({ success: false, message: 'Medication not found' });
            }
        }
    });
});


// Update medication
app.put('/updateMedications/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, quantity } = req.body;
    db.run('UPDATE medications SET name = ?, description = ?, quantity = ? WHERE id = ?', [name, description, quantity, id], (err) => {
        if (err) {
            console.error('Error updating medication', err.message);
            res.status(500).json({ success: false, message: 'Error updating medication' });
        } else {
            res.json({ success: true, message: 'Medication updated successfully' });
        }
    });
});

// Soft delete medication
app.delete('/softdeleteMedication/:id', (req, res) => {
    const { id } = req.params;
    db.run('UPDATE medications SET isDeleted = 1 WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error soft deleting medication', err.message);
            res.status(500).json({ success: false, message: 'Error soft deleting medication' });
        } else {
            res.json({ success: true, message: 'Medication soft deleted successfully' });
        }
    });
});

// Delete medication
app.delete('/deleteMedication/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM medications WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting medication', err.message);
            res.status(500).json({ success: false, message: 'Error deleting medication' });
        } else {
            res.json({ success: true, message: 'Medication deleted successfully' });
        }
    });
});

// CRUD operations for customer records

//Add customers
app.post('/addCustomer', (req, res) => {
    const { name, address, phone, medicinedes } = req.body;
    db.run('INSERT INTO customers (name, address, phone, medicinedes) VALUES (?, ?, ?, ?)', [name, address, phone, medicinedes], function (err) {
        if (err) {
            console.error('Error inserting customer record', err.message);
            res.status(500).json({ success: false, message: 'Error inserting medication' });
        } else {
            res.json({ success: true, message: 'Customer Record inserted successfully', id: this.lastID });
        }
    });
});

// GET all customers
app.get('/getCustomer', (req, res) => {
    db.all('SELECT * FROM customers WHERE isDeleted = 0', (err, rows) => {
        if (err) {
            console.error('Error getting customer records', err.message);
            res.status(500).json({ success: false, message: 'Error getting customer records' });
        } else {
            res.json({ success: true, customers: rows });
        }
    });
});

//update customers
app.put('/updateCustomer/:id', (req, res) => {
    const { id } = req.params;
    const { name, address, phone, medicinedes } = req.body;
    db.run('UPDATE customers SET name = ?, address = ?, phone = ?, medicinedes = ? WHERE id = ?', [name, address, phone, medicinedes, id], (err) => {
        if (err) {
            console.error('Error updating customer record', err.message);
            res.status(500).json({ success: false, message: 'Error updating customer record' });
        } else {
            res.json({ success: true, message: 'Customer record updated successfully' });
        }
    });
});

//soft delete a customer
app.delete('/softdeleteCustomer/:id', (req, res) => {
    const { id } = req.params;
    db.run('UPDATE customers SET isDeleted = 1 WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error soft deleting customer records', err.message);
            res.status(500).json({ success: false, message: 'Error soft deleting customer record' });
        } else {
            res.json({ success: true, message: 'Customer record soft deleted successfully' });
        }
    });
});

//delete a customer
app.delete('/deleteCustomer/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM customers WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting customer record', err.message);
            res.status(500).json({ success: false, message: 'Error deleting customer records' });
        } else {
            res.json({ success: true, message: 'Customer record deleted successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});