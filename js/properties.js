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

function propertyUrl(propertyId){
  const dedicatedPages = {
    'cocotal-golf-villa': 'property-cocotal-villa.html',
    'los-corales-beachfront': 'property-los-corales-condo.html',
    'tamarindo-ocean-villa': 'property-tamarindo-villa.html'
  };
  return dedicatedPages[propertyId] || `property.html?id=${encodeURIComponent(propertyId)}`;
}

window.fetchProperties = fetchProperties;
window.propertyUrl = propertyUrl;
