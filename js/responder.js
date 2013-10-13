function checkSessionorDie(){
	
	if($.session.get('usu')!==undefined){
		console.log("usu",$.session.get('usu') );
	}else{
		window.location.href = "notfound.html";
	}
	if($.session.get('pass')!==undefined){
		console.log("pass",$.session.get('pass') );
	}else{
		window.location.href = "notfound.html";
	}
	
	if($.session.get('empresa')!==undefined){
		console.log("empresa",$.session.get('empresa') );
	}else{
		window.location.href = "notfound.html";
	}
	
	$("#usernamebutton").text($.session.get('usu'));
	setEmpresaInfo($.session.get('empresa'));
	console.log("asdasd");
}

function setEmpresaInfo(id){
	
	$.post("server/empresas.php",{ 
		action : "getById", 
		id: id
		},function(empresas){
			var emp = jQuery.parseJSON(empresas);
			console.log(emp);
			//console.log("hola", empresas);
			$("#empresanombre").text(emp.nombre);
			$("#infoempresa").text(emp.infolevantamiento);
		});
}
function responderpregunta(idnode, idlev, idsubform, idpregunta){
	$.post("ajax/ajaxresponder.php",{ 
		idnode: idnode,
		idlev: idlev,
		idsubform: idsubform,
		idpregunta: idpregunta,
		iduser: $.session.get('usu'),
		idempresa: $.session.get('empresa')
		},function(respuesta){
			window.location.href = "responder.php?idlev=" + idlev+"&idsubform="+idsubform;
		});
	
}

$(document).ready(function(){
	
	checkSessionorDie();
	
	$("#backbutton").on('click', function(){
		var emp = $(this).data('emp');
		var idlev = $(this).data('idlev');
		window.location.href = "recorrer.php?emp="+emp+"&idlev="+idlev;
	});
	
	$(".answer").on('click', function(){
	
		var idnode = $(this).data('idnode');	
		var idlev = $(this).data('idlev');	
		var idsubform = $(this).data('idsubform');	
		var idpregunta = $(this).data('idpregunta');
		
		console.log("pregunta id", idpregunta);
		console.log("respuesta id", idnode);
		responderpregunta(idnode, idlev, idsubform, idpregunta);
		//window.location.href = "responder.php?idlev=" + idlev+"&idsubform="+idsubform;
		
	});
});