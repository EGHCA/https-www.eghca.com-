$w.onReady(function () {
    $w('#btnConvertir').onClick(async () => {
        try {
            const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            const data = await response.json();

            const dolarToMXN = data.rates.MXN;

            // Identificar el dataset conectado al botón o contexto actual
            // Suponemos que el botón o la vista tiene un dataset conectado
            const datasets = $w.datasets;
            let precioEnDolares;

            for (let datasetId in datasets) {
                const dataset = datasets[datasetId];
                const item = dataset.getCurrentItem();

                if (item && item.P_LISTA !== undefined) {
                    precioEnDolares = item.P_LISTA;
                    break; // ya encontramos el dataset que nos sirve
                }
            }

            if (precioEnDolares === undefined) {
                throw new Error("No se encontró el campo P_LISTA en los datasets.");
            }

            const precioEnPesos = (precioEnDolares * dolarToMXN).toFixed(2);

            $w('#txtPrecioConvertido').text = `$${precioEnPesos} MXN`;
        } catch (error) {
            console.error("Error al obtener tipo de cambio o convertir:", error);
            $w('#txtPrecioConvertido').text = "Error al convertir";
        }
    });
});
