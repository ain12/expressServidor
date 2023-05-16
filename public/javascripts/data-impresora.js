const impresoraSelect = document.getElementById("impresoraSelect");
const formulario = document.getElementById("formulario");
const btn = document.getElementById("btn");
const impresoras = document.getElementById("impresoras");
let spanContador = document.getElementById("spanContador");
let counter = 1;
//Obtener impresoras
const getImpresoras = async () => {
  impresoras.innerHTML = "";
  const res = await fetch("/impresora", {
    method: "GET",
  });
  const data = await res.json();

  data.forEach(async (impresora) => {
    let listaHTML = "";
    const id = impresora.id;
    const queue = JSON.parse(sessionStorage.getItem(`cola-${id}`)) || [];
    if (queue.length > 0) {
      listaHTML = queue
        .map((item) => {
          if (item !== "") {
            return `<li>${item}</li>`;
          }
        })
        .join("");
    }
    impresoras.innerHTML += `
    <div class="col-sm-4">
      <div class="row">
        <a href="#" id="cola-${id}" onclick="imprimirCola(${id})"><img src="/images/${id}.jpg" alt="Procesa cola"></a>
      </div>
      <div class="row">
        <div class="toner">
          <div class="tinta" style="background-color:black">${impresora.negro.toFixed(
            2
          )}%</div>
          <div class="tinta" style="background-color:yellow">${impresora.amarillo.toFixed(
            2
          )}%</div>
          <div class="tinta" style="background-color:cyan">${impresora.cian.toFixed(
            2
          )}%</div>
          <div class="tinta" style="background-color:magenta">${impresora.magenta.toFixed(
            2
          )}%</div>
        </div>
      </div>
      <div class="row">
        <ul class="list-group" id="impresora-${id}">
          ${listaHTML}
        </ul>
      </div>
    </div>
    `;
  });
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const impresora = impresoraSelect.value;
  const hoja = document.getElementById("hoja").value;
  if (hoja) {
    const impcola = document.getElementById(`impresora-${impresora}`);
    let queue = JSON.parse(sessionStorage.getItem(`cola-${impresora}`)) || [];
    queue.push(hoja);
    sessionStorage.setItem(`cola-${impresora}`, JSON.stringify(queue));
    impcola.innerHTML = queue
      .map((item) => {
        if (item !== "") {
          return `<li>${item}</li>`;
        }
      })
      .join("");
  }
});
//Imprimir cola
const imprimirCola = async (id) => {
  const impcola = document.getElementById(`impresora-${id}`);
  const res = await fetch(`/impresora/${id}`, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  const queue = JSON.parse(sessionStorage.getItem(`cola-${id}`)) || [];
  let palabra;
  if (queue.length > 0) {
    palabra = queue[0];
    const newQueue = queue.slice(1);
    sessionStorage.setItem(`cola-${id}`, JSON.stringify(newQueue));

    const listaItems = impcola.getElementsByTagName("li");
    impcola.removeChild(listaItems[0]);

    data.forEach((impresora) => {
      impresora.negro -= palabra.length * 1.2;
      impresora.amarillo -= palabra.length * 0.2;
      impresora.cian -= palabra.length * 0.5;
      impresora.magenta -= palabra.length * 0.7;
    });
  }

  const res2 = await fetch(`/impresora/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });

  spanContador.innerHTML = counter++;

  getImpresoras();
};

getImpresoras();
