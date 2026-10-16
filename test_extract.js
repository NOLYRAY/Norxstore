const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function extract(startStr, endStr) {
  const s = html.indexOf(startStr);
  if (s === -1) throw new Error('Start not found: ' + startStr);
  const e = html.indexOf(endStr, s);
  if (e === -1) throw new Error('End not found: ' + endStr);
  return html.slice(s, e);
}

const code = `
let currentSelectedCountry = 'SG';
${extract('const I18N = {', 'function t(')}
${extract('function t(', 'const ALLOWED_COUNTRY_CODES')}
${extract('const DEFAULT_PRODUCTS = [', 'const DEFAULT_CAROUSEL')}
${extract('function getCategoryShortName', 'function enableHorizontalDragScroll')}

DEFAULT_PRODUCTS.forEach(p => {
  const nameSG = getProductName(p, 'SG');
  const descSG = getProductDesc(p, 'SG');
  console.log('ID ' + p.id + ': [' + p.name + '] -> [' + nameSG + ']');
  console.log('       [' + p.desc + '] -> [' + descSG + ']');
});
`;

fs.writeFileSync('temp_test.js', code);
