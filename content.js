const convertMap = {
  USD: {
    JPY: 142.25,
    KRW: 1306.10,
    CNY: 7.18,
    VND: 23735,
    GBP: 0.78,
    USD: 1,
    EUR: 0.91,
    RUB: 96.29
  },
  JPY: {
    USD: 1 / 142.25,
    KRW: 9.18,
    CNY: 0.05,
    VND: 166.88,
    GBP: 0.0055,
    JPY: 1,
    EUR: 0.0064,
    RUB: 0.68
  },
  KRW: {
    USD: 1 / 1306.10,
    JPY: 1 / 9.18,
    CNY: 0.0055,
    VND: 18,
    GBP: 0.0006,
    KRW: 1,
    EUR: 0.00070,
    RUB: 0.074
  },
  CNY: {
    USD: 0.14,
    JPY: 19.82,
    KRW: 181.97,
    VND: 3307.65,
    GBP: 0.11,
    CNY: 1,
    EUR: 0.13,
    RUB: 13.35
  },
  VND: {
    JPY: 0.006,
    KRW: 0.055,
    CNY: 0.0003,
    VND: 1,
    GBP: 0.78,
    USD: 1 / 23735,
    EUR: 0.000038,
    RUB: 0.00404
  },
  GBP: {
    JPY: 181.29,
    KRW: 1664.77,
    CNY: 9.15,
    VND: 30262.13,
    GBP: 1,
    USD: 1.28,
    EUR: 1.16,
    RUB: 122.29
  },
  EUR: {
    JPY: 156.31,
    KRW: 1437.9,
    CNY: 7.91,
    VND: 25600,
    GBP: 0.86,
    USD: 1.1,
    EUR: 1,
    RUB: 105.59
  },
  RUB: {
    JPY: 1.48,
    KRW: 13.58,
    CNY: 0.075,
    VND: 246.76,
    GBP: 0.0082,
    USD: 0.010,
    EUR: 0.0095,
    RUB: 1
  }
}

const symbolMap = {
  JPY: "¥",
  KRW: "₩",
  CNY: "CN¥",
  VND: "₫",
  GBP: "£",
  USD: "$",
  EUR: "€",
  RUB: "₽"
}

let from = "USD";
let to = "VND";
let closeState = false;

function createElementFromHTML(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

const converting = () => {
  const blocks = document.querySelectorAll(`
  td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeSmall.jss26.css-nw9fri p.whitespace-nowrap,
  td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeSmall.jss18.css-nw9fri p.whitespace-nowrap,
  td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeSmall.jss18.css-nw9fri p.text-primary span.whitespace-nowrap:first-child,
  td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeSmall.jss26.css-nw9fri,
  td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeSmall.css-nw9fri,
  td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeSmall.css-nw9fri p.text-primary span.whitespace-nowrap:first-child ,
  div.flex.flex-col.flex-grow.text-center.font-normal.leading-relaxed.text-white.py-3.rounded p.text-2xl.font-normal,
  td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignCenter.MuiTableCell-sizeSmall.css-q06iui,
  td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeSmall.css-4m4gm6,
  div.absolute.bottom-0.mb-12.w-full.text-white.text-xs.font-semibold p.text-sm,
  div.rounded-lg.p-6.text-white.flex-1 p.text-xl.font-bold.text-center,
  div.flex.flex-col.flex-grow.font-normal.leading-relaxed.border.border-gray-400.rounded.py-3.px-4 p.text-2xl.text-center,
  div.flex.flex-col.flex-grow.text-center.font-normal.leading-relaxed.text-white.py-3.rounded p.text-2xl font-normal,
  td.MuiTableCell-root.MuiTableCell-footer.MuiTableCell-alignRight.MuiTableCell-sizeSmall.jss30.css-75yi8i p.whitespace-nowrap,
  td.MuiTableCell-root.MuiTableCell-footer.MuiTableCell-alignRight.MuiTableCell-sizeSmall.jss30.css-75yi8i p.text-primary span.whitespace-nowrap:first-child
  `
  );
  blocks.forEach(block => {
    if (block.textContent[0] === symbolMap[from] || block.textContent[1] === symbolMap[from] || !isNaN(block.textContent[0])) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: to
      });
      if (checkRate.checked) {
        block.textContent = `${formatter.format(
          parseFloat(block.textContent.split(symbolMap[from])[!isNaN(block.textContent[0]) ? 0 : 1].replaceAll(",", ""))
          *
          parseFloat(rateInput.value)
        )}`;
      } else {
        block.textContent = `${formatter.format(
          parseFloat(block.textContent.split(symbolMap[from])[!isNaN(block.textContent[0]) ? 0 : 1].replaceAll(",", ""))
          *
          parseFloat(convertMap[from][to])
        )}`;
      }

    }
  });
}

const convertBtn = createElementFromHTML('<button class="injected-button" id="inject-convert-btn">' +
  'Convert' +
  '</button>'
);

convertBtn.addEventListener('click', converting);

const fromSelect = createElementFromHTML(
  '<select class="inject-convert-select" name="from" id="from">' +
  '<option value="USD">USD</option>' +
  '<option value="VND">VND</option>' +
  '<option value="JPY">JPY</option>' +
  '<option value="CNY">CNY</option>' +
  '<option value="KRW">KRW</option>' +
  '<option value="GBP">GBP</option>' +
  '<option value="EUR">EUR</option>' +
  '</select>'
);
fromSelect.addEventListener("change", (e) => {
  from = e.target.value;
  quickConvertInput.placeholder = `${symbolMap[from]}1000.00 to ${symbolMap[to]}???`
});

const toSelect = createElementFromHTML(
  '<select class="inject-convert-select" name="to" id="to">' +
  '<option value="VND">VND</option>' +
  '<option value="USD">USD</option>' +
  '<option value="JPY">JPY</option>' +
  '<option value="CNY">CNY</option>' +
  '<option value="KRW">KRW</option>' +
  '<option value="GBP">GBP</option>' +
  '<option value="EUR">EUR</option>' +
  '</select>');
toSelect.addEventListener("change", (e) => {
  to = e.target.value;
  quickConvertInput.placeholder = `${symbolMap[from]}1000.00 to ${symbolMap[to]}???`
});

const sang = createElementFromHTML('<p class="injected-p">To</p>')

const closeBtn = createElementFromHTML(`<button class="injected-button" id="close-btn">${"<"}</button>`);

const container1 = createElementFromHTML(`<div class="inject-convert-container"></div>`);

const agent = document.createElement("div");

const container2 = createElementFromHTML(`<div class="inject-convert-container"></div>`);
const checkRate = createElementFromHTML(`
  <input type="checkbox" name="useRate" id="useRate"></input>
`);
const tyGia = createElementFromHTML(`<p class="injected-p">Ex-rate: </p>`);
const rateInput = createElementFromHTML(`
<input class="injected-number-input" type="number" name="rate" id="rate" placeholder="VD: 23000.00"></input>
`);

const container3 = createElementFromHTML(`
<div class="inject-convert-container">
<p class="injected-p">Manual: </p></div>
`);

const quickConvertInput = createElementFromHTML(`
<input class="injected-number-input" type="number" name="quickconvert" id="quickconvert" placeholder="${symbolMap[from]}1000.00 to ${symbolMap[to]}???">
`);

const quickConvertBtn = createElementFromHTML(`<button class="injected-button" id="smallConvert">Convert</button>`);
quickConvertBtn.addEventListener("click", () => {
  if (isNaN(quickConvertInput.value)) return;
  if (checkRate.checked) {
    quickConvertInput.value = parseFloat(quickConvertInput.value) * parseFloat(rateInput.value);
  } else {
    quickConvertInput.value = parseFloat(quickConvertInput.value) * parseFloat(convertMap[from][to]);
  }
})

const init = () => {

  agent.id = "inject-content-script-container";

  container1.appendChild(fromSelect);
  container1.appendChild(sang);
  container1.appendChild(toSelect);
  container1.appendChild(convertBtn);
  closeBtn.addEventListener("click", () => {
    agent.classList.toggle("hidden");
    closeState = !closeState;
    closeBtn.textContent = closeState ? ">" : "<";
  });

  agent.appendChild(closeBtn);

  container2.appendChild(checkRate);
  container2.appendChild(tyGia);
  container2.appendChild(rateInput);

  container3.appendChild(quickConvertInput);
  container3.appendChild(quickConvertBtn);

  agent.appendChild(container1);
  agent.appendChild(container3);
  agent.appendChild(container2);
  document.body.appendChild(agent);
}

init();