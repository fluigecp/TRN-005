function displayFields(form, customHTML) {
	var activity = getValue('WKNumState');
	form.setShowDisabledFields(true);
	var modo = form.getFormMode();
	customHTML.append("<script>");
	customHTML.append("function getAtividade(){return '" + getValue('WKNumState') + "'};");
	customHTML.append("function getFormMode(){return '" + form.getFormMode() + "'};");
	customHTML.append("function getGestor(){return '" + getValue('WKManagerMode') + "'};");
	customHTML.append("function getProcess(){return '" + getValue('WKNumProces') + "'};");
	customHTML.append("</script>");

	function oculta(variavel) {
		customHTML.append('<script>                                       ');
		customHTML.append('$(\'[name="' + variavel + '"]\').css(\'display\', \'none\');                      ');
		customHTML.append('$([name="' + variavel + '"]).parent().css(\'display\', \'none\');                                     ');
		customHTML.append('var closers = $([name="' + variavel + '"]).closest(\'.form-field\').find(\'input, textarea, select, table\');');
		customHTML.append('var hideDiv = true;                                                                               ');
		customHTML.append('$.each(closers, function(i, close) {                                                              ');
		customHTML.append('  if (close.style.display != \'none\') {                                                          ');
		customHTML.append('    hideDiv = false;                                                                              ');
		customHTML.append('  }                                                                                               ');
		customHTML.append('});                                                                                               ');
		customHTML.append('                                                                                                  ');
		customHTML.append('if (hideDiv == true) {                                                                            ');
		customHTML.append('  $([name="' + variavel + '"]).closest(\'.form-field\').css(\'display\', \'none\');                   ');
		customHTML.append('}                                                                                                 ');
		customHTML.append('$(\'[name="' + variavel + '"]\').closest(".form-field").hide();                                       ');
		customHTML.append('</script>                                       ');
	}

	function ocultaClasse(classe) {
		customHTML.append('<script>');
		customHTML.append('$(\'.' + classe + '\').css(\'display\', \'none\')');
		customHTML.append('</script>');
	}

	function ocultaId(id) {
		customHTML.append('<script>');
		customHTML.append('$(\'#' + id + '\').css(\'display\', \'none\')');
		customHTML.append('</script>');
	}

	/** Life Cycle */
	if (activity == 0 || activity == 4 || activity == 12 || activity == 21 || activity == 26) {
		ocultaClasse("aprovacoesContainer");
	}

	if (activity == 0 || activity == 4 || activity == 12 || activity == 15 || activity == 19 || activity == 21 || activity == 26) {
		var qtdDias = parseInt(form.getValue("qtdDias"));
		switch (qtdDias) {
			case 1:
				ocultaClasse("hdata2");
				ocultaClasse("hdata3");
				ocultaClasse("hdata4");
				ocultaClasse("hdata5");
				ocultaClasse("data2Container");
				ocultaClasse("data3Container");
				ocultaClasse("data4Container");
				ocultaClasse("data5Container");
				ocultaClasse("presencaData2");
				ocultaClasse("presencaData3");
				ocultaClasse("presencaData4");
				ocultaClasse("presencaData5");
				break;
			case 2:
				ocultaClasse("hdata3");
				ocultaClasse("hdata4");
				ocultaClasse("hdata5");
				ocultaClasse("data3Container");
				ocultaClasse("data4Container");
				ocultaClasse("data5Container");
				ocultaClasse("presencaData3");
				ocultaClasse("presencaData4");
				ocultaClasse("presencaData5");
				break;
			case 3:
				ocultaClasse("hdata4");
				ocultaClasse("hdata5");
				ocultaClasse("data4Container");
				ocultaClasse("data5Container");
				ocultaClasse("presencaData4");
				ocultaClasse("presencaData5");
				break;
			case 4:
				ocultaClasse("hdata5");
				ocultaClasse("data5Container");
				ocultaClasse("presencaData5");
				break;
			case 5:
				break;
			default:
				ocultaClasse("hdata1");
				ocultaClasse("hdata2");
				ocultaClasse("hdata3");
				ocultaClasse("hdata4");
				ocultaClasse("hdata5");
				ocultaClasse("presencaData1");
				ocultaClasse("presencaData2");
				ocultaClasse("presencaData3");
				ocultaClasse("presencaData4");
				ocultaClasse("presencaData5");
				ocultaClasse("datas");
				break;
		}
		var dataFields = ["data1", "data2", "data3", "data4", "data5"];
		for (var i = 0; i < dataFields.length; i++) {
			if (form.getValue(dataFields[i]) == "" || form.getValue(dataFields[i]) == undefined) {
				var fieldNumber = dataFields[i].substr(dataFields[i].length - 1);
				ocultaClasse("data" + fieldNumber + "Container");
			}

		}
		if (activity != 12) {
			ocultaId("dv-print");
		}

	}

	/*if ( activity == 15 ) {
		ocultaClasse("btn-insert");
		ocultaClasse("lixeira");
		ocultaClasse("lixeiraTbRegistroTreinamento");
		ocultaClasse("input-group-addon");
	}*/



	if (modo == "VIEW") {
		form.setShowDisabledFields(false);
		ocultaClasse("btn-insert");
		ocultaClasse("btn-insert");
		ocultaClasse("lixeira");
		ocultaClasse("lixeiraTbRegistroTreinamento");
	}

	/** FIM - Life Cycle */


}