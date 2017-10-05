function validaCampos(atividade, proximaAtividade) {
	/** Life Cycle Workflow */
	
	if ( atividade == 0 || atividade == 4 || atividade == 21 || atividade == 26 ) {
			addHasFree('titulo');
			addHasFree('cargaHoraria');
			addHasFree('qtdDias');
			addHasFree('objetivo');
			addHasFree('resumoPrograma');
			addHasFree('responsavelTreinamento');

			/*addHasFreeTable("input", "setor", 1);
			addHasFreeTable("input", "matricula", 1);
			addHasFreeTable("input", "nome", 1);*/
	}

	if ( activity == 15 ) {
		addHasFree("treinamentoAprovado");
	}

	/** Fim Life Cycle Workflow */
}
