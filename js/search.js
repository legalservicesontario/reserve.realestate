function renderFeatured(listings){
  const container = document.getElementById('featured');
  if(!container){ return; }

  container.innerHTML = '';
  listings.filter(l => l.featured).slice(0,6).forEach(p => {
    const title = window.escapeHtml ? window.escapeHtml(p.title) : String(p.title ?? '');
    const location = window.escapeHtml ? window.escapeHtml(p.location) : String(p.location ?? '');
    const image = window.safeImageUrl ? window.safeImageUrl(p.images && p.images[0]) : '';
    const detailsUrl = window.propertyUrl ? window.propertyUrl(p.id) : `property.html?id=${encodeURIComponent(p.id)}`;
    const el = document.createElement('article');
    el.className = 'bg-white rounded shadow overflow-hidden';
    el.innerHTML = `
      <a href="${detailsUrl}" class="block">
        <div class="aspect-[4/3] bg-gray-100 overflow-hidden"><img src="${image}" class="w-full h-full object-cover" alt="${title}"/></div>
        <div class="p-3">
          <p class="font-bold">$${p.price.toLocaleString()}</p>
          <h3 class="text-sm">${title}</h3>
          <p class="text-xs text-gray-600">${location}</p>
        </div>
      </a>`;
    container.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  if(!window.fetchProperties){ return; }
  const props = await window.fetchProperties();
  renderFeatured(props);

  const form = document.getElementById('searchForm');
  if(!form){ return; }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('q').value.trim();
    const purpose = document.getElementById('purpose').value;

    if(q){
      const match = props.find(p => p.id===q || p.title.toLowerCase().includes(q.toLowerCase()));
      if(match){
        window.location.href = window.propertyUrl ? window.propertyUrl(match.id) : `property.html?id=${encodeURIComponent(match.id)}`;
        return;
      }
    }

    const params = new URLSearchParams();
    if(q) params.set('q',q);
    if(purpose) params.set('purpose',purpose);
    window.location.href = `map.html?${params.toString()}`;
  });
});
