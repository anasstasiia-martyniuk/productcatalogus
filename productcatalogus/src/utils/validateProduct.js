const validateProduct = ({ category_id, name, sku, description, price, stock }) => {
    const errors = {};

    if (!category_id) {
        errors.category_id = ["Een categorie is verplicht."];
    } else if (!Number.isInteger(Number(category_id)) || Number(category_id) < 1) {
        errors.category_id = ["De geselecteerde categorie is ongeldig."];
    }

    if (name.trim() === "") {
        errors.name = ["De productnaam is verplicht."];
    } else if (name.length > 150) {
        errors.name = ["De productnaam mag maximaal 150 tekens bevatten."];
    }

    if (sku.trim() === "") {
        errors.sku = ["De SKU is verplicht."];
    } else if (sku.length > 30) {
        errors.sku = ["De SKU mag maximaal 30 tekens bevatten."];
    } else if (!/^[A-Z0-9-]+$/.test(sku)) {
        errors.sku = ["De SKU mag alleen hoofdletters, cijfers en koppeltekens bevatten."];
    }

    if (description.length > 5000) {
        errors.description = ["De beschrijving mag maximaal 5000 tekens bevatten."];
    }

    if (price.trim() === "") {
        errors.price = ["De prijs is verplicht."];
    } else if (!/^\d+(,\d{1,2})?$/.test(price)) {
        errors.price = ["Gebruik een komma, bijvoorbeeld 899,50."];
    } else {
        const [euros, cents = ""] = price.split(",");
        const priceCents = Number(euros) * 100 + Number(cents.padEnd(2, "0"));

        if (priceCents > 10000000) {
            errors.price = ["De prijs mag niet hoger zijn dan €100.000."];
        }
    }

    if (stock.trim() === "") {
        errors.stock = ["De voorraad is verplicht."];
    } else if (!/^\d+$/.test(stock)) {
        errors.stock = ["De voorraad moet een geheel getal zijn."];
    } else if (Number(stock) > 100000) {
        errors.stock = ["De voorraad mag niet hoger zijn dan 100.000."];
    }

    return errors;
}

export default validateProduct;