
var nodos = new Array();
var links = new Array();
AUI().use('aui-io-request', 'aui-diagram-builder', function(A){

	A.io.request('ajaxnodos.php', {
		cache: false,
		autoLoad: true,
		dataType: 'json',   on: {   
			start:function(){
				//mostrar loading
			},
			success: function() {					
				var datos = this.get('responseData');
				for (var i=0; i < datos.length; i++) {
					//var id = datos[i].id;
					//console.log("iddd", id);
		   			nodos[i] = datos[i];
	   			} 
				cargaNodos();
				
			}
		}
	});

	function andaABuscarLosLinks() {
		A.io.request('ajaxlinks.php', {
			dataType: 'json',   on: {   
				success: function() {
					var datos = this.get('responseData');
					for (var i=0; i < datos.length; i++) {
			   			links[i] = datos[i];
		   			} 
					cargaLinks();
				}
			}
		});
	}
	function ajaxPostNodo(action, name, type, posx, posy){
		A.io.request('ajaxpost.php', {
			autoLoad: true,
			method: 'POST',
			data: {
				nodo: action,
				name: name,
				type: type,
				posx: posx,
				posy: posy
			},
			on: {
				success: function(data){
					
					console.log('AJAX',data);
				}
			}
		});
	}

	function ajaxPostLink(action, name, source, target){
		A.io.request('ajaxpost.php', {
			autoLoad: true,
			method: 'POST',
			data: {
				link: action,
				name: '',
				source: source,
				target: target
			},
			on: {
				success: function(data){
				}
			}
		});
	}

	var typepregunta = 'condition';
	var typerespuesta = 'end';
	var availableFields = [
		{
			type: 'end',
			label: 'Respuesta',
			iconClass: 'aui-diagram-node-end-icon'
		},
		{
			type: 'condition',
			label: 'Pregunta',
			iconClass: 'aui-diagram-node-condition-icon'
		}
	];

	function cargaNodos() {
		
		var field = new Array();
		//console.log("field", nodos);
		for (var i=0; i < nodos.length; i++) {
			var x = {};
			x.name = nodos[i].name;
			x.type = nodos[i].type;
			x.xy = [parseInt(nodos[i].posx), parseInt(nodos[i].posy)];
			field.push(x);
		} 
		

		console.log('nodos', nodos[1]);
		db1 = new A.DiagramBuilder(
			{
				availableFields: availableFields,
				useARIA: true,
				boundingBox: '#diagrambuilderBB',
				srcNode: '#diagrambuilderCB',
				on: {
					 '*:drag': function(event) {
						 //funciones interesantes
						 //db1.deleteSelectedNode();
						 //db1.deleteSelectedConnectors ();
						 //aca se guardan los cambios de posici�n en la base de datos.
						//estos son ejemplos, siente libre de sacarlos marcelo
						//ajaxPostNodo('add', 'nombre del nodo', 'tipo del nodo', 10, 20);
						
						//ajaxPostLink('add', '', 1, 2);
						
							//console.log('drag', event);
							
							deleltelinesinfo();
					},
					'*:end': function(event){
						ajaxPostNodo('modify', 'TS', 'condition', 0, 0);
						//db1.selectedNode();
						
						//var diagramNode = A.Widget.getByNode(event.target.get("dragNode"));
						
						console.log("final del drag", event.target);
						deleltelinesinfo();
					},
					'*:hit': function(event){
						console.log("hit drag", event);
						deleltelinesinfo();
					},
					save: function(event) {
						//aca se guardan los cambios
						console.log('save', event);
					}
				},

				fields: field,
				render: true
			}
		);
		//console.log('db1',db1);
		andaABuscarLosLinks();
	}
	// db1.syncTargetsUI();

	// var task2 = db1.addField({
	// 	name: 'Task2',
	// 	type: 'condition'
	// });

	// task2.addTransition('Task1');
	// task2.connect('Task1');
	
	function cargaLinks() {
		
		var connectors = new Array();
		for (var i=0; i < links.length; i++) {
			var x = {};
			x.connector = {};
			x.connector.name = links[i].name;
			
			for(var j=0; j < nodos.length; j++) {
				if(nodos[j].id == links[i].source){
					x.source = nodos[j].name;
				}else if(nodos[j].id == links[i].target){
					x.target = nodos[j].name;
				}
			}
			connectors.push(x);
		} 
		
		db1.connectAll(connectors);
		deleltelinesinfo();
	}
	
	function deleltelinesinfo(){
		var a = A.all('.aui-diagram-builder-connector-name');
		//db1.connector.hide();
		a.remove();
	}
	
	// db2 = new A.DiagramBuilder(
	// 	{
	// 		after: {
	// 			cancel: function(event) {
	// 				console.log('cancel', event);
	// 			},

	// 			save: function(event) {
	// 				console.log('save', event);
	// 			}
	// 		},
	// 		availableFields: availableFields,
	// 		fields: [
	// 			{
	// 				bodyContent: 'Node1',
	// 				type: 'task',
	// 				xy: [200, 200]
	// 			},
	// 			{
	// 				bodyContent: 'Node2',
	// 				type: 'task'
	// 			}
	// 		],
	// 		render: '#diagramBuilder2'
	// 	}
	// );

});