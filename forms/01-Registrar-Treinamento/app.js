/** Global Variables */
var activity = 0,
	modo = '',
	currentLocation;
	
$(window).on("load", function () {
	/** Events onload, zoomFields etc.. */
	currentLocation = document.location.origin;
});

/** DOM Ready */
$(document).on("ready", function () {
	activity = getAtividade();
	modo = getFormMode();
	console.log("Activity: ", activity);
	console.log("Modo: ", modo);

	
	/**
	 * Expand textarea
	 */
	$('.expand').on('click ', function (event) {
		event.preventDefault();
		var type = $(this).prop('tagName');
		var classe = ($(this).attr('class')).indexOf('expand');
		$(this).css('resize', 'none');
		if (classe > -1) {
			$(this).show('slow', function () {
				$(this).css({
					'display': 'block',
					'overflow-y': 'hidden'
				});
				expandTextarea(this.id);
			});
		}
	});



	/** Início - Life Cycle */

	if ( activity == 0 || activity == 4 || activity == 12 || activity == 21 || activity == 26 ) {
		//Atribuindo calendário a cada campo de data/hora;
		$('input[data-date-hour]').css('background-color', 'white');
		$('input[data-date-hour]').focus(function(event) {
			var data = $(this).attr('data-date-hour');
			loadCalendar(this, data);
		});
		// Limpa campo calendar ao clicar no botão limpar do respectivo campo.
		$('span.sp-clear').on('click', function(event) {
			$(this).closest('.form-group').find('input').val('').change();
		});
		$('button#add-linha').click(function (event) {
			var row = wdkAddChild('tbRegistroTreinamento');
			var inputs = $("[mask]");
			MaskEvent.initMask(inputs);
		});
		
		//$("#tbRegistroTreinamento input[type='checkbox']").prop("readonly",true);

		// Replica Treinamento anterior
		$('button#replicar-ultimaLinha').click(function (event) {
		//Obter todas as linhas da tabela de treinamento, desconsiderando a primeira
			var regCount = $("#tbRegistroTreinamento table tbody tr.tableBodyRow:not(:first)").length;
			if (regCount > 0) {
				var row = wdkAddChild('tbRegistroTreinamento');
				$("#setor___" + row).val( $("#setor___" + row).closest(".tableBodyRow").prev().find('input[name*="setor___"]').val() );
				if ( $("#setor___" + row).val() != "" ) {
					FLUIGC.autocomplete('input#setor___' + row).add({ "departamento": $("#setor___" + row).val() });
				}
				$("#matricula___" + row).val( $("#matricula___" + row).closest(".tableBodyRow").prev().find('input[name*="matricula___"]').val() );
				$("#nome___" + row).val( $("#nome___" + row).closest(".tableBodyRow").prev().find('input[name*="nome___"]').val() );
				$("#presencaData1___" + row).val( $("#presencaData1___" + row).closest(".tableBodyRow").prev().find('input[name*="presencaData1___"]').val() );
				$("#presencaData2___" + row).val( $("#presencaData2___" + row).closest(".tableBodyRow").prev().find('input[name*="presencaData2___"]').val() );
				$("#presencaData3___" + row).val( $("#presencaData3___" + row).closest(".tableBodyRow").prev().find('input[name*="presencaData3___"]').val() );
				$("#presencaData4___" + row).val( $("#presencaData4___" + row).closest(".tableBodyRow").prev().find('input[name*="presencaData4___"]').val() );
				$("#presencaData5___" + row).val( $("#presencaData5___" + row).closest(".tableBodyRow").prev().find('input[name*="presencaData5___"]').val() );
				var inputs = $("[mask]");
				MaskEvent.initMask(inputs);
			}	
		});

		$("#qtdDias").on("change", function() {
			var qtd = $(this).val();
			var fieldsVisible;
			var fieldsInvisible;
			switch(qtd) {
				case "1": 
						fieldsVisible = ["datas", "hdata1", "data1Container", "presencaData1"];
						fieldsInvisible = ["hdata2","hdata3", "hdata4", "hdata5", "data2Container", "data3Container",
											"data4Container", "data5Container", "presencaData2", "presencaData3",
											"presencaData4", "presencaData5"];
						break;
				case "2": 
						fieldsVisible = ["datas", "hdata1", "hdata2", "data1Container", "data2Container",
										 "presencaData1", "presencaData2"];
						fieldsInvisible = ["hdata3", "hdata4", "hdata5",  "data3Container",
											"data4Container", "data5Container", "presencaData3",
											"presencaData4", "presencaData5"];
						break;
				case "3": 
						fieldsVisible = ["datas", "hdata1", "hdata2", "hdata3", "data1Container", "data2Container",
											"data3Container","presencaData1", "presencaData2", "presencaData3"];
						fieldsInvisible = ["hdata4", "hdata5", "data4Container", "data5Container",
											"presencaData4", "presencaData5"];
						break;
				case "4": 
						fieldsVisible = ["datas", "hdata1", "hdata2", "hdata3", "hdata4", "data1Container", "data2Container",
											"data3Container", "data4Container", "presencaData1", "presencaData2", "presencaData3",
											"presencaData4"];
						fieldsInvisible = [ "hdata5",  "data5Container", "presencaData5"];
						break;
				case "5": 
						fieldsVisible = ["datas", "hdata1", "hdata2", "hdata3", "hdata4", "hdata5", "data1Container", "data2Container",
											"data3Container", "data4Container", "data5Container", "presencaData1", "presencaData2", "presencaData3",
											"presencaData4", "presencaData5"];
						fieldsInvisible = [];
						break;
				default:
						fieldsVisible = [];
						fieldsInvisible = ["datas", "hdata1", "hdata2", "hdata3", "hdata4", "hdata5", "data1Container", "data2Container",
											"data3Container", "data4Container", "data5Container", "presencaData1", "presencaData2", "presencaData3",
											"presencaData4", "presencaData5"];

						break;
			}
			setVisibleElements(fieldsVisible, true);
			setVisibleElements(fieldsInvisible, false);
		});

		//  Deletar uma linha
		$('div#tbRegistroTreinamento').on('mousedown', 'i.fluigicon-trash', function () {
			fnWdkRemoveChild(this);
		});

		$("#data1").on("change blur", function(){
			$(".hdata1").html( $(this).val() != "" ? $(this).val() : "__/__/____");
		});
		
		$("#data2").on("change blur", function(){
			$(".hdata2").html( $(this).val() != "" ? $(this).val() : "__/__/____" );
		});
		
		$("#data3").on("change blur", function(){
			$(".hdata3").html( $(this).val() != "" ? $(this).val() : "__/__/____" );
		});
		
		$("#data4").on("change blur", function(){
			$(".hdata4").html( $(this).val() != "" ? $(this).val() : "__/__/____" );
		});

		$("#data5").on("change blur", function(){
			$(".hdata5").html( $(this).val() != "" ? $(this).val() : "__/__/____" );
		});
	}

	if ( activity == 12 || activity == 15 || activity == 21 || activity == 26 ) {
		$(".hdata1").html( $("[name*='data1']").val() );
		$(".hdata2").html( $("[name*='data2']").val() );
		$(".hdata3").html( $("[name*='data3']").val() );
		$(".hdata4").html( $("[name*='data4']").val() );
		$(".hdata5").html( $("[name*='data5']").val() );
		if ( activity == 12 ) {
			$("#print").off("click").on("click", function(){
				geraListaPresenca();
			});
		}
		// gera a mensagem com o numero da solicitação da matriz de treinamentos.
		var numSolicMatriz = $("#numSolicMatriz").val();
			if ( numSolicMatriz != "" && numSolicMatriz != undefined && numSolicMatriz != null ) {
			var htmlMatriz = "<label>Processo aberto a partir da matriz de treinamento Nº "+
							"<a href='/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+					
							numSolicMatriz+"' target='_blank'>"+numSolicMatriz+"</a></label>";
			$("#numSolicMatrizContainer").html(htmlMatriz);
		}
	}

	if ( activity == 26 ) {
		$("#resumoPrograma").text( $("#documentosMatriz").val() );
		if ($("#titulo").val() == "") {
			$("#titulo").val( "Orientações Matriz de Treinamento – Documentos SGQ" );
		}
		var area = $("#areaMatriz").val();
		var cargo = $("#cargoMatriz").val();
		var textObjetivo = "Orientar os participantes quanto aos procedimentos "+
							"operacionais específicos da área " + area + " referente ao cargo de " + cargo;
		$("#objetivo").text(textObjetivo);
	}
	
	/** Modo VIEW  */

	if ( modo == "VIEW" ) {
		$(".hdata1").html( $("#data1").html() == "" ? "__/__/____"  : $("#data1").html() );
		$(".hdata2").html( $("#data2").html() == "" ? "__/__/____"  : $("#data2").html() );
		$(".hdata3").html( $("#data3").html() == "" ? "__/__/____"  : $("#data3").html() );
		$(".hdata4").html( $("#data4").html() == "" ? "__/__/____"  : $("#data4").html() );
		$(".hdata5").html( $("#data5").html() == "" ? "__/__/____"  : $("#data5").html() );
		// limpa as células da table.
		$(".presencaData1, .presencaData2, .presencaData3, .presencaData4, .presencaData5").empty();
		// adiciona primeiro header na table
		$("thead").prepend('<tr><th colspan="3" class="tableColumn text-center">'+
		'Lista de presença</th><th colspan="5" class="tableColumn text-center">Assinatura(s)</th>');
		$(".input-group-addon").remove();

		if ( activity == 26 ) {
			var resumoTextWithBr = $("#resumoPrograma").text().replace( /\n/g , "<br>" );
			$("#resumoPrograma").html(resumoTextWithBr);
		}
	} else {
		if ( activity != 12 && activity != 15 ) {
			// adiciona primeiro header na table considerando a lixeira
			console.log("colspan incorreto!");
			$("thead").prepend('<tr><th colspan="4" class="tableColumn text-center">'+
			'Lista de presença</th><th colspan="5" class="tableColumn text-center">Assinatura(s)</th>');
		} else {
			console.log("colspan correto!");
			$("thead").prepend('<tr><th colspan="3" class="tableColumn text-center">'+
			'Lista de presença</th><th colspan="5" class="tableColumn text-center">Assinatura(s)</th>');
		}
	}


	/** Fim - Life Cycle */
});





/**
 *  @description Funções utilizadas durante o ciclo de vida do form.
 */

function expandTextarea(id) {
	var element = document.getElementById(id);
	if (element.scrollHeight != null) {
		var altura = element.scrollHeight + 'px';
		$(element).animate({
			overflow: 'hidden',
			height: 0,
			height: altura
		});
	}
}

function loadCalendar(obj, data) {
	var pkDate = false,
		pkTime = false,
		pkMinutes = false;

	if (data == 'date') {
		pkDate = true;

		FLUIGC.calendar('#' + obj.id, {
			pickDate: pkDate,
			pickTime: pkTime,
			useMinutes: pkMinutes,
			useSeconds: false,
			useCurrent: true,
			minuteStepping: 1,
			minDate: '1/1/2010',
			maxDate: '1/1/2215',
			showToday: true,
			language: 'pt-br',
			defaultDate: "",
			disabledDates: arrayDates(),
			useStrict: false,
			sideBySide: false,
			daysOfWeekDisabled: [0]
		});
	} else if (data == 'hour') {
		pkTime = true;
		pkMinutes = true;
		FLUIGC.calendar('#' + obj.id, {
			pickDate: pkDate,
			pickTime: pkTime,
		});
	}
}

function arrayDates() {
	var date = new Date();
	var day = date.getDate() - 1;
	var month = date.getMonth() + 1;
	var ano = date.getFullYear();
	var arrayDate = [];

	for (var i = ano; i > 2009; i--) {
		var months = (i > ano - 1) ? month : 12;
		for (var j = months; j > 0; j--) {
			var days = (i > ano - 1) && month == j ? day : 31;
			for (var k = days; k > 0; k--) {
				var dayFinish = k < 10 ? '0' + k : k;
				var monthFinish = j < 10 ? '0' + j : j;
				arrayDate.push(dayFinish + '/' + monthFinish + '/' + i);
			}
		}
	}
	return arrayDate;
}

function converteParaFloat(variavel) {
	if (variavel == "") {
		return parseFloat(0);
	}
	if (variavel.indexOf("R$") > -1) {
		variavel = variavel.replace("R$ ", "");
	}
	while (variavel.indexOf(".") != -1) {
		variavel = variavel.replace(".", "");
	}

	return parseFloat(variavel.replace(",", "."));
}

/**
 * @description Detalhe dos parametros
 * @param n  número a converter
 * @param c  numero de casas decimais
 * @param d  separador decimal
 * @param t  separador milhar
 */
function numeroParaMoeda(n, c, d, t) {
	//no final de cada linha é virgula mesmo, pois todas as variaveis sao do mesmo tipo
	c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

// Retorna a data do dia 
function getToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	return {
		"date": dd + '/' + mm + '/' + yyyy,
		"day": dd,
		"month": mm,
		"year": yyyy
	};
}

function setVisibleElements(fields, visible = true) {
	$.each(fields, function(index, value) {
		if (visible) {
			$( "."+ value ).css("display", "");
		} else {
			$( "."+ value ).css("display", "none");
		}
	});
}

// método do campo zoom de responsável pelo treinamento
function setSelectedZoomItem(selectedItem) {  
	if (selectedItem.inputName == 'responsavelTreinamento') { 
		if (event.type != 'load') {
			$("#responsavelTreinamentoID").val(selectedItem.colleagueId);
		}
	}
}


//Histórico

function expandTextarea(id) {
	var objTextArea = document.getElementById(id);
	if (objTextArea.scrollHeight > objTextArea.offsetHeight) {
		objTextArea.rows += 1;
	}
}

function mostraHistorico() {
	var historico = 'historico';
	document.getElementById(historico).style.display = 'inline';
	expandTextarea(historico);
}


//Fim do histórico




/** SERVICES */


