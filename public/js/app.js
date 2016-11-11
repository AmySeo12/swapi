var template= '<div class="col s12 m4">'+
			    '<div class="card horizontal hoverable">'+
			      	'<div class="card-stacked">'+
			        	'<div class="card-content teal lighten-3 white-text">'+
			          		'<p>Hi, my name <strong>{{name}}</strong></p>'+
			        	'</div>'+
				        '<div class="card-action">'+
				          	'<a data-show-url="{{url}}" class="teal-text text-lighten-3 about">This is a link</a>'+
				        '</div>'+
				    '</div>'+
		    	'</div>'+
		  	'</div>'
var templateDos= '<div class="col s12 m4">'+
			    '<div class="card horizontal hoverable">'+
			      	'<div class="card-stacked">'+
			        	'<div class="card-content teal lighten-3 white-text">'+
			          		'<p>Hi, my name <strong>{{name}}</strong></p>'+
			        	'</div>'+
				        '<div class="card-action">'+
				          	'<a data-show-url="{{url}}" class="teal-text text-lighten-3 about">This is a link</a>'+
				        '</div>'+
				    '</div>'+
		    	'</div>'+
		  	'</div>'


var especies =	"<option value='__valor__'>__especie-nombre__</option>";
var ir= "http://swapi.co/api/people/";

var plantilla= function(response){
	$("#total").text(response.results.length);
	var personajes= "";
	$.each(response.results, function(i, personaje){
		personajes+= template
		.replace("{{name}}", personaje.name)
		.replace("{{url}}", personaje.url);
	})
	$("#contenedor").html(personajes);
	$("#next").attr("data-url", response.next);
	$("#prev").attr("data-url", response.previous);

	if(!response.next){
		$("#next").fadeOut();
	}else{
		$("#next").fadeIn();
	}
	if(!response.previous){
		$("#prev").fadeOut();
	}else{
		$("#prev").fadeIn();
	}
}

var especiesPj= function(response){
	var tiposEspecies="";
	$.each(response.results, function(i,personaje){
		var id= "http://swapi.co/api/people/";
		var perso= "";
		$.each(personaje.people, function(i,personaje){
			perso+= personaje.replace(id, "");
		})
		tiposEspecies+= especies
		.replace("__especie-nombre__", personaje.name)
		.replace("__valor__", perso);
	});
	$("#opciones").html("<option value='' disabled selected>Choose your option</option>" + tiposEspecies);
}

$(document).ready(function(){
	$.getJSON("http://swapi.co/api/people/", plantilla);
	$.getJSON("http://swapi.co/api/species/", especiesPj);

	$("#next").click(function(event){
		event.preventDefault();
		var url= $(this).attr("data-url");
		$.getJSON(url, plantilla);
	})
	$("#prev").click(function(event){
		event.preventDefault();
		var url=$(this).attr("data-url");
		$.getJSON(url, plantilla);
	})

	$("#contenedor").on("click", ".about",function(event){
		event.preventDefault();
		alert("Hola");
	})

	$("select").change(function(){
		var valores= $(this).val();
		var personajes= "";
		console.log(typeof valores);
		var b= "";
		for(var i= 0; i < valores.length; i++){
			if(parseInt(valores[i]) > 0){
				b+=valores[i];
			}else{
				$.getJSON(ir+b+"/", function(response){
					personajes+=templateDos
						.replace("{{name}}", response.name)
						.replace("{{url}}", response.url)
				$("#especies").html(personajes);
					})
				
				b="";		
			}
		}
	})
});
