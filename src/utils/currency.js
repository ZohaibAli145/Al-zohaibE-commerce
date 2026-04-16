// Currency conversion utilities
export const EXCHANGE_RATE = 280; // 1 USD = 280 PKR

export const convertToPKR = (usdAmount) => {
  return usdAmount * EXCHANGE_RATE;
};

export const formatPKR = (amount) => {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};

export const formatPKRShort = (amount) => {
  if (amount >= 1000000) {
    return `Rs. ${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `Rs. ${(amount / 1000).toFixed(1)}K`;
  }
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};

export const getPKRPriceWithDiscount = (usdPrice, discountPercent) => {
  const discountedPrice = usdPrice * (1 - discountPercent / 100);
  return convertToPKR(discountedPrice);
};

export const calculateSavingsPKR = (originalPrice, discountedPrice) => {
  return (originalPrice - discountedPrice) * EXCHANGE_RATE;
};

// Generate consistent discount based on product ID
export const generateConsistentDiscount = (productId, minDiscount = 10, maxDiscount = 40) => {
  // Use product ID to generate consistent discount
  const seed = productId.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const range = maxDiscount - minDiscount;
  return minDiscount + (seed % (range + 1));
};

// Get pricing info for a product (consistent across app)
export const getProductPricing = (product, discountType = 'normal') => {
  let discount;
  
  switch(discountType) {
    case 'deals':
      discount = generateConsistentDiscount(product.id, 15, 55); // 15-55% for deals
      break;
    case 'wishlist':
      discount = generateConsistentDiscount(product.id, 20, 30); // 20-30% for wishlist
      break;
    default:
      discount = generateConsistentDiscount(product.id, 10, 40); // 10-40% normal
  }
  
  const originalPrice = product.price;
  const discountedPrice = product.price * (1 - discount / 100);
  
  return {
    discount,
    originalPrice,
    discountedPrice,
    originalPricePKR: originalPrice * EXCHANGE_RATE,
    discountedPricePKR: discountedPrice * EXCHANGE_RATE,
    savingsPKR: (originalPrice - discountedPrice) * EXCHANGE_RATE,
    savingsPercent: discount
  };
};
