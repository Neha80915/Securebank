const db = require('../database/init');

class ATM {
  static async create(name, address, latitude, longitude, services) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO atms (name, address, latitude, longitude, services) VALUES (?, ?, ?, ?, ?)',
        [name, address, latitude, longitude, services],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, name, address, latitude, longitude, services });
        }
      );
    });
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM atms', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async findNearby(lat, lng, radiusKm = 10) {
    // Simple distance calculation (Haversine approximation for demo)
    const lat1 = parseFloat(lat);
    const lng1 = parseFloat(lng);
    const radius = parseFloat(radiusKm);

    return new Promise((resolve, reject) => {
      db.all('SELECT *, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance FROM atms HAVING distance < ? ORDER BY distance', [lat1, lng1, lat1, radius], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = ATM;
