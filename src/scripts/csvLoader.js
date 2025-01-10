let exoplanetData = null;

// Función para cargar los datos
export async function loadExoplanetData(path) {
    if (!exoplanetData) {
        exoplanetData = await new Promise((resolve, reject) => {
            Papa.parse(path, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => resolve(results.data),
                error: (error) => reject(error),
            });
        });
    }
    return exoplanetData;
}