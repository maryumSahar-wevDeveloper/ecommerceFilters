export const fetchProducts = () => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    resolve({ data });
  });
};




export const fetchedProductByFilters = (filter) => {

    if(!filter || typeof filter !== 'Object'){
        throw new Error('Invalid filter: must be an object');
    }

    const pramas = new URLSearchParams();
    for (const key in filter) {
       if(filter[key] !==undefined && filter[key] !== null){
         pramas.append(key, filter[key]);
       }  
    }
    const queryString = pramas.toString();
    console.log('queryString', queryString);
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:3000/products?${queryString}`);
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Filter Output', data);
      resolve({ data });
    });
  };