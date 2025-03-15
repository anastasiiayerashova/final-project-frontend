export const formattedErrorKey = (e) => {
  console.log('ERROR====>>>', e);

   if (typeof e !== 'string') {
        return 'try_again'; // Дефолтный ключ ошибки, если e не строка
  }
  
  return e
    .replace(/[^\w\s]/g, '_')
    .replace(
      /\s+/g,
      '_',
    ); /*Для того щоб перетворити повідомлення з серверу в ключ для і18n*/
};