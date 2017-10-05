function enableFields(form) {
	var activity = getValue('WKNumState');
    
    /** Life Cycle */
    if ( activity == 0 || activity == 4 ) {
		//form.setEnabled('fieldName',false, true);
		//disablePaiFilho();
    }

    if ( activity == 12 || activity == 15 ) {
        form.setEnabled('titulo', false, true);
        form.setEnabled('codigo', false, true);
        form.setEnabled('revisao', false, true);
        form.setEnabled('cargaHoraria', false, true);
        form.setEnabled('qtdDias', false, true);
        form.setEnabled('objetivo', false, true);
        form.setEnabled('resumoPrograma', false, true);
        form.setEnabled('setorResponsavel', false, true);
        form.setEnabled('responsavelTreinamento', false, true);
        form.setEnabled('instrutorTreinamento', false, true);
        if ( activity == 12 ) {
            disablePaiFilho(false,false);
        }
    }

    /** Fim - Life Cycle */

    function disablePaiFilho(disableListaPresenca, disableDatas) {
        var list = form.getChildrenIndexes("tbRegistroTreinamento");
        for (var i = 0; i < list.length; i++) {
            if (disableListaPresenca) {
                form.setEnabled("setor___"+list[i],false, true);
                form.setEnabled("matricula___"+list[i],false, true);
                form.setEnabled("nome___"+list[i],false, true);
            }
            if (disableDatas) {
                form.setEnabled("presencaData1___"+list[i],false, true);
                form.setEnabled("presencaData2___"+list[i],false, true);
                form.setEnabled("presencaData3___"+list[i],false, true);
                form.setEnabled("presencaData4___"+list[i],false, true);
                form.setEnabled("presencaData5___"+list[i],false, true);
            }
        }
    }
}