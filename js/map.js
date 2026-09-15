async function loadMap(){
  if(!window.fetchProperties || !window.L){ return; }
  const listings = await window.fetchProperties();
  const map = L.map('map').setView([18.6, -69.9], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);

  listings.forEach(p => {
    if(p.lat != null && p.lng != null){
      const title = window.escapeHtml ? window.escapeHtml(p.title) : String(p.title ?? '');
      const location = window.escapeHtml ? window.escapeHtml(p.location) : String(p.location ?? '');
      const detailsUrl = window.propertyUrl ? window.propertyUrl(p.id) : `property.html?id=${encodeURIComponent(p.id)}`;
      const marker = L.marker([p.lat,p.lng]).addTo(map);
      marker.bindPopup(`<strong>${title}</strong><br>${location}<br>$${p.price.toLocaleString()} ${p.saleOrRent=='rent'?'/month':''}<br><a href="${detailsUrl}">View</a>`);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadMap().catch(err => console.error(err));
});
