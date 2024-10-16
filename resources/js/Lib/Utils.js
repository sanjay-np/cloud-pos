export function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

export const calculateTotal = (products, tax, discount, shipping) => {
    const subtotal = products.reduce((sum, product) => sum + parseFloat(product.purchase_price * product.qty), 0);
    const totalWithTax = subtotal + (subtotal * tax / 100);
    const totalWithDiscount = totalWithTax - discount;
    return totalWithDiscount + shipping;
};

export const calculateTax = (products, tax) => {
    const subtotal = products.reduce((sum, product) => sum + parseFloat(product.purchase_price * product.qty), 0);
    const taxAmount = (subtotal * tax / 100);
    return taxAmount
}

export const formattedNumber = (number) => {
    return number.toFixed(2);
}