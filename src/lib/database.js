export const productDatabase = [
    { carousel:['dbz.jpg'], stock: '300', imageType: 'jpg', productCode: 'DBZ', description: 'Dragonball Z Kai - Saga de Boo',   unitPrice: 29.90 },
    { carousel:['fma.jpg'], stock: '300', imageType: 'jpg', productCode: 'FMA', description: 'Full Metal Alchemist Brotherhood', unitPrice: 19.50 },
    { carousel:['sky.jpg', 'opm.jpg', 'opm.jpg'], stock: '300', imageType: 'jpg', productCode: 'SKY', description: 'Skyfall',    unitPrice: 22.50 },
    { carousel:['opm.jpg'], stock: '300', imageType: 'jpg', productCode: 'OPM', description: 'One Punch Man',                    unitPrice: 25.70 },
    { carousel:['swt.jpg'], stock: '300', imageType: 'jpg', productCode: 'SWT', description: 'Star Wars épisode V',              unitPrice: 29.90 },
    { carousel:['Wano_Country_Arc.png', 'One_piece_gold.png', 'One_piece_Stamped.png'], stock: '300', imageType: 'png', productCode: 'Wano_Country_Arc', description: 'One Piece Wano',              unitPrice: 29.90 }
];


export const voucherDatabase = [
    { 'NOEL2020'     : 0.12 },
    { 'ANNIVERSAIRE' : 0.15 },
    { 'SOLDES_ETE'   : 0.25 }
];

export function findProduct(productCode) {
    return productDatabase.find(e => productCode === e.productCode)
}

export function findVoucher(voucherCode) {
}