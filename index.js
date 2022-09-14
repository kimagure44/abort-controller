import { API_SERVICES, ABORT } from "./api.js";

(async () => {
  const search = document.querySelector('#search');
  const type = document.querySelector('#typeSearch');
  const result = document.querySelector('.result');

  const showResults = (payload) => {
    let info = '';
    payload.forEach(item => {
      info += '<ul><li><ul>';
      Object.entries(item).forEach(iItem => {
        info += `<li><b>${iItem[0]}:</b> ${iItem[1]}</li>`;
      });
      info += '</ul></li></ul>';
    });
    result.innerHTML = info;
  };

  const allServices = await API_SERVICES.getServices();
  Object.keys(allServices).forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.innerHTML = item;
    type.appendChild(option);
  });

  search.addEventListener('keyup', async function() {
    const search = `${allServices[type.value]}?search=${this.value}`;
    if (this.value.length > 0) {
      try {
        ABORT.abort();
        const { signal } = ABORT.new();
        const { results } = await API_SERVICES.getServices(search, signal);
        showResults(results);
      } catch(err) {
        console.log('Fetch canceled', err);
      }
    }
  });
  
})();