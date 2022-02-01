'use strict'

const data = [
  {
    'company': 'Centro comercial Moctezuma',
    'contact': 'Francisco Chang',
    'country': 'Mexico'
  },
  {
    'company': 'Ernst Handel',
    'contact': 'Roland Mendel',
    'country': 'Germany'
  },
  {
    'company': 'Island Trading',
    'contact': 'Maria Bennett',
    'country': 'UK'
  },
  {
    'company': 'Laughing Bacchus Winecellars',
    'contact': 'Yoshi Tannamuri',
    'country': 'Canada'
  },
  {
    'company': 'Magazzini Alimentari Riuniti',
    'contact': 'Giovanni Rovelli',
    'country': 'Italy'
  },
  {
    'company': 'Alfreds Futterkiste',
    'contact': 'Maria Anders',
    'country': 'Germany'
  }
];

const filters = {
  company: '',
  contact: '',
  country: ''
};


let fields = document.querySelectorAll('[data-filter]');

fields.forEach(item => item.addEventListener('input', filterData));

function filterData(e) {
  const filterColumnName = e.target.getAttribute('data-filter');
  const inputValue = e.target.value;
  let filteredData = data;

  filters[filterColumnName] = inputValue;
  
  Object.keys(filters).forEach(filterName => {
    filteredData = filteredData.filter(item => item[filterName].includes(filters[filterName]))
  });

  tableRender(filteredData);
};

function tableRender(data) {
  let table = document.querySelector('.table-body');
  let main = '';
  
  for (var i in data) {
    let row = `<tr>
                <td>${data[i].company}</td>
                <td>${data[i].contact}</td>
                <td>${data[i].country}</td>
              </tr>`;
  
    main += row;
  }
  
  table.innerHTML = main;  
}

tableRender(data);