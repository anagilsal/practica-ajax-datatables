   'use strict';

   $.validator.addMethod("sololetras", function(value, element) {
    return this.optional(element) || /^[áéíóúÁÉÍÓÚA-Za-zñÑ ]+$/i.test(value);
}, "Solo se aceptan letras");


   $(document).ready(function() {
       var miTabla = $('#miTabla').DataTable({
           'processing': true,
           'serverSide': true,
           'ajax': 'php/cargar_vclinicas_mejor.php',
           'language': {
               'sProcessing': 'Procesando...',
               'sLengthMenu': 'Mostrar _MENU_ registros',
               'sZeroRecords': 'No se encontraron resultados',
               'sEmptyTable': 'Ningún dato disponible en esta tabla',
               'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
               'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
               'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
               'sInfoPostFix': '',
               'sSearch': 'Buscar:',
               'sUrl': '',
               'sInfoThousands': ',',
               'sLoadingRecords': 'Cargando...',
               'oPaginate': {
                   'sFirst': 'Primero',
                   'sLast': 'Último',
                   'sNext': 'Siguiente',
                   'sPrevious': 'Anterior'
               },
               'oAria': {
                   'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                   'sSortDescending': ': Activar para ordenar la columna de manera descendente'
               }
           },
           'columns': [{
               'data': 'idDOctor'
           }, {
               'data': 'nombre'
           }, {
               'data': 'numColegiado'
           }, {
               'data': 'id_clinicas'
           }, {
               'data': 'clinicas',
               'render': function(data) {
                clinics = data.split(', ');
                var lista = "";
                $.each(clinics, function(ind, clinicas) {
                    lista = lista + '<li>' + clinicas + '</li><br>';
                });
                return lista;
            }
           }, {
               'data': 'idDOctor2',
               'render': function(data) {
                   return '<a class="btn btn-primary editarbtn" href=http://localhost/php/editar.php?id_doctor=' + data + 
                   '>Editar</a><a class="btn btn-warning borrarbtn" href=http://localhost/php/borrar.php?id_doctor=' + data + 
                   '>Borrar</a>';
               }
           }]
       });
    $('#form2').validate({
              rules: 
              {
                  nombre2:{required: true,sololetras: true },
                  numColegiado2:{digits: true},
                  CLiniks2:{required:true}
              },
              messages:
              {
                  nombre2: {required:'obligatorio',sololetras:'solo letras' },
                  numColegiado2: {digits:'solo numeros'},
                  CLiniks2:{required:'minimo 1'}

              },
            submitHandler: function() 
            {
                 var nombre2 = $('#nombre2').val();
                 var numCol2 = $('#numColegiado2').val();
                 var clinicasElegidas2 = $('#CLiniks2').val();
                 
                 $.ajax({
                     type: 'POST',
                     dataType: 'json',
                     url: 'php/nuevo_doctor.php',
                     //lo más cómodo sería mandar los datos mediante 
                     //var data = $( "form" ).serialize();
                     //pero como el php tiene otros nombres de variables, lo dejo así
                     //estos son los datos que queremos actualizar, en json:
                     data: {
                         nombre: nombre2,
                         colegiado:numCol2,
                         clins:clinicasElegidas2
                     },

                     error: function(xhr, status, error) {
                         //mostraríamos alguna ventana de alerta con el error
                     },
                     success: function(data) {
                        var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                        $mitabla.fnDraw();
                        alert('insertado');
                     },
                     complete: {
                         //si queremos hacer algo al terminar la petición ajax
                         
                     }
                 }); //fin ajax

                 $('#tabla').fadeIn(100);
                 $('#formulario2').fadeOut(100);

       } //fin handler
   }); //fin formulario validate
   $('#form1').validate({
              rules: 
              {
                  nombre:{required: true,sololetras: true },
                  numColegiado:{digits: true},
                  CLiniks:{required:true}
              },
              messages:
              {
                  nombre: {required:'obligatorio',sololetras:'solo letras' },
                  numColegiado: {digits:'solo numeros'},
                  CLiniks:{required:'minimo 1'}

              },
            submitHandler: function() 
            {
                 idDoctor = $('#idDOCTOR').val();
                 nombre = $('#nombre').val();
                 numCol = $('#numColegiado').val();
                 clinicasElegidas = $('#CLiniks').val();
                 
                 $.ajax({
                     type: 'POST',
                     dataType: 'json',
                     url: 'php/modificar_clinica.php',
                     //lo más cómodo sería mandar los datos mediante 
                     //var data = $( "form" ).serialize();
                     //pero como el php tiene otros nombres de variables, lo dejo así
                     //estos son los datos que queremos actualizar, en json:
                     data: {
                         id_doctor: idDoctor,
                         nombre: nombre,
                         colegiado:numCol,
                         clins:clinicasElegidas
                     },

                     error: function(xhr, status, error) {
                         //mostraríamos alguna ventana de alerta con el error
                     },
                     success: function(data) {
                         alert('editado');
                        var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                        $mitabla.fnDraw();

                     },
                     complete: {
                         
                     }
                     });//fin ajax

                       $('#tabla').fadeIn(100);
                       $('#formulario').fadeOut(100);

       } //fin handler
   }); //fin formulario validate

        function cargarTarifas() {
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/listar_tarifas.php',
               async: false,
               //estos son los datos que queremos actualizar, en json:
               // {parametro1: valor1, parametro2, valor2, ….}
               //data: { id_clinica: id_clinica, nombre: nombre, ….,  id_tarifa: id_tarifa },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
               },
               success: function(data) {
                   $('#CLiniks').empty();
                   $.each(data, function() {
                       $('#CLiniks').append(
                           $('<option></option>').val(this.idClinica).html(this.nombre)
                       );
                   });
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });
       }
       cargarTarifas();

       function cargarTarifas2() {
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/listar_tarifas.php',
               async: false,
               //estos son los datos que queremos actualizar, en json:
               // {parametro1: valor1, parametro2, valor2, ….}
               //data: { id_clinica: id_clinica, nombre: nombre, ….,  id_tarifa: id_tarifa },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
               },
               success: function(data) {
                   $('#CLiniks2').empty();
                   $.each(data, function() {
                       $('#CLiniks2').append(
                           $('<option></option>').val(this.idClinica).html(this.nombre)
                       );
                   });
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });
       }
       cargarTarifas2();


       /*Creamos la función que muestre el formulario cuando hagamos click*/
       /*ojo, es necesario hacerlo con el método ON. Tanto por rendimiento como porque puede haber elementos (botones) que todavía no existan en el document.ready*/
       $('#miTabla').on('click', '.editarbtn', function(e) {
           e.preventDefault();
           $('#tabla').fadeOut(100);
           $('#formulario').fadeIn(100);

           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           $('#idDOCTOR').val(aData.idDOctor);
           $('#nombre').val(aData.nombre);
           $('#numColegiado').val(aData.numColegiado);

           $('#CLiniks').val(aData.nombreClinica);
           // Llamamos a la funcion que busca las clinicas y las añade al select
           cargarTarifas();
           // Seleccionamos y separamos las clinicas de la vista
           var listaClinicas = aData.id_clinicas;
           listaClinicas = listaClinicas.split(",");
            // Añadimos las clinicas del doctor al select como selected
           $('#CLiniks').val(listaClinicas); 

        });

       $('#miTabla').on('click', '.borrarbtn', function(e) {
           e.preventDefault();
           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           var idDoctortor = aData.idDOctor;

           if (confirm("vas a borrar al DR. está ud. seguro?"))
           {
           $.ajax({
               /*en principio el type para api restful sería delete pero no lo recogeríamos en $_REQUEST, así que queda como POST*/
               type: 'POST',
               dataType: 'json',
               url: 'php/borrar_clinica.php',
               //estos son los datos que queremos actualizar, en json:
               data: {
                   id_doctor: idDoctortor
               },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
                   alert("Ha entrado en error");
               },
               success: function(data) {
                   //obtenemos el mensaje del servidor, es un array!!!
                   //var mensaje = (data["mensaje"]) //o data[0], en función del tipo de array!!
                   //actualizamos datatables:
                   /*para volver a pedir vía ajax los datos de la tabla*/
                    alert("borrado");
                    var $mitabla = $("#miTabla").dataTable( { bRetrieve : true } );
                    $mitabla.fnDraw();
                    
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
                   //alert("success"); da errores, no poner

               }
           });
          }
       });
         $('#añadirDoctor').click(function(e) {
            e.preventDefault();
           $('#tabla').fadeOut(100);
           $('#formulario2').fadeIn(100);

           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           $('#idDOCTOR').val(' ');
           $('#nombre2').val(' ');
           $('#numColegiado2').val(' ');
 
           $('#CLiniks2').val(aData.nombreClinica);
           // Llamamos a la funcion que busca las clinicas y las añade al select
           cargarTarifas2();
           // Seleccionamos y separamos las clinicas de la vista
           var listaClinicas = aData.id_clinicas;
           listaClinicas = listaClinicas.split(",");
            // Añadimos las clinicas del doctor al select como selected
           $('#CLiniks2').val(listaClinicas);
           
 });


   }); 

   /* En http://www.datatables.net/reference/option/ hemos encontrado la ayuda necesaria
   para utilizar el API de datatables para el render de los botones */
   /* Para renderizar los botones según bootstrap, la url es esta: 
   http://getbootstrap.com/css/#buttons
   */
