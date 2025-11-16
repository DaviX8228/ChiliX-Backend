// config/database.js
const mysql = require('mysql2');
require('dotenv').config();

// Crear pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000, // 60 segundos para Aiven
    // SSL para Aiven
    ssl: {
        rejectUnauthorized: false
    }
});

// Promisificar el pool
const promisePool = pool.promise();

// Función para testear la conexión
const testConnection = async () => {
    try {
        const [rows] = await promisePool.query('SELECT 1');
        console.log(' Conexión a la base de datos exitosa');
        return true;
    } catch (error) {
        console.error(' Error al conectar a la base de datos:', error.message);
        return false;
    }
};

module.exports = {
    pool: promisePool,
    testConnection
};