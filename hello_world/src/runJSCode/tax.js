// @ts-nocheck
// turn off type checking for this file, which is enabled using checkJS: true in tsconfig.json
// Alternative: JSDoc comments can be used to describe types in JavaScript code
//     but must not use `@ts-nocheck` tag

// Describing types using JSDoc
/**
 * Calculate income tax
 * @param {number} income - Net salary after expenses
 * @returns {number}
*/
export function calculateTax(income) {
    return income * 0.3;
}

export function calculateVat(price) {
    return price * 0.15;
}