const pool = require('../config/database')

const getAllDosen = async (request, h) => {
    try {
        const query = 'SELECT * FROM dosen ORDER BY id ASC';
        const result = await pool.query(query);

        const dosenResult = result.rows.map((row) => ({
            id: row.id,
            nama: row.nama,
            kelamin: row.kelamin,
            email: row.email,
            no_hp: row.no_hp,
            alamat: row.alamat
        }));

        const response = h.response({
            status: 'Success',
            data: dosenResult,
        });
        response.code(200);
        return response;

    } catch (err) {
        console.log(err);
    }
};

const getDosenById = async (request, h) => {
    try {
        const id = parseInt(request.params.id);
        const query = 'SELECT * FROM dosen WHERE id = $1';
        const result = await pool.query(query, [id]);
        
        const dosenResult = result.rows.map((row) => ({
            id: row.id,
            nama: row.nama,
            kelamin: row.kelamin,
            email: row.email,
            no_hp: row.no_hp,
            alamat: row.alamat
        }));

        const response = h.response({
            status: 'Success',
            data: dosenResult,
        });
        response.code(200);
        return response;

    } catch (err) {
        console.log(err);
    }
};

const deleteDosen = async (request, h) => {
    try {
        const id = parseInt(request.params.id);
        const query = 'DELETE FROM dosen WHERE id = $1';
        const result = await pool.query(query, [id]);

        const response = h.response({
            status: 'Success',
            message: 'Deleted successfully'
        })
        response.code(200);
        return response;

    } catch (err) {
        console.log(err);
    }
}

const createDosen = async (request, h) => {
    try {
        const { nama, kelamin, email, no_hp, alamat } = request.payload;
        const query = 'INSERT INTO dosen (nama, kelamin, email, no_hp, alamat) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nama, kelamin, email, no_hp, alamat];
        const result = await pool.query(query, values);

        const response = h.response({
            status: 'Success',
            message: 'Saved successfully'
        })
        response.code(200);
        return response;
        
    } catch (err) {
        console.log(err);
    }
}

const updateDosen = async (request, h) => {
    try {
        const id = request.params.id;
        const { nama, kelamin, email, no_hp, alamat } = request.payload;
        const query = 'UPDATE dosen SET nama = $1, kelamin = $2, email = $3, no_hp = $4, alamat = $5 WHERE id = $6 RETURNING *';
        const values = [nama, kelamin, email, no_hp, alamat, id];
        const result = await pool.query(query, values);
        
        const response = h.response({
            status: 'Success',
            message: 'Updated successfully'
        })
        response.code(200);
        return response;

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllDosen,
    getDosenById,
    deleteDosen,
    createDosen,
    updateDosen
}