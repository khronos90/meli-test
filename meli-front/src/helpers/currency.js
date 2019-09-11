export const formatMoney = ({ currency, amount, decimals }) => {
  let correctedDecimals = decimals > 9 ? decimals : `0${decimals}`
  let formattedAmount;
  switch (currency){
    case '$':
      formattedAmount = new Intl.NumberFormat('es-AR',
        { style: 'decimal', maximumFractionDigits: 0 })
        .format(amount)
      return `${currency} ${formattedAmount},${correctedDecimals}`;
    case 'U$S':
      formattedAmount = new Intl.NumberFormat('en-US',
        { style: 'decimal', maximumFractionDigits: 0 })
        .format(amount)
      return `${currency} ${formattedAmount}.${correctedDecimals}`
  }
  return ``;
}