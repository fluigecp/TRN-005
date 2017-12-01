function inputFields(form) {
    var activity = getValue('WKNumState');
    var numProcess = getValue("WKNumProces");
    
	form.setValue('campoDescritor', form.getValue('titulo'));
	if ( form.getValue('resumoPrograma') == "" ) {
		form.setValue('resumoPrograma', form.getValue('documentosMatriz'));
	}

    /** Life Cycle */
    if ( activity == 0 || activity == 4 ) {
        form.setValue("numProcess", numProcess);
	}
	
	if ( activity == 26 ) {
		form.setValue("titulo","Orientações Matriz de Treinamento – Documentos SGQ" );
		form.setValue( "resumoPrograma", form.getValue("documentosMatriz") );
		var area = form.getValue("areaMatriz");
		var cargo = form.getValue("cargoMatriz");
		var textObjetivo = "Orientar os participantes quanto aos procedimentos "+
							"operacionais específicos da área " + area + " referente ao cargo de " + cargo;
		form.setValue("objetivo", textObjetivo);
	}

	form.setValue('custom_0', form.getValue('titulo'));
	form.setValue('custom_2', form.getValue('cargaHoraria'));
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
