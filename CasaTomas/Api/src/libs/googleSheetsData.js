import { google } from 'googleapis';
import * as path from 'path';
import excelPriceList from '../Models/excelPriceList.model.js';

// Configuración de autenticación
const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve('credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Función para obtener datos de Google Sheets
export async function getGoogleSheetData(spreadsheetId, range) {
    try {
        const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
        return response.data.values || [];
    } catch (error) {
        console.error(`Error fetching data from spreadsheet ${spreadsheetId} and range ${range}:`, error);
        throw error;
    }
}

// Función para obtener datos de ambas hojas de Google Sheets
export async function getAllSheetsData() {
    const merceriaSheetId = '1Jr5eTJVDQTmC-48WuuMu4qdendamTLwagGNw9Wj1gDE'; 
    const listaWebSheetId = '1FTNjc-86ZfABBd6Hi5Qq0KEmSlmbtz293EXAPhZaFHU'; 

    try {
        const merceriaData = await getGoogleSheetData(merceriaSheetId, 'Merceria!A3:D620');
        const listaWebData = await getGoogleSheetData(listaWebSheetId, 'LISTAWEB!A3:C406');
        return { merceriaData, listaWebData }; 
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        throw error;
    }
}

// Función para actualizar precios en la base de datos
export async function updatePrices() {
    try {
        const { merceriaData, listaWebData } = await getAllSheetsData(); 

        for (const row of merceriaData) {
            const id = row[0]; // Columna A: ID
            const price = row[3]; // Columna D: Precio
            if (id && price) {
                await excelPriceList.findOneAndUpdate({ id: parseInt(id) }, { price: parseFloat(price) }, { upsert: true, new: true });
            }
        }

        // Actualizamos precios de la hoja LISTAWEB
        for (const row of listaWebData) {
            const id = row[0]; // Columna A: ID
            const price = row[2]; // Columna C: Precio
            if (id && price) {
                await excelPriceList.findOneAndUpdate({ id: id }, { price: price}, { upsert: true, new: true });
            }
        }

        console.log('Precios actualizados correctamente.');
    } catch (error) {
        console.error('Error updating prices:', error);
        throw error;
    }
}
