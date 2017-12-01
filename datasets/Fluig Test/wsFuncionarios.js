function createDataset(fields, constraints, sortFields) {

	log.warn("%%% +++++++ INICIANDO CONSULTA AO WS DE FUNCIONARIOS");
 
	var dataset = DatasetBuilder.newDataset();
 	try {

 		log.warn("%%% +++++++ VOU PEGAR O SERVICO");

 		//Serviço https://portalecp.ecp.org.br/Consulta/v20/ws/Consulta.asmx?WSDL
	    var serviceHelper = ServiceManager.getServiceInstance('WSPortalECP');
	    
	    //o objeto ConsultaSoap é o que tem as funcoes do servico: alteraSenha, consultaHelp, recuperarSenha e executarConsulta
	    log.warn("%%% +++++++ VOU INSTANCIAR ConsultaSoap");
	    var serviceLocator = serviceHelper.instantiate("org.tempuri.Consulta");
	    var consultaSoap = serviceLocator.getConsultaSoap();

	    //Instanciando o objeto de Autenticacao que deve ir no <soapenv:Header>
		log.warn("%%% +++++++ VOU INSTANCIAR Authentication");
	    var authentication = serviceHelper.instantiate('org.tempuri.Authentication');
	    authentication.setUser("fluig");
	    authentication.setPassword("Planejamento123*");

	    // Adicionando o SoapHeader via CXF
	    var headers = new java.util.ArrayList();
	    var authenticationHeader = new org.apache.cxf.headers.Header( new javax.xml.namespace.QName("http://tempuri.org/",
"Authentication"), authentication, new org.apache.cxf.jaxb.JAXBDataBinding(authentication.getClass()));
     	headers.add( authenticationHeader );

     	org.apache.cxf.frontend.ClientProxy.getClient(consultaSoap).getRequestContext()
     		.put(org.apache.cxf.headers.Header.HEADER_LIST, headers);

	    //Esse objeto é para identificar se o que eu quero buscar é Funcionarios ou Atletas
	    log.warn("%%% +++++++ VOU INSTANCIAR ExecucaoConsulta");
	    var execucaoConsulta = serviceHelper.instantiate('org.tempuri.ExecucaoConsulta');
	    execucaoConsulta.setConsulta("Funcionarios");
	    //execucaoConsulta.setConsulta("Atletas");
	    
	    // Setando um parametro
    	var parametro1 = serviceHelper.instantiate('org.tempuri.ConsultaParametro');
    	parametro1.setParametro('chapa');
    	parametro1.setValor(16310);
    	
    	// Parametros recebidos via constraint
    	// parametro1.setParametro(constraints[0].getFieldName());
    	// parametro1.setValor(constraints[0].getInitialValue);
	    	
    	var parametros = serviceHelper.instantiate('org.tempuri.ArrayOfConsultaParametro');
    	parametros.getConsultaParametro().add(parametro1);
	    	
    	execucaoConsulta.setParametros(parametros);

	    // Execução
	    var executarConsultaResponse = consultaSoap.executarConsulta(execucaoConsulta);

	    log.warn("%%% +++++++ RETORNOU ISSO: "+executarConsultaResponse);

	    // Retorno é um tipo complexo(XML), tem que tratar antes de adicionar no dataset
	    // Exemplo tratando com as classes Java
	    // Nesse caso retorna uma lista contendo a classe org.apache.xerces.dom.ElementNSImpl no Java
	    if (!executarConsultaResponse.getContent().isEmpty()) {
	    	// Retornando um NodeList com os funcionarios
	    	var funcionarios = executarConsultaResponse.getContent().get(0).getChildNodes();
	    	
	    	for (var i = 0; i < funcionarios.getLength(); i++) {
	    		var datasetRow = new Array();
	    		for( var j = 0; j < funcionarios.item(i).getAttributes().getLength(); j++) {
	    			if (i == 0) {
	    				dataset.addColumn(funcionarios.item(i).getAttributes().item(j).getNodeName());
		    		}
	    			datasetRow.push(funcionarios.item(i).getAttributes().item(j).getNodeValue());
	    		}
	    		dataset.addRow(datasetRow);
	    	}
	    	
	    }
	} catch (erro) {
		log.error("%%% +++++++ ERRO NO wsFuncionarios: "+erro.message);
		dataset.addColumn('Erro');
	    dataset.addRow(new Array(erro.message));
	}
    return dataset;


}