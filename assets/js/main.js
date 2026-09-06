// main client JS: fetch featured properties and wire search
async function fetchProperties(){
  try{
    const res = await fetch('data/properties.json');
    const js = await res.json();
    return js.listings || [];
  }catch(e){console.error(e); return []}
}

function renderFeatured(listings){
  const container = document.getElementById('featured');
  container.innerHTML = '';
  listings.filter(l=>l.featured).slice(0,6).forEach(p=>{
    const el = document.createElement('article');
    el.className = 'bg-white rounded shadow overflow-hidden';
    el.innerHTML = `
      <a href="property.html?id=${p.id}" class="block">
        <div class="aspect-[4/3] bg-gray-100 overflow-hidden"><img src="${p.images[0]}" class="w-full h-full object-cover" alt="${p.title}"/></div>
        <div class="p-3">
          <p class="font-bold">$${p.price.toLocaleString()}</p>
          <h3 class="text-sm">${p.title}</h3>
          <p class="text-xs text-gray-600">${p.location}</p>
        </div>
      </a>`;
    container.appendChild(el);
  })
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const props = await fetchProperties();
  renderFeatured(props);

  const form = document.getElementById('searchForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const q = document.getElementById('q').value.trim();
    const purpose = document.getElementById('purpose').value;
    // simple search: if q matches id, go to property
    if(q){
      const match = props.find(p=>p.id===q || p.title.toLowerCase().includes(q.toLowerCase()));
      if(match){ window.location.href = `property.html?id=${match.id}`; return; }
    }
    // otherwise go to map with query params
    const params = new URLSearchParams();
    if(q) params.set('q',q);
    if(purpose) params.set('purpose',purpose);
    window.location.href = `map.html?`+params.toString();
  })
})
