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

function escapeHtml(value){
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeImageUrl(value){
  const raw = String(value ?? '').trim();
  if(!raw){ return ''; }
  if(raw.startsWith('/')){ return raw; }
  if(raw.startsWith('./') || raw.startsWith('../')){ return raw; }
  try{
    const parsed = new URL(raw, window.location.origin);
    if(parsed.protocol === 'http:' || parsed.protocol === 'https:'){
      return parsed.href;
    }
  }catch(_){
    return '';
  }
  return '';
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
window.escapeHtml = escapeHtml;
window.safeImageUrl = safeImageUrl;
