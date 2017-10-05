function geraListaPresenca() {
	try {
		if(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)){				
			myWindow = window.open("print/print.html", "myWindow");
			setTimeout(function() {
				var list = getData();
				setData(myWindow, list[0]);
			}, 4000);

			
		} else {
			alert('Navegador incompatível! Utilizar o Google Chrome');
		}
	} catch (err) {
		console.log(err.message);
		alert('DESCULPE! Ocorreu um erro, contate o administrador');
	}
}

function getData() {
    var formObj, listaPresenca, titulo, codigo, revisao, cargaHoraria, qtdeDatas, objetivo, resumo, responsavelAplicacao, instrutor, datas;
    datas = [];
    formObj = [];
    listaPresenca = [];
    titulo = modo == "VIEW" ? $("span[name*='titulo']").html() : $("input[name*='titulo']").val();
    codigo = modo == "VIEW" ? $("span[name*='codigo']").html() : $("input[name*='codigo']").val();
    revisao = modo == "VIEW" ? $("span[name*='revisao']").html() : $("input[name*='revisao']").val();
    cargaHoraria = modo == "VIEW" ? $("span[name*='cargaHoraria']").html() : $("input[name*='cargaHoraria']").val();
    qtdeDatas = modo == "VIEW" ? $("span[name*='qtdDias']").html() : $("input[name*='qtdDias']").val();
    objetivo = modo == "VIEW" ? $("span[name*='objetivo']").html() : $("textarea[name*='objetivo']").val();
    resumo = modo == "VIEW" ? $("span[name*='resumo']").html() : $("textarea[name*='resumo']").val();
    responsavelAplicacao = modo == "VIEW" ? $("span[name*='responsavelTreinamento']").html() : $("input[name*='responsavelTreinamento']").val();
    instrutor = modo == "VIEW" ? $("span[name*='instrutor']").html() : $("input[name*='instrutor']").val();
    $.each( $( '#tbRegistroTreinamento tbody tr:not(:first(), div.filter-panel tr)' ), function(index, val) {
        var setor = modo == "VIEW" ?  $(this).find("span[name*='setor___']").html() : $(this).find("input[name*='setor___']").val(); 
        var matricula = modo == "VIEW" ?  $(this).find("span[name*='matricula___']").html() : $(this).find("input[name*='matricula___']").val(); 
        var nome = modo == "VIEW" ?  $(this).find("span[name*='nome___']").html() : $(this).find("input[name*='nome___']").val(); 
        listaPresenca.push( { "setor": setor, "matricula": matricula, "nome": nome } );
    });
    datas.push( modo == "VIEW" ? $("span[name*='data1']").html() : $("input[name*='data1']").val() );
    datas.push( modo == "VIEW" ? $("span[name*='data2']").html() : $("input[name*='data2']").val() );
    datas.push( modo == "VIEW" ? $("span[name*='data3']").html() : $("input[name*='data3']").val() );
    datas.push( modo == "VIEW" ? $("span[name*='data4']").html() : $("input[name*='data4']").val() );
    datas.push( modo == "VIEW" ? $("span[name*='data5']").html() : $("input[name*='data5']").val() );
    formObj.push({
        "titulo": titulo,
        "codigo": codigo,
        "revisao": revisao,
        "cargaHoraria": cargaHoraria,
        "qtdeDatas": qtdeDatas,
        "objetivo": objetivo,
        "resumo": resumo,
        "responsavelAplicacao": responsavelAplicacao,
        "instrutor": instrutor,
        "datas": datas,
        "listaPresenca": listaPresenca
    });
    return formObj;
}

function getHeader(){
    var data = new Date();
	var dia = data.getDate() < 10 ? '0'+data.getDate() : data.getDate();
	var mes = (data.getMonth()+1) < 10 ? '0'+(data.getMonth()+1) : (data.getMonth()+1);
	var ano = data.getFullYear();
	var header = '<div>'+
    '				<div class="row">'+
    '					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-left">'+
    '						<img src="../logo12.png" alt="" width="45" height="45">'+
    '					</div>'+
    '					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">'+
    '						<h4>Lista de Presença</h4>'+
    '					</div>'+
    '					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="font-size: 10px;">'+
    '						<span><b>Data: </b></span><span>'+dia+'/'+mes+'/'+ano+'</span>'+
    '						<br>'+
    '						<span><b>Solicitação: </b></span><span>'+getProcess()+'</span>'+
    '					</div>'+
    '				</div>'+
    '				<div class="row">'+
    '					<div class="col-xs-12 col-sm-12 col-md-12">'+
    '						<br>'+
    '						<legend style="border-bottom: solid .5px;"></legend>'+
    '					</div>'+
    '				</div>'+
    '			</div>';
	return header;
}

function setData(myWindow, list) {
        try{
            // /* Adds Element BEFORE */
            Element.prototype.appendBefore = function (element) {
                element.parentNode.insertBefore(this, element);
            };

            //  Adds Element AFTER 
            Element.prototype.appendAfter = function (element) {
                element.parentNode.insertBefore(this, element.nextSibling);
            };

            var style = 'background-color: #4169E1 !important; color: #fff !important;';
            var dvDados = myWindow.document.createElement('div');
            var header = getHeader();
            var html =  header +
            '           <div class="row">'+
            '			    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="display:none;">'+
            '				    <legend>Lista de presença</legend>'+
            '			    </div>'+
            '		    </div>'+
            '		<div class="row">'+
            '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
            '           <table class="table table-bordered table-hover table-condensed" style="width: 100%;">'+
            '            <thead>'+
            '                <tr>'+
            '                    <th width="47.5%" class="text-center" style="'+style+'">Título/assunto</th>'+
            '                    <th width="17.5%" class="text-center" style="'+style+'">Código</th>'+
            '                    <th width="17.5%" class="text-center" style="'+style+'">Revisão</th>'+
            '                    <th width="17.5%" class="text-center" style="'+style+'">Carga horária(hrs)</th>'+
            '                </tr>'+
            '            </thead>'+
            '            <tbody>'+
            '                <tr>'+
            '                    <td width="47.5%">'+
            '                        <span>'+list.titulo+'</span>'+
            '                    </td> '+
            '                    <td width="17.5%">'+
            '                        <span>'+list.codigo+'</span>'+
            '                    </td>'+
            '                    <td width="17.5%">'+
            '                        <span>'+list.revisao+'</span>'+
            '                    </td>'+
            '                    <td width="17.5%">'+
            '                        <span>'+list.cargaHoraria+'</span>'+
            '                    </td>'+
            '                </tr>'+
            '            </tbody>'+
            '        </table>'+
            '    </div>'+
            '</div>'+
            '<div class="row">'+
            '    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
            '        <table class="table table-bordered table-hover table-condensed">'+
            '            <thead>'+
            '                <tr>'+
            '                    <th width="100%" class="text-center" style="'+style+'">Objetivo</th>'+
            '                </tr>'+
            '            </thead>'+
            '            <tbody>'+
            '                <tr>'+
            '                    <td width="100%">'+
            '                        <span>'+list.objetivo+'</span>'+
            '                    </td> '+
            '                </tr>'+
            '            </tbody>'+
            '        </table>'+
            '    </div>'+
            '</div>'+
            '<div class="row">'+
            '    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
            '        <table class="table table-bordered table-hover table-condensed">'+
            '            <thead>'+
            '                <tr>'+
            '                    <th width="100%" class="text-center" style="'+style+'">Resumo do programa</th>'+
            '                </tr>'+
            '            </thead>'+
            '            <tbody>'+
            '                <tr>'+
            '                    <td width="100%">'+
            '                        <span>'+list.resumo.replace(/\n/g,' / ')+'</span>'+
            '                    </td> '+
            '                </tr>'+
            '            </tbody>'+
            '        </table>'+
            '    </div>'+
            '</div>'+
            '<div class="row">'+
            '    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
            '        <table class="table table-bordered table-hover table-condensed" style="width: 100%;">'+
            '            <thead>'+
            '                <tr>'+
            '                    <th width="50%" class="text-center" style="'+style+'">Responsável pela aplicação do treinamento</th>'+
            '                    <th width="50%" class="text-center" style="'+style+'">Instrutor</th>'+
            '                </tr>'+
            '            </thead>'+
            '            <tbody>'+
            '                <tr>'+
            '                    <td width="50%">'+
            '                        <span>'+list.responsavelAplicacao+'</span>'+
            '                    </td> '+
            '                    <td width="50%">'+
            '                        <span>'+list.instrutor+'</span>'+
            '                    </td>'+
            '                </tr>'+
            '            </tbody>'+
            '        </table>'+
            '    </div>'+
            '</div>';
            dvDados.innerHTML = html;
            dvDados.id = 'listaPresencaDados';
            dvDados.style.height = "700px";
            myWindow.document.getElementById("content-pages").appendChild(dvDados);

            var tbListaPresenca = myWindow.document.createElement('div');

            var headDatas = "";
            var bodyDatas = "";
            for (var i = 0; i < list.qtdeDatas; i++){
                if (list.datas[i] == "" || list.datas[i] == undefined || list.datas[i] == "&nbsp;") {
                    headDatas += '<th class="text-center" style="background-color: #d4e4ee !important; color: #fff;"> __/__/____ </th>';
                } else {
                    headDatas += '<th class="text-center" style="background-color: #d4e4ee !important; color: #fff;">'+list.datas[i]+'</th>';
                }
            }
            for ( var i = 0; i < list.listaPresenca.length; i++ ){
                var trow =      '<tr>'+
                                    '<td class="fs-v-align-middle index">'+
                                    '	<div class="form-input">'+
                                    '		<span>'+list.listaPresenca[i].setor+'</span>'+
                                    '	</div>'+
                                    '</td>'+
                                    '<td class="fs-v-align-middle index">'+
                                    '	<div class="form-input">'+
                                    '		<span>'+list.listaPresenca[i].matricula+'</span>'+
                                    '	</div>'+
                                    '</td>'+
                                    '<td class="fs-v-align-middle index">'+
                                    '	<div class="form-input">'+
                                    '		<span>'+list.listaPresenca[i].nome+'</span>'+
                                    '	</div>'+
                                    '</td>';
               for (var j = 0; j < list.qtdeDatas; j++){
                    trow +=	'<td class="fs-v-align-middle index">'+
                            '	<div class="form-input">'+
                            '		<span>&nbsp;</span>'+
                            '	</div>'+
                            '</td>';
                }
                trow += "</tr>"; 
                bodyDatas += trow;
            }
            var htmlTable = 
            '			<div class="row">'+
            '    			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
            '               <table class="table table-bordered table-hover table-condensed" style="width: 100%;">'+
            '            			<thead>'+
            '                       <tr>'+
            '                            <th colspan="3" class="tableColumn text-center" style="'+style+'">'+
            '                               Lista de presença'+
            '                            </th>'+
            '                            <th colspan="5" class="tableColumn text-center" style="'+style+'">Assinatura(s)</th>'+
            '                        </tr>'+
            '                			<tr id="listaPresencaHeader">'+
            '                    			<th class="text-center" style="'+style+'width:20%;">Setor</th>'+
            '                    			<th class="text-center" style="'+style+'width:8%;">Matrícula</th>'+
            '                    			<th class="text-center" style="'+style+'width:22%;">Nome</th>' +
                                            headDatas+
            '                			</tr>'+
            '            			</thead>'+
            '            			<tbody id="tbodyListaPresenca">'+
                                        bodyDatas+
            '            			</tbody>'+
            '					</table>'+
            '               Nº Solicitação: '+getProcess()+
            '    			</div>'+
            '			</div>';
            var id = 'tbListaPresenca';
            tbListaPresenca.innerHTML = htmlTable;
            tbListaPresenca.id = id;		
            myWindow.document.getElementById("content-pages").appendChild(tbListaPresenca);

            setTimeout(function() {
                myWindow.print();
                myWindow.close(); 
            }, 1500); 

    }catch(err){
        console.log('Erro na funcao '+ err.message);
        alert('DESCULPE, OCORREU UM ERRO! Tente novamente ou Contate o administrador');
        myWindow.close();
    }
}
    
