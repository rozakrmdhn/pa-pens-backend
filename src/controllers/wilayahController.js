const getProvinces = async (request, h) => {
    try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`);
        const result = await response.json();
        return h.response({
            status: 'success',
            message: 'Berhasil mengambil data',
            data: result,
        }).code(200);

    } catch (err) {
        console.error('Error fetching provinces:', err);
        return h.response({
            status: 'error',
            message: 'Gagal mengambil data',
        }).code(500);
    }
};

const getRegencies = async (request, h) => {
    const { id } = request.payload;
    try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`);
        const result = await response.json();
        return h.response({
            status: 'success',
            message: 'Berhasil mengambil data',
            data: result,
        }).code(200);
        
    } catch (err) {
        console.error('Error fetching regencies:', err);
        return h.response({
            status: 'error',
            message: 'Gagal mengambil data',
        }).code(500);
    }
};

module.exports = {
    getProvinces,
    getRegencies
}