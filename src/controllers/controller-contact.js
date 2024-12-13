const config = require('../configs/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getContact(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM contacts;', function (error, results) {
                if (error) throw error;

                res.render('contact', {
                    url: 'http://localhost:5050/',
                    contacts: results || [] // Data kontak dari database
                });
            });
            connection.release();
        });
    },
    formContact(req, res) {
        res.render("addContact", {
            url: 'http://localhost:5050/',
        });
    },
    saveContact(req, res) {
        let { name, type, size, color } = req.body;

        if (name && type && size && color) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO contacts (name, type, size, color) VALUES (?, ?, ?, ?);`,
                    [name, type, size, color],
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }

                        res.redirect('/contact');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },
    editContact(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM contacts WHERE id = ?', [id], function (error, results) {
                if (error) throw error;

                if (results.length > 0) {
                    res.render('editContact', {
                        url: 'http://localhost:5050/',
                        contact: results[0]
                    });
                } else {
                    res.redirect('/contact');
                }
            });
            connection.release();
        });
    },
    updateContact(req, res) {
        const { id } = req.params;
        const { name, type, size, color } = req.body;

        // Lakukan update langsung ke database
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query(
                `UPDATE contacts SET name = ?, type = ?, size = ?, color = ? WHERE id = ?`,
                [name, type, size, color, id],
                function (error, results) {
                    if (error) {
                        console.error(error);
                        res.send("Gagal memperbarui data");
                        return;
                    }

                    // Redirect ke halaman kontak setelah berhasil
                    res.redirect('/contact');
                }
            );

            connection.release();
        });
    },
    deleteContact(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM contacts WHERE id = ?', [id], function (error, results) {
                if (error) throw error;

                res.redirect('/contact');
            });
            connection.release();
        });
    },
};
