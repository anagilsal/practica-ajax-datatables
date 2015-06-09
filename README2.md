# datatables_servidor
1. Crea un esquema de base de datos llamado datatables en base al diseño que proporciono en MySQL Workbench. Rellena la bbdd con los datos que se adjuntan en la hoja de cálculo. Utilizaremos estos datos para los ejercicios sucesivos.
Se proporciona también una exportación de la bbdd para poder hacer la importación de datos directamente.

2. Usa el plugin datatables para crear una tabla html que muestre los campos Nombre, Cif, Localidad,  Provincia y id_clinica de la tabla de bbdd del ejercicio anterior. 
Para obtener los datos del servidor puedes ayudarte del script que proporciona datatables en el ejemplo “DataTables server-side processing example”.

3. Modifica el ejercicio anterior para que el json de datos o obtenido sean objetos en vez de un array. En vez de obtener:

   ~~~
0: ["1", "CENTRO IMPLANTOLOGICO BARCELONA", "XX", "B11111111", "BARCELONA", "BARCELONA",…]
1: ["2", "CENTRO DE IMPLANTOLOGÍA MADRID", "XX", "B11111112", "MADRID", "MADRID",…]
2: ["3", "CENTRO DE IMPLANTOLOGÍA VIGO", "XX", "B11111113", "VIGO", "PONTEVEDRA", "Calle de Vigo nº 17",…]
3: ["4", "CENTRO DE IMPLANTOLOGÍA ZARAGOZA", "XX", "B11111114", "ZARAGOZA", "ZARAGOZA",…]
4: ["5", "CENTRO DE IMPLANTOLOGÍA VALENCIA", "XX", "B11111115", "VALENCIA", "VALENCIA",…]
5: ["6", "CENTRO DE IMPLANTOLOGÍA SANTANDER", "XX", "B11111116", "SANTANDER", "SANTANDER",…]
6: ["15", "CENTRO DE IMPLANTOLOGÍA TARRAGONA", "XX", "B11111117", "MADRID", "TARRAGONA",…]
  ~~~

   Deberíamos obtener:

   ~~~
0: {id_clinica: "1", nombre: "CENTRO IMPLANTOLOGICO BARCELONA", razonsocial: "XX", cif: "B11111111",…}
1: {id_clinica: "2", nombre: "CENTRO DE IMPLANTOLOGÍA MADRID", razonsocial: "XX", cif: "B11111112",…}
2: {id_clinica: "3", nombre: "CENTRO DE IMPLANTOLOGÍA VIGO", razonsocial: "XX", cif: "B11111113",…}
3: {id_clinica: "4", nombre: "CENTRO DE IMPLANTOLOGÍA ZARAGOZA", razonsocial: "XX", cif: "B11111114",…}
4: {id_clinica: "5", nombre: "CENTRO DE IMPLANTOLOGÍA VALENCIA", razonsocial: "XX", cif: "B11111115",…}
5: {id_clinica: "6", nombre: "CENTRO DE IMPLANTOLOGÍA SANTANDER", razonsocial: "XX", cif: "B11111116",…}
6: {id_clinica: "15", nombre: "CENTRO DE IMPLANTOLOGÍA TARRAGONA", razonsocial: "XX", cif: "B11111117",…}
   ~~~

4. Añade en cada registro de la tabla anterior un botón de editar y otro de borrar. Los botones deben enlazar a una url donde se pase un parámetro identificador del registro en cuestión. Puedes y debes utilizar la propiedad fnRender. Consulta la documentación del plugin de datatables para obtener más información.

5. Añade a la tabla anterior el tipo de tarifa de la clínica. Puedes echar un ojo al fichero de ayuda, si no se te ocurre como empezar.

6. Al pulsar el botón de editar debe desaparecer la tabla y aparecer mediante algún tipo de efecto jquery un formulario con los datos del registro de la clínica que se ha pulsado.

7. Utiliza ajax para borrar o modificar registros de datatables. Ya sea desde el mismo datatables (botón de borrar) o desde el formulario (botón de editar). Puedes ayudarte de los scripts que proporciono.

8. Implementa los avisos de ajax en el código anterior mediante algún plugin de jQuery de tipo growl. 
