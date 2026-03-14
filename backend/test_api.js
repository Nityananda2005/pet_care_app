const axios = require('axios');

const testApi = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:5000/api/emergency/nearby-vets?longitude=77.2090&latitude=28.6139', {
            headers: {
                // I need a valid token to test this since it's protected
            }
        });
        console.log(res.data);
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
    }
};

// Actually, I can just check the debug_db.js logic again.
// Maybe I should remove the 'protect' middleware from getNearbyVets just to test?
// Or better, let's check if the Vets are ACTIVE.
