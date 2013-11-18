﻿<?php

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet"
	href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script
	src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
<style type="text/css" media="screen">
.jqm-content {
	padding-right: 25%;
	padding-left: 25%;
}
</style>
<title>Ingrese Empresa</title>
</head>
<body>

	<section id="nuevaempresa" data-role="page">
	<div data-role="header" data-theme="b">
		<a href="#" id="backbutton" data-icon="arrow-l">Atrás</a>
		<h1>Cloudinator</h1>
		
	</div>

	<div data-role="content" id="content" class="jqm-content ui-content">

		<CENTER>
			<p>
				<strong>Ingrese una nueva empresa</strong>
			</p>
		</CENTER>
		<div style="width: 100%; margin: 0 auto;">


			<ul data-role="listview" data-inset="true">
				<li data-role="fieldcontain"><label for="new-name-empresa">Nombre
						Empresa:</label> <input name="new-name-empresa" id="new-name-empresa"
					value="" data-clear-btn="true" type="text">
				</li>
				<li data-role="fieldcontain"><label for="industry"
					class="select">Industria:</label> <select name="industry"
					id="industry">
						<option value="pesada">Industria Pesada</option>
						<option value="siderúrgicas">Siderúrgicas</option>
						<option value="metalúrgicas">Metalúrgicas</option>
						<option value="cementeras">Cementeras</option>
						<option value="químicas">Químicas de base</option>
						<option value="petroquímicas">Petroquímicas</option>
						<option value="automovilística">Automovilística</option>
						<option value="ligera">Industria ligera</option>
						<option value="alimentación">Alimentación</option>
						<option value="textil">Textil</option>
						<option value="farmacéutica">Farmacéutica</option>
						<option value="agroindustria">Agroindustria</option>
						<option value="armamentística">Armamentística</option>
						<option value="punta">Industria punta</option>
						<option value="robótica">Robótica</option>
						<option value="informática">Informática</option>
						<option value="astronáutica">Astronáutica</option>
						<option value="mecánica">Mecánica</option>
						<option value="educacional">Educacionales y relacionaladas</option>
						<option value="Gubernamentales">Gubernamentales</option>
						<option value="Otras">Otras</option>
				</select>
				</li>
				<li data-role="fieldcontain"><label for="textarea">Información
						de la Empresa:</label> <textarea cols="40" rows="8" name="textarea"
						id="textarea"></textarea>
				</li>
				<li class="ui-body ui-body-b">
					<fieldset class="ui-grid-a">
						<div class="ui-block-a">
							<button id="cancel" data-theme="d">Cancel</button>
						</div>
						<div class="ui-block-b">
							<button id="btnNew" data-theme="b">Submit</button>
						</div>
					</fieldset>
				</li>
			</ul>

		</div>

	</div>
	</section>

	<script src="js/nuevaempresa.js" type="text/javascript"></script>
	<script src="js/jquery.session.js" type="text/javascript"></script>
	<script type="text/javascript" src="http://webcursos.uai.cl/jira/s/es_ES-jovvqt-418945332/850/3/1.2.9/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?collectorId=2ab5c7d9"></script> <!-- JIRA (para reportar errores)-->
	<style type="text/css">.atlwdg-trigger.atlwdg-RIGHT{background-color:red;top:70%;z-index:10001;}</style>
</body>
</html>