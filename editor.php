<?php 
require_once('DB/db.php');
require_once('lib.php');

session_start();

//checkiamos si las sessions están settiadas
if(isset($_SESSION['ultimoacceso']) && isset($_SESSION['usuario']) && isset($_SESSION['idioma'])){
	if(checkSession($_SESSION['ultimoacceso'], $_SESSION['usuario'], $_SESSION['idioma'])){
		$_SESSION['ultimoacceso'] = time();
	}else{
		header( 'Location: index.php' );
	}
}else{
	header( 'Location: index.php' );
}


//obtenemos el usuario
$USER = DBQueryReturnArray("SELECT * FROM users WHERE email = '$_SESSION[usuario]'");

if($USER[0]['superuser'] != 1){
	header( 'Location: index.php' );
}


?><html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" href="kickstart/css/kickstart.css" media="all" /> <!-- KICKSTART -->
	<style type="text/css" media="screen">
		body{
			display: block;
			margin: 0px;
		}
		#newTreeName{
			display: none;
			position: absolute;
			top: 40%;
			left: 35%;
			height: 100px;
			width: 300px;
			text-align: center;
			z-index: 90002;
			background-color: #FFFFFF;
			border: 5px groove #9090dd;
		}
		#newFormName{
			display: none;
			position: absolute;
			top: 40%;
			left: 35%;
			height: 100px;
			width: 300px;
			text-align: center;
			z-index: 90002;
			background-color: #FFFFFF;
			border: 5px groove #9090dd;
		}
		#copyTreeName{
			display: none;
			position: absolute;
			top: 40%;
			left: 35%;
			height: 100px;
			width: 300px;
			text-align: center;
			z-index: 90002;
			background-color: #FFFFFF;
			border: 5px groove #9090dd;
		}
		#cloneFormName{
			display: none;
			position: absolute;
			top: 40%;
			left: 35%;
			height: 130px;
			width: 300px;
			text-align: center;
			z-index: 90002;
			background-color: #FFFFFF;
			border: 5px groove #9090dd;
		}
		#notices{
			position: fixed;
			top: 0;
			left: 40%;
			width: 20%;
			text-align: center;
			z-index: 90007;
			cursor: pointer;
		}
		.menu_subformularios{
			display: none;
		}
		.menu_formularios{
			display: none;
		}
		.tabla{
			left: 20px;
			right: 20px;
			top: 10px;
		}
		.formElement{
			margin: 5px;
		}
		.formPopUp{
			height: auto;
		}
		.header{
			background-image: url("http://www.sonda.com/media/media2011/img/fondo-new.jpg");
			background-repeat: repeat-x;
			height: auto;
			min-height: 90px;
			width: 100%;
		}
		.bg_top {
			background: url("http://www.sonda.com/media/media2011/img/fondo-header.jpg") repeat-x scroll 0;
			width: 100%;
			height: auto;
			position: relative;
			right: 0;
			top: 0;
			overflow: hidden;
			min-width: 1024px;
		}
		.backWhite{
			background-color: #FFFFFF;
		}
		.loading{
			position: fixed;
			display: none;
			top: 45%;
		    left: 45%;
		    z-index: 90008;
		}
		.blackout{
			background-color: #DDDDDD;
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			opacity: 0.5;
			z-index: 90001;
		}
	</style>
	<title>Cloudinator - Inicio</title>
</head>
<body>
	<!-- ELEMENTOS FLOTANTES (inicio) -->
	<div id="notices"></div>

	<!-- form de SUBFORMULARIO -->
	<div id="newTreeName" class="col_3 column formPopUp">
		<label for="textName" class="formElement">Nombre: </label>
		<input id="textName" class="formElement" type="text" />
		<br>
		<button id="buttonName" class="formElement">Crear</button>
		<button id="buttonCancel" class="formElement">Cancelar</button>
	</div>

	<!-- form de CLONAR -->
	<div id="cloneFormName" class="col_3 column formPopUp" data-copyid="0">
		<label for="textNameCloneForm" class="formElement">Nombre: </label>
		<input id="textNameCloneForm" class="formElement" type="text" />
		<br>
		<label for="formlist" class="formElement">Formulario: </label>
		<select id="formlist">
			  <option></option>
		</select>
		<br>
		<button id="buttonNameCloneForm" class="formElement">Crear</button>
		<button id="buttonCancelCloneForm" class="formElement">Cancelar</button>
		<div class="clear"></div>
	</div>
	
	<!-- form de FORMULARIO -->
	<div id="newFormName" class="col_3 column formPopUp">
		<label for="textNameForm" class="formElement">Nombre: </label>
		<input id="textNameForm" class="formElement" type="text" />
		<br>
		<button id="buttonNameForm" class="formElement">Crear</button>
		<button id="buttonCancelForm" class="formElement">Cancelar</button>
	</div>

	<!-- SmokeScreen -->
	<img id="loadingGif" class="loading" src="content/ajax-loader.gif">
	<div class="blackout loading"></div>
	<!-- ELEMENTOS FLOTANTES (fin) -->

	<!-- HEADER (inicio)-->
	<div class="bg_top">
		<div class='header'>
			<a href="editor.php"><img src="content/logo-sonda-white.png" height=60px border=0px></a>
		</div>
	</div>
	<!-- HEADER (fin)-->
	
	<!-- MENU FORMULARIOS (inicio) -->
	<div class="menu_formularios forms">
		<ul class="menu forms">
			<li id="newform"><a href="#"><i class="icon-file"></i> Nuevo Formulario</a>
			<li><a href="#"><i class="icon-wrench"></i> Administración</a>
				<ul>
					<!-- <li><a href="DB/installDB.php">Reinstall DataBase (Se borrará todo)</a></li> -->
					<li><a href="DB/upgrade.php">Upgrade</a></li>
				</ul>
			</li>
			<li id="toIndex"><a href="index.php"><i class="icon-file"></i> Recorrer Formularios</a>
		
		</ul>
	</div>
	<!-- MENU FORMULARIOS (fin) -->
	

	<!-- MENU SUBFORMS (inicio) -->
	<div class="menu_subformularios subforms">
		<ul class="menu">
			<li id="formname"><a href="#"> Nombre </a></li>
			<li id="new"><a href="#"><i class="icon-file"></i> Nuevo Subformulario</a></li>
			<li id="deleteform"><a href="#" onclick='confirmdelete();'><i class="icon-remove-sign"></i> Eliminar Formulario</a></li>
			<li style="display: none" id="cloneForm"><a href="#"><i class="icon-copy"></i> Clonar Subformulario</a>
				<ul id="clone">
      			</ul>
      		</li> 
			<li><a href="editor.php"><i class="icon-arrow-left"></i> Volver</a></li> 

		</ul>
	</div>
	<!-- MENU SUBFORMS (fin) -->

	<!-- TABLA (inicio) -->
	<div class="tabla col_6">
		<h6 class="menu_formularios">Formularios Ocultos</h6>
		<h6 class="menu_subformularios">Subformularios no Publicados</h6>
		<table id="table1" cellspacing="0" cellpadding="0" class="striped sortable">
			<thead><tr>
				<th id="formsubform">Formulario</th>
				<th>Creado</th>
				<th>Acciones</th>
			</tr></thead>
			<tbody id="tablabody">
			</tbody>
		</table>
	</div>
	<!-- TABLA (fin) -->

	<!-- TABLA (inicio) -->
	<div class="tabla col_6">
		<h6 class="menu_formularios">Formularios Visibles</h6>
		<h6 class="menu_subformularios">Subformularios Publicados</h6>
		<table id="table2" cellspacing="0" cellpadding="0" class="striped sortable">
			<thead><tr>
				<th id="formsubform">Formulario</th>
				<th>Creado</th>
				<th>Acciones</th>
			</tr></thead>
			<tbody id="tabla2body">
			</tbody>
		</table>
	</div>
	<!-- TABLA (fin) -->

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> <!-- JQUERY (librerias javascript)-->
	<script src="kickstart/js/kickstart.js"></script> <!-- KICKSTART (js del css) -->
	<script type="text/javascript" src="http://webcursos.uai.cl/jira/s/es_ES-jovvqt-418945332/850/3/1.2.9/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?collectorId=2ab5c7d9"></script> <!-- JIRA (para reportar errores)-->
	<style type="text/css">.atlwdg-trigger.atlwdg-RIGHT{background-color:red;top:70%;z-index:10001;}</style>
	
	<script>
	function cargarGrafos(){ //Actualiza la lista de Subformularios [AJAX].
		$.ajax({
			url: 'ajax/ajaxTrees.php',
			dataType: 'json',
			timeout: 2500,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				console.log("asd",data);
				if(data.result){
					$('#tablabody').empty();
					$('#tabla2body').empty();
					$.each(data.datos, function( i, item ) {
						if(item.deleted == 0 && item.megatree == getQueryStringByName('id')){
							if(item.released == 0){
								$('#tablabody').append('<tr><td value="'+item.name+'"><a href="cloudinator.php?id='+item.id+'">'+item.name+'</a></td><td value="'+item.created+'">'+item.created+'</td><td><abbr title="Publicar"><a href="#" onclick="publicarSubformulario('+item.id+');"><i class="icon-share icon-2x"></i></a></abbr> <abbr title="Cambiar Nombre"><a href="#" onclick="cambiarNombreSubform('+item.id+');"><i class="icon-edit icon-2x"></i></a></abbr> <abbr title="Clonar"><a href="#" onclick="preclonar('+item.id+');"><i class="icon-copy icon-2x"></i></a></abbr> <abbr title="Borrar"><a href="#" onclick="borrarsubformulario('+item.id+');"><i class="icon-trash icon-2x"></i></a></abbr></td></tr>');
							}else{
								$('#tabla2body').append('<tr><td value="'+item.name+'"><a href="cloudinator.php?id='+item.id+'">'+item.name+'</a></td><td value="'+item.created+'">'+item.created+'</td><td><abbr title="Clonar"><a href="#" onclick="preclonar('+item.id+');"><i class="icon-copy icon-2x"></i></a></abbr> <abbr title="Borrar"><a href="#" onclick="borrarsubformulario('+item.id+');"><i class="icon-trash icon-2x"></i></a></abbr></td></tr>');
							}
						}
					});
					$('#table1').find('tr:first').addClass('first');
					$('#table1').find('tr:last').addClass('last');
					$('#table1').find('tr:even').addClass('alt');
					$('#table2').find('tr:first').addClass('first');
					$('#table2').find('tr:last').addClass('last');
					$('#table2').find('tr:even').addClass('alt');
				}else{
					addNotice("error", "Error al acceder a la lista de Grafos");
				}
			}
		}).fail(function(data) {addNotice("error", "Error al acceder a la lista de Grafos");console.log("asd2",data);}).always(function(){$('.loading').fadeOut();});
	}
	function loadMegaTrees(){ //Actualiza la lista de Formularios que se muestran [AJAX].
		$.ajax({
			url: 'ajax/ajaxMegaTrees.php',
			dataType: 'json',
			timeout: 2500,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				if(data.result){
					$('#tablabody').empty();
					$('#tabla2body').empty();
					$.each( data.datos, function( i, item ) {
						if(item.deleted == 0){
							if(item.visible == 0){
								//$('#formlist').append('<option value="'+item.id+'">'+item.name+'</option>');
								$('#tablabody').append('<tr><td value="'+item.name+'"><a href="editor.php?id='+item.id+'">'+item.name+'</a></td><td value="'+item.created+'">'+item.created+'</td><td><abbr title="Cambiar Nombre"><a href="#" onclick="cambiarNombreForm('+item.id+');"><i class="icon-edit icon-2x"></i></a></abbr> <abbr title="Mostrar"><a href="#" onclick="mostrarFormulario('+item.id+');"><i class="icon-eye-open icon-2x"></i></a></abbr> <abbr title="Borrar"><a href="#" onclick="borrarformulario('+item.id+');"><i class="icon-trash icon-2x"></i></a></abbr></td></tr>');
							}else{
								$('#tabla2body').append('<tr><td value="'+item.name+'"><a href="editor.php?id='+item.id+'">'+item.name+'</a></td><td value="'+item.created+'">'+item.created+'</td><td><abbr title="Cambiar Nombre"><a href="#" onclick="cambiarNombreForm('+item.id+');"><i class="icon-edit icon-2x"></i></a></abbr> <abbr title="Ocultar"><a href="#" onclick="ocultarFormulario('+item.id+');"><i class="icon-eye-close icon-2x"></i></a></abbr> <abbr title="Borrar"><a href="#" onclick="borrarformulario('+item.id+');"><i class="icon-trash icon-2x"></i></a></abbr></td></tr>');
							}
						}
					});
					$('#table1').find('tr:first').addClass('first');
					$('#table1').find('tr:last').addClass('last');
					$('#table1').find('tr:even').addClass('alt');
					$('#table2').find('tr:first').addClass('first');
					$('#table2').find('tr:last').addClass('last');
					$('#table2').find('tr:even').addClass('alt');
				}else{
					addNotice("error", "Error al acceder a la lista de Grafos");
				}
			}
		}).fail(function(data) {
			addNotice("error", "Error al acceder a la lista de Grafos");
		}).always(function(){$('.loading').fadeOut();});
	}
	function loadFormList(){
		$.ajax({
			url: 'ajax/ajaxMegaTrees.php',
			dataType: 'json',
			timeout: 2500,
			success: function(data){
				if(data.result){
					$('#formlist').empty();
					$.each( data.datos, function( i, item ) {
						if(item.deleted == 0){
							$('#formlist').append('<option value="'+item.id+'">'+item.name+'</option>');
						}
					});
				}else{
					addNotice("error", "Error al acceder a la lista de Grafos");
				}
			}
		}).fail(function(data) {
			addNotice("error", "Error al acceder a la lista de Grafos");
		});
	}
	function preclonar(id){
		loadFormList();
		$('.blackout').fadeIn();
		$('#cloneFormName').data("copyid", id);
		$('#cloneFormName').slideDown();
		$('#textNameCloneForm').focus();
		console.log("#clone on click", id, $('#cloneFormName').data("copyid"));
	}
	function clonar(){ //Llama a un form para clonar un Subformulario (y lo clona) [AJAX].
		console.log("listo para clonar", 
				$('#formlist').val(), 
				$('#cloneFormName').data("copyid"), 
				$('#textNameCloneForm').val() );
		$.ajax({
			url: 'ajax/ajaxTrees.php',
			dataType: 'json',
			type: 'POST',
			data: {
				name: $('#textNameCloneForm').val(),
				clonename : $('#cloneFormName').data("copyid"),
				to:  $('#formlist').val()
					},
			timeout: 35000,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				if(data.result){
					console.log("success on clonar()", data);
					cargarGrafos();
					addNotice("success", "Nuevo Subformulario clonado exitosamente");
					$('.loading').fadeOut();
				}else{
					$('#loadingGif').fadeOut();
					addNotice("warning", "Nombre ocupado");
					$('#cloneFormName').slideDown();
				}
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if(textStatus==="timeout") {
				addNotice("warning", "Timeout, refresque la página por favor.");
				alert("Timeout, Es posible que la clonacion se realizara exitosamente.");
				window.location.reload();
			}else{
				addNotice("error", "No se pudo clonar completamente el subformulario, borrelo o complete lo que no pudo ser copiado");
				$('.loading').fadeOut();
				$('#cloneFormName').slideUp();
				console.log("fail on clonar()", errorThrown, textStatus);
				console.log("fail on clonar exception", jqXHR);
			}
		});
	}
	function enviarForm(){ //Llama a un form para crear un Subformulario [AJAX].
		$.ajax({
			url: 'ajax/ajaxTrees.php',
			dataType: 'json',
			type: 'POST',
			data: {
				name: $('#textName').val(),
				megatree: getQueryStringByName('id')
				},
			timeout: 2500,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				if(data.result){
					console.log("success on enviarForm()", data);
					cargarGrafos();
					$('.loading').fadeOut();
					addNotice("success", "Nuevo Subformulario creado exitosamente");
				}else{
					$('#loadingGif').fadeOut();
					addNotice("warning", "Nombre ocupado");
					$('#newTreeName').slideDown();
				}
			}
		}).fail(function(data) {
			addNotice("error", "Error al crear el Subformulario");
			$('.loading').fadeOut();
			//window.location.reload();
			console.log("fail on enviarForm()", data);
		});
	}
	function createNewForm(){ //Llama a un form para crear un Formulario [AJAX].
		$.ajax({
			url: 'ajax/ajaxMegaTrees.php',
			dataType: 'json',
			type: 'POST',
			data: {
				name: $('#textNameForm').val(),
				action : "add"
					},
			timeout: 2500,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				if(data.result){
					addNotice("success", "Nuevo Formulario creado exitosamente");
					loadMegaTrees();
					$('.loading').fadeOut();
				}else{
					$('#loadingGif').fadeOut();
					addNotice("warning", "Nombre ocupado");
					$('#newFormName').slideDown();
				}
			}
		}).fail(function(data) {
			addNotice("error", "Error al crear el Formulario");
			console.log("error en createNewForm", data);
			$('.loading').fadeOut();
		});
	}
	function confirmdelete(){ //Llama a deleteform() en caso de que el usuario acepte, de lo contrario retorna false.
		if(confirm("¿Está Seguro?")){
			deleteform();
		}else{
			return false;
		}
	}
	function deleteform(){ //Llamada por ajax para borrar Formulario.
		$.ajax({
			url: 'ajax/ajaxMegaTrees.php',
			dataType: 'json',
			type: 'POST',
			data: {
				action: "delete",
				id: getQueryStringByName('id')
					},
			timeout: 2500,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				if(data.result){
					window.location = "editor.php";
					//TODO: En caso que se ocupe otro metodo que no sea "window.location" es probable que se usen las sig lineas:
					//loadMegaTrees(); //actualizar la lista de Formularios
					//addNotice("success", "Se ha borrado correctamente el Formulario"); //no tiene sentido porque con el window.location lo elimina automaticamente
				}else{
					addNotice("error", "Error al intentar borrar el Formulario");
					console.log("Error en deleteform", data.exception);
				}
			}
		}).fail(function(data) {
			addNotice("error", "Error al intentar borrar el Formulario");
			console.log("Error en deleteform", data.exception);
		}).always(function(){$('.loading').fadeOut();});
	}
	function borrarformulario(id){
		if(confirm("¿Está Seguro?")){
			$.ajax({
				url: 'ajax/ajaxMegaTrees.php',
				dataType: 'json',
				type: 'POST',
				data: {
					action: "delete",
					id: id
						},
				timeout: 2500,
				beforeSend: function(){$('.loading').fadeIn();},
				success: function(data){
					if(data.result)
					{
						loadMegaTrees(); //actualizar la lista de Formularios
						addNotice("success", "Se ha borrado correctamente el Formulario");
					}else{
						addNotice("error", "Error al intentar borrar el Formulario");
					}
				}
			}).fail(function(data) {
				addNotice("error", "Error al intentar borrar el Formulario");
				console.log("Error en deleteform", data.exception);
			}).always(function(){$('.loading').fadeOut();});
		}else{
			return false;
		}
	}
	function borrarsubformulario(id){
		if(confirm("¿Está Seguro?")){
			$.ajax({
				url: 'ajax/ajaxTrees.php',
				dataType: 'json',
				type: 'POST',
				data: {
					action: "deleteTree",
					tree: id
						},
				timeout: 2500,
				beforeSend: function(){$('.loading').fadeIn();},
				success: function(data){
					cargarGrafos(); //actualizar la lista de Subormularios
					addNotice("success", "Se ha borrado correctamente el Subformulario");
				}
			}).fail(function(data) {
				addNotice("error", "Error al intentar borrar el Subformulario");
				console.log("Error en deletesubform", data);
			}).always(function(){$('.loading').fadeOut();});
		}else{
			return false;
		}
	}
	function ocultarFormulario(id){
		$.ajax({
			url: 'ajax/ajaxMegaTrees.php',
			dataType: 'json',
			type: 'POST',
			data: {
				action: "hide",
				id: id
					},
			timeout: 2500,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				if(data.result){
					loadMegaTrees(); //actualizar la lista de Formularios
					addNotice("success", "Ahora el Formulario no está Visible");
				}else{
					addNotice("error", "Error al ocultar el Formulario");
					console.log("Error en ocultarFormulario", data.exception);
					$('.loading').fadeOut();
				}
			}
		}).fail(function(data) {
			addNotice("error", "Error al ocultar el Formulario");
			console.log("Error en ocultarFormulario", data.exception);
			$('.loading').fadeOut();
		}).always(function(){
			//$('.loading').fadeOut(); //el loadMegaTrees() se encarga
		});
	}
	function mostrarFormulario(id){
		$.ajax({
			url: 'ajax/ajaxMegaTrees.php',
			dataType: 'json',
			type: 'POST',
			data: {
				action: "show",
				id: id
					},
			timeout: 2500,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				if(data.result){
					loadMegaTrees(); //actualizar la lista de Formularios
					addNotice("success", "Ahora el Formulario es Visible");
				}else{
					addNotice("error", "Error al desocultar el Formulario");
					console.log("Error en mostrarFormulario", data.exception);
					$('.loading').fadeOut();
				}
			}
		}).fail(function(data) {
			addNotice("error", "Error al desocultar el Formulario");
			console.log("Error en mostrarFormulario", data.exception);
			$('.loading').fadeOut();
		}).always(function(){
			//$('.loading').fadeOut(); //el loadMegaTrees() se encarga.
		});
	}
	function publicarSubformulario(id){
		if(confirm("¿Está seguro de que desea publicar este Subformulario?")){
			//llamada ajax para cambiar la DB
			//notificacion
			//actualizar los grafos
			//notificacion de error	
			$.ajax({
				url: 'ajax/ajaxTrees.php',
				dataType: 'json',
				type: 'POST',
				data: {
					action: "release",
					id: id
						},
				timeout: 2500,
				beforeSend: function(){$('.loading').fadeIn();},
				success: function(data){
					if(data.result){
						cargarGrafos(); //actualizar la lista de Subformularios
						addNotice("success", "El Subformulario ha sido publicado");
					}else{
						addNotice("error", "Error al publicar el Subformulario");
						$('.loading').fadeOut();
						console.log("Error en publicar Subformulario", data.exception);
					}
				}
			}).fail(function(data) {
				addNotice("error", "Error al publicar el Subformulario");
				$('.loading').fadeOut();
				console.log("Error en publicarSubformulario", data.exception);
			}).always(function(){
				//$('.loading').fadeOut(); //cargarGrafos() se encarga.
			});

		}
	}
	function cambiarNombreForm(id){
		var newNameForm = prompt("Ingrese el nuevo nombre para el Formulario","");
		if (newNameForm!=null && newNameForm!="" && newNameForm.length>0){
			$.ajax({
				url: 'ajax/ajaxMegaTrees.php',
				dataType: 'json',
				type: 'POST',
				data: {
					action: "newName",
					id: id,
					nuevonombre: newNameForm
						},
				timeout: 2500,
				beforeSend: function(){$('.loading').fadeIn();},
				success: function(data){
					if(data.result){
						loadMegaTrees(); //actualizar la lista de Subformularios
						addNotice("success", "El Subformulario ha cambiado de nombre");
					}else{
						if(data.exception == "NombreOcupado"){
							addNotice("warning", "Nombre Ocupado");
							$('.loading').fadeOut();
						}else{
							addNotice("error", "Error al cambiar el nombre del Subformulario");
							$('.loading').fadeOut();
							console.log("Error en cambiar el nombre del Subformulario", data.exception);
						}
					}
				}
			}).fail(function(data) {
				addNotice("error", "Error al cambiar el nombre del Subformulario");
				$('.loading').fadeOut();
				console.log("Error en cambiarNombreSubform", data.exception);
			}).always(function(){
				//$('.loading').fadeOut(); //loadMegaTrees() se encarga.
			});
		}
	}
	function cambiarNombreSubform(id){
		var newNameSubform = prompt("Ingrese el nuevo nombre para el Subformulario","");
		if (newNameSubform!=null && newNameSubform!="" && newNameSubform.length>0){
			$.ajax({
				url: 'ajax/ajaxTrees.php',
				dataType: 'json',
				type: 'POST',
				data: {
					tree: id,
					nuevonombre: newNameSubform
						},
				timeout: 2500,
				beforeSend: function(){$('.loading').fadeIn();},
				success: function(data){
					if(data.result){
						cargarGrafos(); //actualizar la lista de Subformularios
						addNotice("success", "El Subformulario ha cambiado de nombre");
					}else{
						if(data.exception == "NombreOcupado"){
							addNotice("warning", "Nombre Ocupado");
							$('.loading').fadeOut();
						}else{
							addNotice("error", "Error al cambiar el nombre del Subformulario");
							$('.loading').fadeOut();
							console.log("Error en cambiar el nombre del Subformulario", data.exception);
						}
					}
				}
			}).fail(function(data) {
				addNotice("error", "Error al cambiar el nombre del Subformulario");
				$('.loading').fadeOut();
				console.log("Error en cambiarNombreSubform", data.exception);
			}).always(function(){
				//$('.loading').fadeOut(); //cargarGrafos() se encarga.
			});
		}
	}
	function setNameToForm(){ //Pone el nombre del formulario que se ha selecionado en el inicio del menu [AJAX].
		$.ajax({
			url: 'ajax/ajaxMegaTrees.php',
			dataType: 'json',
			type: 'POST',
			data: {
				action: "setname",
				id: getQueryStringByName('id')
					},
			timeout: 2500,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				console.log("success en setNameToForm");
				if(data.result)
				{
					$.each( data.datos, function( i, item ) {
									$('#formname').empty();
									$('#formname').append("<a href='#'>Formulario: "+item.name+"</a>");
								});
				}else{
					addNotice("error", "Se ha producido un error al rescatar el nombre del Formulario");
				}
			}
		}).fail(function(data) {
			console.log("error al setNameToForm", data);
			addNotice("error", "Se ha producido un error al rescatar el nombre del Formulario");
		}).always(function(){$('.loading').fadeOut();});
	}
	function clonarForm(){ //TODO: SE VA A OCUPAR ESTA FUNCION O NO? EN ESTE MOMENTO NO SE USA PORQUE NO HAY CLONACION DE FORMULARIOS
		$.ajax({
			url: 'ajax/ajaxMegaTrees.php',
			dataType: 'json',
			type: 'POST',
			data: {
				name: $('#textNameCloneForm').val(),
				cloneid : getQueryStringByName('id')
					},
			timeout: 2500,
			beforeSend: function(){$('.loading').fadeIn();},
			success: function(data){
				console.log("success al clonarForm", data);
				cargarGrafos();
				addNotice("success", "El Formulario se a clonado exitosamente");
				//$('#newTreeName').slideDown();
			}
		}).fail(function(data) {
			window.location.reload(); //TODO: PORQUE EL RELOAD?
			console.log("error al clonarForm", data);
			addNotice("error", "Error al clonar el Formulario");
		}).always(function(){$('.loading').fadeOut();});
		alert("Este mensaje debe ser eliminado del codigo, existe para confirmar el ingreso a una funcion especifica del codigo, si usted es un usuario final avise al administrador");
	}
	function addNotice(tipo, mensaje){ //tipo (string): "error", "success" o "warning". mensaje (string): cualquiera que se quiera mostrar.
		if(tipo == "error"){ var icono = "icon-remove-sign";}
		if(tipo == "success"){ var icono = "icon-ok";}
		if(tipo == "warning"){ var icono = "icon-warning-sign";}

		$('#notices').append('<div class="notice '+tipo+' new"><i class="'+icono+' icon-large"></i> '+mensaje+'<a href="#close" class="icon-remove"></a></div>');

		$('.new').hide().slideDown(400, function () {
			if($('.old').size()==0){
				$('.notice').addClass('old');
			}else{
				$('.old').fadeOut(400,function(){
				$('.notice').addClass('old');
				});
			}
		}).removeClass('new');
	}
	function getQueryStringByName(name){ //Retorna el valor del querystring segun el "name" que se le ingrese.
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	$(document).ready(function() {

		//decide si muestra el menu de Formularios o el de Subformularios
		if(getQueryStringByName('id')){
			setNameToForm();
			cargarGrafos(); //Carga la lista de Subformularios
			$('#formsubform').text("Subformularios");
			$('.menu_subformularios').show();
			$('.menu_formularios').remove();
		}else{
			loadMegaTrees(); //Carga la lista de Formularios
			$('#formsubform').text("Formularios");
			$('.menu_subformularios').remove();
			$('.menu_formularios').show();
		}

		//Comportamiento del form de creacion de Formularios
		$("#newform").on('click', function(event){
			$('.blackout').fadeIn();
			$('#newFormName').slideDown();
			$('#textNameForm').focus();

		});
		$('#buttonCancelForm').on('click', function(){
			$('#newFormName').slideUp();
			$('.blackout').fadeOut();
		});
		$("#textNameForm").keypress(function(event) {
			if(event.which == 13){
				$('#newFormName').slideUp();
				createNewForm();
			}
		});
		$("#buttonNameForm").on('click', function(event){
			$('#newFormName').slideUp();
			createNewForm();
		});
		
		//Inicia proceso de clonacion de Subformularios
		$("#clone").on("click", "li", function(event){
			$('.blackout').fadeIn();
			$('#cloneFormName').data("copyid", $(this).data('id'));
			$('#cloneFormName').slideDown();
			$('#textNameCloneForm').focus();
  			console.log("#clone on click", $(this).data('id'),$('#cloneFormName').data("copyid") );
		});

		//Comportamiento del form de creacion de Subformularios
		$('#new').on('click', function(event){
			$('.blackout').fadeIn();
			$('#newTreeName').slideDown();
			$('#textName').focus();
			//abrir cuadro de dialogo para elegir nombre
			//hacer llamada por ajax para generar el nuevo arbol en la DB y rescatar la id, para despues ir a cloudinator.php
		});
		$('#buttonCancel').on('click', function(){
			$('#newTreeName').slideUp();
			$('.blackout').fadeOut();
		});
		$("#textName").keypress(function(event) {
			if(event.which == 13){
				$('#newTreeName').slideUp();
				enviarForm();
			}
		});
		$('#buttonName').on('click', function(event){	
			var name = $('#textName').val();
			if(name == null || name == ""){
				alert("Debes ingresar el Nombre");
			}else{
				$('#newTreeName').slideUp();
				enviarForm();
			}
		});

		
		//WTF IS THIS?
		$('li').on('click', function(event){
			if($(this).data("id") == 99){
				$(this).toggle();
			}
		});

		/*
		//NO SE ESTA USANDO (?)
		$('#deleteform').on('click', function(event){
			 confirm(function() {
				// Put your own callback in here and return false to stop any link running
				return false;
			});
			return false;
		});
		*/
		
		//Comportamiento del form que Clona un Subformulario
		$('#textNameCloneForm').keypress(function(event) {
			if(event.which == 13){
				$('#cloneFormName').slideUp();
				$('.blackout').fadeOut();
				clonar();
			}
		});
		$('#buttonNameCloneForm').on('click', function(event){
			$('#cloneFormName').slideUp();
			$('.blackout').fadeOut();
			clonar();
		});
		$('#buttonCancelCloneForm').on('click', function(){
			$('#cloneFormName').slideUp();
			$('.blackout').fadeOut();
		});

		//Comportamiento al hacer click en las notificaciones
		$('#notices').on('click', '.notice', function(event){
			$(this).slideUp(function(){
				$(this).remove();
			});
		});
	});
	</script>
</body>
</html>