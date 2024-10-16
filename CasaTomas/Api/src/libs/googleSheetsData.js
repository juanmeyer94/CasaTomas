import { google } from 'googleapis';
import * as path from 'path';
import excelPriceList from '../Models/excelPriceList.model.js';
import ItemData from "../Models/items.model.js"

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
        const merceriaDataAtoD = await getGoogleSheetData(merceriaSheetId, 'Merceria!A3:D720');
        const merceriaDataGtoH = await getGoogleSheetData(merceriaSheetId, 'Merceria!G3:H720');

        const merceriaData = merceriaDataAtoD.map((row, index) => {
            return [
                row[0], 
                row[1], 
                row[2], 
                row[3], 
                merceriaDataGtoH[index] ? merceriaDataGtoH[index][0] : null, 
                merceriaDataGtoH[index] ? merceriaDataGtoH[index][1] : null 
            ];
        });

        const listaWebData = await getGoogleSheetData(listaWebSheetId, 'LISTAWEB!A3:C406');
        return { merceriaData, listaWebData }; 
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        throw error;
    }
}

export async function updatePrices() {
    try {
        const { merceriaData, listaWebData } = await getAllSheetsData(); 

        // Actualizar precios en Mercería y en ItemData
        const merceriaPromises = merceriaData.map(async row => {
            const id = row[0];
            const price = row[3]?.trim() || "0";
            const quantity = row[4]?.trim() || "0";
            const wholesalePrice = row[5]?.trim() || "0";

            // Actualizar en excelPriceList
            await excelPriceList.findOneAndUpdate(
                { id: id },  
                { 
                    price: price,
                    quantity: quantity,
                    wholesalePrice: wholesalePrice
                }, 
                { upsert: true, new: true }
            );

            // Actualizar todos los ítems en ItemData por código
            const itemUpdateResult = await ItemData.updateMany(
                { 'data.items.code': id },
                { 
                    $set: {
                        'data.items.$[elem].price': price,
                        'data.items.$[elem].quantity': quantity,
                        'data.items.$[elem].wholesalePrice': wholesalePrice
                    }
                },
                {
                    arrayFilters: [{ 'elem.code': id }],
                    multi: true
                }
            );

           
        });

        const listaWebPromises = listaWebData.map(async row => {
            const id = row[0]; 
            const price = row[2]?.trim() || "0";
            const quantity ="0";
            const wholesalePrice ="0";

            await excelPriceList.findOneAndUpdate(
                { id: id }, 
                { price: price }, 
                { upsert: true, new: true }
            );

            // Actualizar todos los ítems en ItemData por código
            const itemUpdateResult = await ItemData.updateMany(
                { 'data.items.code': id }, 
                { 
                    $set: {
                        'data.items.$[elem].price': price,
                        'data.items.$[elem].quantity': quantity,
                        'data.items.$[elem].wholesalePrice': wholesalePrice
                    }
                },
                {
                    arrayFilters: [{ 'elem.code': id }],
                    multi: true
                }
            );
        });

        await Promise.all([...merceriaPromises, ...listaWebPromises]);

        console.log('Precios actualizados correctamente en excelPriceList y ItemData.');
    } catch (error) {
        console.error('Error updating prices:', error);
        throw error;
    }
}