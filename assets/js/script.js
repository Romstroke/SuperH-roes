//   3. Una vez ingresado el número del héroe a buscar y después de realizar un click sobre el botón de búsqueda, 
// se debe capturar y validar la información para evitar búsquedas que contengan algún texto diferente a números
//  y mostrar la información dinámicamente mediante la librería jQuery y CanvasJS con un gráfico de pastel. Para lograr todo esto se debe: (8 Puntos) 

//EVENTO LOAD DE WINDOW PARA GARANTIZAR QUE TODO EL HTML ESTÉ CARGADO INCLUIDOS LOS SCRIPTS

window.onload = function () {

  //FUNCIÓN PRINCIPAL DE JQUERY

  $(function () {

    //DECLARACION DE FUNCIONES

    //FUNCION DE IMPRIMIR LA TARJETA 
    //recibe la response del ajax como parametro
    function imprimirTarjeta(response) {
      const tarjeta = $('#card');
      //TARJETA
      //PONER UN IF AQUI PARA QUE ME MUESTRE UN MENSAJE SI ALGUN DATO NO EXISTE por ejemplo en el 7 los relatives son -, entonces decir algo como... "no tiene"
      //USANDO OPERADOR TERNARIO
      const conexiones = response.connections.relatives;
      const editorial = response.biography.publisher;
      const ocupacion = response.work.occupation;
      const primeraAparicion = response.biography['first-appearance'];
      const altura = response.appearance.height;
      const peso = response.appearance.weight;
      const alianzas = response.connections['group-affiliation'];


      tarjeta.html(`
                <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${response.image.url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Nombre: ${response.name}</h5>
                      <p class="card-text">Conexiones: ${conexiones == "-" ? "No registra conexiones." : conexiones}</p>
                      <p class="card-text"><small class="text-body-secondary">Publicado por: ${editorial == "null" ? "No registra editorial." : editorial} </small></p>
                      <p class="card-text">Ocupación: ${ocupacion == "-" ? "No registra ocupación." : ocupacion}</p>
                      <p class="card-text">Primera aparición: ${primeraAparicion == "-" ? "No registra primera aparición." : primeraAparicion}</p>
                      <p class="card-text">Altura: ${altura == "-" || "0 cm" ? "No registra altura." : altura}</p>
                      <p class="card-text">Peso: ${peso == "-" || "0 cm" ? "No registra peso." : peso}</p>
                      <p class="card-text">Alianzas: ${alianzas == "-" ? "No registra alianzas." : alianzas}</p>
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
          crearGrafico(response.powerstats, response.name);
          // Crear el gráfico con la función y renderizarlo
          // let chart = crearGrafico(response);
          // chart.render();
        },
        dataType: 'json',
        error: function (error) {
          console.error("Error al obtener los datos:", error);
          $('.text').text("Error al obtener los datos"); // Si hay un error, mostrar un mensaje en la clase text
          crearGraficoError();
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
      if (/^\d+$/.test(valorInput) && valorInput > 0 && valorInput < 733) {
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

    function crearGrafico(powerstats, nombre) {
      let dataPoints = [];
      // for (const [key, value] of Object.entries(powerstats)) {
      //   dataPoints.push({ label: key, y: parseInt(value) || 0 });
      // }

      for (const key in powerstats) {
        if (powerstats.hasOwnProperty(key)) {
          const value = powerstats[key];
          dataPoints.push({ label: key, y: parseInt(value) || 0});
        }
      }

      let options = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: `ESTADÍSTICAS DE PODER PARA ${nombre.toUpperCase()}`,
          horizontalAlign: "left"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          legendText:"{label} {y}",
          startAngle: 240,
          yValueFormatString: "##0",
          indexLabel: "{label} {y}",
          dataPoints: dataPoints
        }]
      };

      let chart = new CanvasJS.Chart("chartContainer1", options);
      chart.render();
    }

    function crearGraficoError() {
      let options = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Error al obtener los datos",
          horizontalAlign: "left"
        },
        data: []
      };

      let chart = new CanvasJS.Chart("chartContainer1", options);
      chart.render();
    }


  });
};




//3.2 Implementar funciones para separar la captura de la información ingresada por el usuario con la consulta a la API. (1 Punto)
//3.6 Utilizar ciclos y métodos para arreglos u objetos que permitan recorrer, ordenar y mostrar la información. (1 Punto)

//en esta es lo de los datapoints para el grafico

//3.7 Emplear la librería de gráficos CanvasJS, para mostrar dinámicamente información específica de cada superhéroe.  (2 Puntos)
//3.8 Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda. (0.5 Puntos)

//estos son los if, aparte del if del input de los id 
