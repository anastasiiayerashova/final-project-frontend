export const formattedErrorKey = (e) => {
  // console.log('ERROR====>>>', e);
  return e
    .replace(/[^\w\s]/g, '_')
    .replace(
      /\s+/g,
      '_',
    ); /*Для того щоб перетворити повідомлення з серверу в ключ для і18n*/
};
