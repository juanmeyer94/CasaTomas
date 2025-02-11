import ItemData from "../../Models/items.model.js";


export const SiteMapFunc = async (req, res) => {
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