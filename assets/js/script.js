//   3. Una vez ingresado el número del héroe a buscar y después de realizar un click sobre el botón de búsqueda, 
// se debe capturar y validar la información para evitar búsquedas que contengan algún texto diferente a números
//  y mostrar la información dinámicamente mediante la librería jQuery y CanvasJS con un gráfico de pastel. Para lograr todo esto se debe: (8 Puntos) 

//FUNCIÓN PRINCIPAL DE JQUERY

$(function () {

  //DECLARACION DE FUNCIONES


  //FUNCION DE IMPRIMIR LA TARJETA o soN LASSSSSSSSSS TARJETASSSSS??????
  //recibe la response del ajax como parametro
  function imprimirTarjeta(response) {
    const tarjeta = $('#card');
    //TARJETA
    //PONER UN IF AQUI PARA QUE ME MUESTRE UN MENSAJE SI ALGUN DATO NO EXISTE por ejemplo en el 7 los relatives son -, entonces decir algo como... "no tiene"
    //USANDO OPERADOR TERNARIO???
    let relativesText = response.connections.relatives;
    if (relativesText === '-') {
      relativesText = "No tiene información sobre familiares.";
    }

    tarjeta.html(`
              <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${response.image.url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${response.name}</h5>
                    <p class="card-text">${relativesText}</p>
                    <p class="card-text"><small class="text-body-secondary">DEMAS PROPIEDADES</small></p>
                  </div>
                </div>
              </div>
            </div>
              `);
  }

  //3.1 Capturar la información ingresada mediante eventos del DOM con jQuery.(1 Punto)
  //FUNCIÓN DESDE EL EVENTO SUBMIT DEL FORMULARIO
  $('form').submit(function (event) {
    event.preventDefault();
    // const valorInput = $('#superhero').val();
    //llamar a  función del botón
  });

  //3.4 Consultar la API mediante AJAX con la sintaxis de jQuery. (1 Punto)
  //FUNCIÓN DE SOLICITUD AJAX  
  function requestAjax(valorInput) {
    $.ajax({
      url: `https://www.superheroapi.com/api.php/4905856019427443/${valorInput}`,
      type: 'GET',
      success: function (response) {
        console.log("Objeto response: ", response)
        // Actualizar el contenido de la clase text
        $('.text').text(JSON.stringify(response.name));

        //3.5 Renderizar la información recibida por la API dinámicamente utilizando tarjetas (card) de Bootstrap. (1 Punto)
        imprimirTarjeta(response);

        // Crear el gráfico con la función y renderizarlo
        let chart = crearGrafico(response);
        chart.render();
      },
      dataType: 'json',
      error: function (error) {
        console.error("Error al obtener los datos:", error);
        $('.text').text("Error al obtener los datos"); // Si hay un error, mostrar un mensaje en la clase text
      }
    });
  }

  //FUNCION CLICK EN EL BOTÓN QUE LLAMA A FUNCION AJAX
  $('button').click(function () {
    const valorInput = $('#superhero').val();
    console.log(valorInput);
    //3.3 Comprobar la información ingresada por el usuario, la cual, solo debe ser un número. (0.5 Puntos)
    //HACER UN IF PARA VALIDAR:
    //-QUE SOLO HAYAN INGRESADO NUMEROS 
    //-QUE NO SUPERE LOS 732
    if (/^\d+$/.test(valorInput) && valorInput < 733) {
      //LLAMADO A LA FUNCIÓN QUE HACE LA PETICIÓN AJAX
      requestAjax(valorInput);
    } else {
      //MENSAJE DE ERROR SI LO UNGRESADO NO ES NÚMERO NI ESTÁ ENTRE 1 Y 732
      alert("Por favor, ingrese solo números entre 1 y 732");
    }
  });

  //FUNCION QUE IMPRIME EL GRAFICO varias que imprimen o una sola??? creo que quiere una sola que imprima todo dijo una vez
  //FUNCION QUE LLAMA AL GRAFICO DE CANVASJS esto tiene que ser una función llamada desde el click del botón
// Función para crear el gráfico
function crearGrafico(response) {
  let chart = new CanvasJS.Chart("chartContainer1", {
    animationEnabled: true,
    title:{
      text: `ESTADÍSTICAS DE PODER PARA ${response.name}`,
      horizontalAlign: "left"
    },
    data: [{
      type: "pie",
      startAngle: 60,
      //innerRadius: 60,
      indexLabelFontSize: 17,
      indexLabel: "{label} - #percent%",
      toolTipContent: "<b>{label}:</b> {y} (#percent%)",
      dataPoints: [
        { y: 67, label: "Inbox" },
        { y: 28, label: "Archives" },
        { y: 10, label: "Labels" },
        { y: 7, label: "Drafts"},
        { y: 15, label: "Trash"},
        { y: 6, label: "Spam"}
      ]
    }]
  });

  return chart;
}

});


//3.2 Implementar funciones para separar la captura de la información ingresada por el usuario con la consulta a la API. (1 Punto)
//3.6 Utilizar ciclos y métodos para arreglos u objetos que permitan recorrer, ordenar y mostrar la información. (1 Punto)

//en esta es lo de los datapoints para el grafico

//3.7 Emplear la librería de gráficos CanvasJS, para mostrar dinámicamente información específica de cada superhéroe.  (2 Puntos)
//3.8 Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda. (0.5 Puntos)

//estos son los if, aparte del if del input de los id 
