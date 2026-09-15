function qParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

async function renderProperty(){
  const container = document.getElementById('property');
  if(!container || !window.fetchProperties){ return; }

  const staticId = container.dataset.propertyId;
  const id = staticId || qParam('id');
  const listings = await window.fetchProperties();
  const p = listings.find(x => x.id === id);

  if(!p){
    container.innerHTML = '<p class="text-center">Property not found.</p>';
    return;
  }

  const title = window.escapeHtml ? window.escapeHtml(p.title) : String(p.title ?? '');
  const location = window.escapeHtml ? window.escapeHtml(p.location) : String(p.location ?? '');
  const type = window.escapeHtml ? window.escapeHtml(p.type) : String(p.type ?? '');
  const description = window.escapeHtml ? window.escapeHtml(p.description) : String(p.description ?? '');
  const image = window.safeImageUrl ? window.safeImageUrl(p.images && p.images[0]) : '';
  const whatsappTitle = encodeURIComponent(String(p.title ?? ''));

  container.innerHTML = `
    <article class="bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold">${title}</h1>
      <p class="text-sm text-gray-600">${location} — ${type} — ${p.saleOrRent=='rent'?'For Rent':'For Sale'}</p>
      <div class="mt-4 grid gap-4">
        <img src="${image}" alt="" class="w-full rounded object-cover max-h-72" />
        <p class="text-lg font-semibold">$${p.price.toLocaleString()} ${p.saleOrRent=='rent'?'/month':''}</p>
        <p class="text-gray-700">${description}</p>
        <ul class="mt-4 text-sm text-gray-700">
          <li><strong>Beds:</strong> ${p.beds}</li>
          <li><strong>Baths:</strong> ${p.baths}</li>
          <li><strong>Area:</strong> ${p.area_m2} m²</li>
        </ul>
        <div class="mt-4">
          <a href="https://wa.me/16478485997?text=I%20am%20interested%20in%20${whatsappTitle}" class="px-4 py-2 bg-green-500 text-white rounded mr-2">Contact via WhatsApp</a>
          <a href="#" class="px-4 py-2 bg-blue-600 text-white rounded">Request Visit</a>
        </div>
      </div>
    </article>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProperty().catch(console.error);
});
