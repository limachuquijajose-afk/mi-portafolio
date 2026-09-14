const productos = [
  { nombre: "Polo TECSUP", precio: 25.00, cantidad: 2 },
  { nombre: "Taza TECSUP", precio: 18.00, cantidad: 1 }
];

function calcularTotal(lista) {
  let total = 0;
  for (const producto of lista) {
    total = total + producto.precio;
  }
  return total;
}

document.getElementById("total").textContent =
  "Total: S/ " + calcularTotal(productos).toFixed(2);
