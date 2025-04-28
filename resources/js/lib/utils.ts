import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const validateImageFile = (file: File, maxSizeMB: number = 5): boolean => {
    if (!file) {
        console.error('No file uploaded.');
        return false;
    }

    if (!file.type.startsWith('image/')) {
        console.error('Invalid file type. Please upload an image.');
        return false;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        console.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
        return false;
    }

    return true;
};
export const formattedNumber = (number: number, decimals: number = 2): string => {
    return number.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};
