import ItemData from "../Models/items.model.js";
import excelPriceList from "../Models/excelPriceList.model.js"; 
import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"



export const getItems = async (req, res) => {
    try {
        const items = await ItemData.find();
        res.json(items);
    } catch (error) {
        console.error("Error al obtener los items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const siteMapFunc = async (req, res) => {
    console.log("Se utilizó el sitemaROuter")
    try {
        const baseUrl = "https://www.casa-tomas.com";
        const productos = await ItemData.find();

        let urls = [];
        urls.push(`${baseUrl}/api/productos`);

        productos.forEach((producto) => {
            const { section, subsection, data } = producto;

            if (section) urls.push(`${baseUrl}/productos/${section.replace(/ /g, "-")}`);
            if (subsection) urls.push(`${baseUrl}/productos/${section.replace(/ /g, "-")}/${subsection.replace(/ /g, "-")}`);

            if (data && data.items) {
                data.items.forEach((item) => {
                    if (item.marca) {
                        urls.push(`${baseUrl}/productos/${section.replace(/ /g, "-")}/${subsection.replace(/ /g, "-")}/${item.marca.replace(/ /g, "-")}`);
                    }
                });
            }
        });

        // Eliminar duplicados
        urls = [...new Set(urls)];

        // Crear XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        urls.forEach((url) => {
            xml += `   <url>\n      <loc>${url}</loc>\n      <changefreq>daily</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;
        });
        xml += `</urlset>`;

        res.header("Content-Type", "application/xml");
        res.send(xml);
    } catch (error) {
        console.error("Error generando sitemap:", error);
        res.status(500).send("Error generando sitemap");
    }
}

export async function generateSitemap(req) {
    try {
      // Obtener todos los items
      const items = await ItemData.find({})
  
      // Crear stream del sitemap
      const stream = new SitemapStream({ hostname: `https://${req.get("host")}` })
  
      // Añadir URLs estáticas
      stream.write({ url: "/", changefreq: "daily", priority: 1 })
      stream.write({ url: "/about", changefreq: "monthly", priority: 0.8 })
      stream.write({ url: "/contact", changefreq: "monthly", priority: 0.8 })
  
      // Añadir URLs dinámicas basadas en los items
      items.forEach((item) => {
        stream.write({
          url: `/items/${item.section}/${item.subsection}/${item._id}`,
          changefreq: "weekly",
          priority: 0.7,
        })
      })
  
      // Finalizar el stream
      stream.end()
  
      // Convertir el stream a una promesa que resuelve con el XML
      const sitemapXml = await streamToPromise(Readable.from(stream))
      return sitemapXml
    } catch (error) {
      console.error("Error generando el sitemap:", error)
      throw error
    }
  }

export const getFilteredItems = async (req, res) => {
    try {
        const { section, subsection, type, marca } = req.params;

        let query = {};
        if (section) query.section = section.replace(/-/g, " ");
        if (subsection) query.subsection = subsection.replace(/-/g, " ");
        if (type) query["data.type"] = type.replace(/-/g, " ");
        if (marca) query["data.items.marca"] = marca.replace(/-/g, " ");

        const items = await ItemData.find(query);

        if (!items.length) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }

        res.json(items);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};



export const createItem = async (req, res) => {
    try {
        const newItemData = req.body;
        const priceList = await excelPriceList.find().lean();
        const priceMap = new Map(priceList.map(price => [price.id, price]));

        if (newItemData.data && newItemData.data.items) {
            newItemData.data.items = newItemData.data.items.map(product => {
                if (product.code) {
                    const matchingPrice = priceMap.get(product.code);
                    if (matchingPrice) {
                        product.price = matchingPrice.price;
                        product.wholesalePrice = matchingPrice.wholesalePrice;
                        product.quantity = matchingPrice.quantity;
                    } else {
                        console.log(`No se encontró precio para el producto ${product.code}`);
                    }
                } else {
                    console.log("Producto sin código:", JSON.stringify(product));
                }
                return product;
            });
        }

        const savedItemData = await ItemData.create(newItemData);
        res.status(201).json(savedItemData);
    } catch (error) {
        console.error("Error al crear el item:", error);
        res.status(500).json({ error: "Error Interno del Servidor", detalles: error.message });
    }
};

export const updateFilterStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { filter } = req.body;

        const updatedItem = await ItemData.findByIdAndUpdate(
            id,
            { filter: filter },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating filter status:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getItem = async (req, res) => {
    try {
        const itemData = await ItemData.findById(req.params.id);
        if (!itemData) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(itemData);
    } catch (error) {
        console.error("Error al obtener el item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateItem = async (req, res) => {
    try {
        const updatedItemData = await ItemData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItemData) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(updatedItemData);
    } catch (error) {
        console.error("Error al actualizar el item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const deleteItem = async (req, res) => {
    try {
        const deletedItemData = await ItemData.findByIdAndDelete(req.params.id);
        if (!deletedItemData) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error al eliminar el item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};