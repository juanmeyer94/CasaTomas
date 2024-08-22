import {updatePrices, getGoogleSheetData} from "../libs/googleSheetsData.js";

export const getPricesController = async (req, res) => {
    try {
        const rows = await getGoogleSheetData();
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching prices' });
    }
};

export const updatePricesController = async(req, res) => {
    try {
        await  updatePrices();
        res.status(200).json({message: "Prices updated successfully"});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error updating prices"});
        
        
    }
}