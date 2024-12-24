/**
 * Reads a file and converts it to a base64 data URL
 * @param {File} file - The file to be converted
 * @param {function(string)} callback - Callback function that receives the data URL as a string
 * @returns {void}
 */
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


/**
 * Calculates the total sale amount including tax, discount and shipping costs
 * @param {Array<Object>} products - Array of product objects with sale_price and qty properties
 * @param {number} tax - Tax percentage to be applied
 * @param {number} discount - Discount amount to be deducted
 * @param {number} shipping - Shipping cost to be added
 * @returns {number} The final total sale amount
 */
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


/**
 * Gets the name of the current month.
 * 
 * @returns {string} The name of the current month (e.g., "January", "February", etc.).
 * 
 * @example
 * const monthName = getCurrentMonthName();
 * console.log(monthName); // "January" (if current month is January)
 */
export const getCurrentMonthName = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    return monthNames[date.getMonth()];
}


/**
 * Returns the current year as a number.
 * @returns {number} The current year (e.g., 2023)
 */
export const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
}

/**
 * Retrieves the currency symbol from localStorage or returns '$' as default
 * @returns {string} The currency symbol stored in localStorage if available, otherwise returns '$'
 */
export const currency = localStorage.getItem('currency') + ' ' || '$';