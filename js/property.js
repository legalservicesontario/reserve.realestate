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

  container.innerHTML = `
    <article class="bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold">${p.title}</h1>
      <p class="text-sm text-gray-600">${p.location} — ${p.type} — ${p.saleOrRent=='rent'?'For Rent':'For Sale'}</p>
      <div class="mt-4 grid gap-4">
        <img src="${p.images[0]}" alt="" class="w-full rounded object-cover max-h-72" />
        <p class="text-lg font-semibold">$${p.price.toLocaleString()} ${p.saleOrRent=='rent'?'/month':''}</p>
        <p class="text-gray-700">${p.description}</p>
        <ul class="mt-4 text-sm text-gray-700">
          <li><strong>Beds:</strong> ${p.beds}</li>
          <li><strong>Baths:</strong> ${p.baths}</li>
          <li><strong>Area:</strong> ${p.area_m2} m²</li>
        </ul>
        <div class="mt-4">
          <a href="https://wa.me/16478485997?text=I%20am%20interested%20in%20${encodeURIComponent(p.title)}" class="px-4 py-2 bg-green-500 text-white rounded mr-2">Contact via WhatsApp</a>
          <a href="#" class="px-4 py-2 bg-blue-600 text-white rounded">Request Visit</a>
        </div>
      </div>
    </article>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProperty().catch(console.error);
});
