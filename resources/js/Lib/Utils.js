export function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

/**
 * Calculates the total amount of a given list of products.
 *
 * @param {array} products - List of products to calculate the total from.
 * @param {number} tax - Tax percentage.
 * @param {number} discount - Discount amount.
 * @param {number} shipping - Shipping cost.
 *
 * @return {number} The total amount.
 */
export const calculateTotal = (products, tax, discount, shipping) => {
    const subtotal = products.reduce((sum, product) => sum + parseFloat(product.unit_price * product.qty), 0);
    const totalWithTax = subtotal + (subtotal * tax / 100);
    const totalWithDiscount = totalWithTax - discount;
    return totalWithDiscount + shipping;
};

export const calculateSaleTotal = (products, tax, discount, shipping) => {
    const subtotal = products.reduce((sum, product) => sum + parseFloat(product.sale_price * product.qty), 0);
    const totalWithTax = subtotal + (subtotal * tax / 100);
    const totalWithDiscount = totalWithTax - discount;
    return totalWithDiscount + shipping;
};

/**
 * Calculates the tax amount of a given list of products.
 *
 * @param {array} products - List of products to calculate the tax from.
 * @param {number} tax - Tax percentage.
 *
 * @return {number} The tax amount.
 */
export const calculateTax = (products, tax) => {
    const subtotal = products.reduce((sum, product) => sum + parseFloat(product.unit_price * product.qty), 0);
    const taxAmount = (subtotal * tax / 100);
    return taxAmount
}

/**
 * Format a number to two decimal places.
 *
 * @param {number} number - The number to format.
 *
 * @return {string} The formatted number.
 */
export const formattedNumber = (number) => {
    return number.toFixed(2);
}

export const formattedAmount = (number) => {
    const fixedNumber = Number(number).toFixed(2);
    const [wholePart, decimalPart] = fixedNumber.split('.');
    const formattedWholePart = parseInt(wholePart).toLocaleString('en-IN');
    return `${formattedWholePart}.${decimalPart}`;
}

export const getCurrentMonthName = () => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();
    return monthNames[date.getMonth()];
}

export const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
}