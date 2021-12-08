export const formatPrice = (number) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
    }).format(number / 100)
  }

export const getUniqueValues = () => {}
