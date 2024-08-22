import { google } from 'googleapis';
import excelPriceList from '../Models/excelPriceList.model.js';
import * as path from 'path';

// Configuración de autenticación
const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve('credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Función para obtener datos de Google Sheets
export async function getGoogleSheetData() {
    const spreadsheetId = "1Jr5eTJVDQTmC-48WuuMu4qdendamTLwagGNw9Wj1gDE";
    const range = 'Merceria!A3:D620';

    try {
        const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
        return response.data.values;
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        throw error;
    }
}

// Función para actualizar precios en la base de datos
export async function updatePrices() {
    try {
        const rows = await getGoogleSheetData();
        for (const row of rows) {
            const id = row[0]; // Columna A: ID
            const price = row[3]; // Columna D: Precio
            if (id && price) {
                await excelPriceList.findOneAndUpdate({ id: parseInt(id) }, { price: parseFloat(price) }, { upsert: true, new: true });
            }
        }
        console.log('Precios actualizados correctamente.');
    } catch (error) {
        console.error('Error updating prices:', error);
        throw error;
    }
}
