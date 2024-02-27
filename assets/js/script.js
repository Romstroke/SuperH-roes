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
      //PONER UN IF AQUI PARA QUE ME MUESTRE UN MENSAJE SI ALGUN DATO NO EXISTE
      //USANDO OPERADOR TERNARIO

      tarjeta.html(`
                <h2 class="display-6 fw-bold">SuperHero encontrado</h2>
                <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${response.image.url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Nombre: ${response.name}</h5>
                      <p class="card-text">Conexiones: ${response.connections.relatives === "-" ? "No registra conexiones." : response.connections.relatives}</p>
                      <p class="card-text"><small class="text-body-secondary">Publicado por: ${response.biography.publisher === "null" ? "No registra editorial." : response.biography.publisher} </small></p>
                      <p class="card-text">Ocupación: ${response.work.occupation === "-" ? "No registra ocupación." : response.work.occupation}</p>
                      <p class="card-text">Primera aparición: ${response.biography['first-appearance'] === "-" ? "No registra primera aparición." : response.biography['first-appearance']}</p>
                      <p class="card-text">Altura: ${response.appearance.height[0] === "-" && response.appearance.height[1] === "0 cm" ? "No registra altura." : `${response.appearance.height[0]} - ${response.appearance.height[1]}`}</p>
                      <p class="card-text">Peso: ${response.appearance.weight[0] === "- lb" && response.appearance.weight[1] === "0 kg" ? "No registra peso." : `${response.appearance.weight[0]} - ${response.appearance.weight[1]}`}</p>
                      <p class="card-text">Alianzas: ${response.connections['group-affiliation'] === "-" ? "No registra alianzas." : response.connections['group-affiliation']}</p>
                    </div>
                  </div>
                </div>
                </div>
                `);
    }

    //FUNCIÓN DESDE EL EVENTO SUBMIT DEL FORMULARIO
    function submitFormulario() {
      $('form').submit(function (event) {
        event.preventDefault();
      });
    }

    function crearGrafico(powerstats, nombre) {
      const dataPoints = [];

      // BUCLE FOR IN PARA ITERAR EN LOS POWERSTATS
      for (const key in powerstats) {
        powerstats[key] = powerstats[key] === "null" ? 0 : powerstats[key];
        dataPoints.push({ label: key, y: parseInt(powerstats[key]) });
        console.log(powerstats[key])
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
          legendText: `{label}`,
          startAngle: 240,
          yValueFormatString: "##0",
          indexLabel: `{label} ({y})`,
          dataPoints: dataPoints
        }]
      };

      let chart = new CanvasJS.Chart("chartContainer", options);
      chart.render();
    }

    //3.4 Consultar la API mediante AJAX con la sintaxis de jQuery. (1 Punto)
    //FUNCIÓN DE SOLICITUD AJAX  
    function requestAjax(valorInput) {
      $.ajax({
        url: `https://www.superheroapi.com/api.php/4905856019427443/${valorInput}`,
        type: 'GET',
        success: function (response) {
          //3.5 Renderizar la información recibida por la API dinámicamente utilizando tarjetas (card) de Bootstrap. (1 Punto)
          imprimirTarjeta(response);
          crearGrafico(response.powerstats, response.name);
        },
        dataType: 'json',
        error: function (error) {
          console.error("Error al obtener los datos:", error);
        }
      });
    }

    //3.1 Capturar la información ingresada mediante eventos del DOM con jQuery.(1 Punto)
    //FUNCION CLICK EN EL BOTÓN QUE LLAMA A FUNCION AJAX
    function clickBoton() {
      $('button').click(function () {
        const valorInput = $('#superhero').val();
        //3.3 Comprobar la información ingresada por el usuario, la cual, solo debe ser un número. (0.5 Puntos)
        //HACER UN IF PARA VALIDAR:
        //-QUE SOLO HAYAN INGRESADO NUMEROS 
        //-QUE NO SUPERE LOS 732
        if (/^\d+$/.test(valorInput) && valorInput > 0 && valorInput < 733) {
          //LLAMADO A LA FUNCIÓN QUE HACE LA PETICIÓN AJAX
          requestAjax(valorInput);
        } else {
          //MENSAJE DE ERROR SI LO INGRESADO NO ES NÚMERO NI ESTÁ ENTRE 1 Y 732
          alert("Por favor, ingrese solo números entre 1 y 732");
        }

        submitFormulario();
      });
    }

    //LLAMADO A LA FUNCIÓN CLICK BOTÓN PARA INICIAR TODO
    clickBoton()
  });
};

//3.2 Implementar funciones para separar la captura de la información ingresada por el usuario con la consulta a la API. (1 Punto)
//3.6 Utilizar ciclos y métodos para arreglos u objetos que permitan recorrer, ordenar y mostrar la información. (1 Punto)

//en esta es lo de los datapoints para el grafico

//3.8 Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda. (0.5 Puntos)

//estos son los if, aparte del if del input de los id 
