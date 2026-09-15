async function fetchProperties(){
  try{
    const res = await fetch('data/properties.json');
    const js = await res.json();
    return js.listings || [];
  }catch(e){
    console.error(e);
    return [];
  }
}
window.fetchProperties = fetchProperties;
