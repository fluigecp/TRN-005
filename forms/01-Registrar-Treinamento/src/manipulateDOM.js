"use strict"
/** @module DOMManipulationModule */

var manipulateDOM = (function () {

    var actions4Listeners = {
        /**
         * @description Função listener para expandir um textarea
         */
        expandTextAreaListener: function (event) {
            event.preventDefault()
            var type = $(this).prop("tagName")
            var classe = ($(this).attr("class")).indexOf("expand")
            $(this).css("resize", "none")
            if (classe > -1) {
                $(this).show("slow", function () {
                    $(this).css({
                        "display": "block",
                        "overflow-y": "hidden"
                    })
                    expandTextarea(this.id)
                })
            }
        },
        /**
         * @description Função listener para alterar a visibilidade dos elementos de data
         */
        changeVisibilityDateElementsListener: function () {
            var qtd = $(this).val()
            var fieldsVisible
            var fieldsInvisible
            switch (qtd) {
            case "1":
                fieldsVisible = ["datas", "hdata1", "data1Container", "presencaData1"]
                fieldsInvisible = ["hdata2", "hdata3", "hdata4", "hdata5", "data2Container", "data3Container",
                    "data4Container", "data5Container", "presencaData2", "presencaData3",
                    "presencaData4", "presencaData5"
                ]
                break
            case "2":
                fieldsVisible = ["datas", "hdata1", "hdata2", "data1Container", "data2Container",
                    "presencaData1", "presencaData2"
                ]
                fieldsInvisible = ["hdata3", "hdata4", "hdata5", "data3Container",
                    "data4Container", "data5Container", "presencaData3",
                    "presencaData4", "presencaData5"
                ]
                break
            case "3":
                fieldsVisible = ["datas", "hdata1", "hdata2", "hdata3", "data1Container", "data2Container",
                    "data3Container", "presencaData1", "presencaData2", "presencaData3"
                ]
                fieldsInvisible = ["hdata4", "hdata5", "data4Container", "data5Container",
                    "presencaData4", "presencaData5"
                ]
                break
            case "4":
                fieldsVisible = ["datas", "hdata1", "hdata2", "hdata3", "hdata4", "data1Container", "data2Container",
                    "data3Container", "data4Container", "presencaData1", "presencaData2", "presencaData3",
                    "presencaData4"
                ]
                fieldsInvisible = ["hdata5", "data5Container", "presencaData5"]
                break
            case "5":
                fieldsVisible = ["datas", "hdata1", "hdata2", "hdata3", "hdata4", "hdata5", "data1Container", "data2Container",
                    "data3Container", "data4Container", "data5Container", "presencaData1", "presencaData2", "presencaData3",
                    "presencaData4", "presencaData5"
                ]
                fieldsInvisible = []
                break
            default:
                fieldsVisible = []
                fieldsInvisible = ["datas", "hdata1", "hdata2", "hdata3", "hdata4", "hdata5", "data1Container", "data2Container",
                    "data3Container", "data4Container", "data5Container", "presencaData1", "presencaData2", "presencaData3",
                    "presencaData4", "presencaData5"
                ]

                break
            }
            showOrHideFieldsByClassName(fieldsVisible, true)
            showOrHideFieldsByClassName(fieldsInvisible, false)
        },
        /**
         * @description Função listener para adicionar uma nova linha na tabela pai-filho
         */
        addLinhaPaiFilhoListener: function () {
            var row = wdkAddChild("tbRegistroTreinamento")
            initMasks()
        },
        /**
         * @description Função listener para remover uma linha na tabela pai-filho
         */
        removeLinhaPaiFilhoListener: function () {
            fnWdkRemoveChild(this)
        },
        /**
         * @description Função listener para replicar a última linha da tabela pai-filho
         */
        replicarUltimaLinhaPaiFilhoListener: function (event) {
            //Obter todas as linhas da tabela de treinamento, desconsiderando a primeira
            var regCount = $("#tbRegistroTreinamento table tbody tr.tableBodyRow:not(:first)").length
            if (regCount > 0) {
                var row = wdkAddChild("tbRegistroTreinamento")
                $("#setor___" + row).val($("#setor___" + row).closest(".tableBodyRow").prev().find("input[name*=\"setor___\"]").val())
                if ($("#setor___" + row).val() != "") {
                    FLUIGC.autocomplete("input#setor___" + row).add({
                        "departamento": $("#setor___" + row).val()
                    })
                }
                $("#nome___" + row).val($("#nome___" + row).closest(".tableBodyRow").prev().find("input[name*=\"nome___\"]").val())
                if ($("#nome___" + row).val() != "") {
                    FLUIGC.autocomplete("input#nome___" + row).add({
                        "colleagueName": $("#nome___" + row).val()
                    })
                }
                $("#matricula___" + row).val($("#matricula___" + row).closest(".tableBodyRow").prev().find("input[name*=\"matricula___\"]").val())
                if ($("#matricula___" + row).val() != "") {
                    FLUIGC.autocomplete("input#matricula___" + row).add({
                        "colleagueId": $("#matricula___" + row).val()
                    })
                }
                $("#nome___" + row).val($("#nome___" + row).closest(".tableBodyRow").prev().find("input[name*=\"nome___\"]").val())
                $("#presencaData1___" + row).val($("#presencaData1___" + row).closest(".tableBodyRow").prev().find("input[name*=\"presencaData1___\"]").val())
                $("#presencaData2___" + row).val($("#presencaData2___" + row).closest(".tableBodyRow").prev().find("input[name*=\"presencaData2___\"]").val())
                $("#presencaData3___" + row).val($("#presencaData3___" + row).closest(".tableBodyRow").prev().find("input[name*=\"presencaData3___\"]").val())
                $("#presencaData4___" + row).val($("#presencaData4___" + row).closest(".tableBodyRow").prev().find("input[name*=\"presencaData4___\"]").val())
                $("#presencaData5___" + row).val($("#presencaData5___" + row).closest(".tableBodyRow").prev().find("input[name*=\"presencaData5___\"]").val())
                initMasks()
            }
        },
        /**
         * @description Função listener para alterar uma deperminada coluna de data do header da tabela pai-filho
         */
        changeTableHeaderDateListener: function (event) {
            var classHeaderName = event.data.classHeaderName
            var contextElement = event.data.contextElement
            var classHeaderNameField = $("." + classHeaderName)
            var contextElementField = $("#" + contextElement)
            classHeaderNameField.html(contextElementField.val() != "" ? contextElementField.val() : "__/__/____")
        }


    }

    var zoomFields = {
        /**
         * @description Função responsável por determinar o comportamento da interação com os
         * campos de zoom do formulário.
         * @param selectedItem Elemento zoom que foi modificado no formulário
         */
        eventZoom: function (selectedItem) {
            if (selectedItem.inputName == "responsavelTreinamento") {
                if (event.type != "load") {
                    document.getElementById("responsavelTreinamentoID").value = selectedItem.colleagueId
                }
            }

            if (selectedItem.inputName.indexOf("matricula___") != -1) {
                var matProperty = selectedItem.colleagueId
                var nameProperty = selectedItem.colleagueName
                var inputName = selectedItem.inputName

                if (!zoomFields.checkIfExists(matProperty, inputName)) {
                    if (event.type != "load") {
                        var $matriculaField = $("input[name*=" + inputName + "]")
                        var $nomeField = $matriculaField.closest(".fs-v-align-middle").next().find("input[name*=nome___]")
                        if (nameProperty != "" && nameProperty != undefined) {
                            $nomeField.val(nameProperty)
                            FLUIGC.autocomplete("#" + $nomeField.attr("id")).add({
                                "colleagueName": nameProperty
                            })
                        }
                    }
                } else {
                    var $matriculaField = $("input[name*=" + inputName + "]")
                    $matriculaField.closest(".fs-v-align-middle").find("span[data-role=remove]").click()
                }
            }

            if (selectedItem.inputName.indexOf("nome___") != -1) {
                var matProperty = selectedItem.colleagueId
                var nameProperty = selectedItem.colleagueName
                var inputName = selectedItem.inputName
                if (!zoomFields.checkIfExists(nameProperty, inputName)) {
                    if (event.type != "load") {
                        var $nomeField = $("input[name*=" + inputName + "]")
                        var $matriculaField = $nomeField.closest(".fs-v-align-middle").prev().find("input[name*=matricula___]")
                        if (matProperty != "" && matProperty != undefined) {
                            $matriculaField.val(matProperty)
                            FLUIGC.autocomplete("#" + $matriculaField.attr("id")).add({
                                "colleagueId": matProperty
                            })
                        }
                    }
                } else {
                    var $nameField = $("input[name*=" + inputName + "]")
                    $nameField.closest(".fs-v-align-middle").find("span[data-role=remove]").click()
                }
            }
        },
        /**
         * @description Verifica na tabela se existe alguma linha onde já exista uma determinada propriedade
         * @param property Propriedade a ser verificada
         * @param inputName Objeto input que foi modificado
         * @return Boolean: true caso existe, false caso não exista
         */
        checkIfExists: function (property, inputName) {
            var exists = false
            $("#tbRegistroTreinamento table tbody tr.tableBodyRow:not(:first)").each(function () {
                var $currentMat = $(this).find("input[name*=" + inputName.substr(0, inputName.indexOf("___") + 3) + "]")
                if (property == $currentMat.val()) {
                    if (inputName != $currentMat.attr("name")) {
                        exists = true
                        return false
                    }
                }
            })
            return exists
        }
    }
    /**
     * @description Adiciona na tabela pai-filho o primeiro header da tabela
     * @param considerTrash Booleano para considerar ou não a primeira coluna(lixeira) da tabela pai-filho
     */
    var addFirstHeaderTable = function (considerTrash) {
        if (considerTrash) {
            $("thead").prepend("<tr><th colspan=\"4\" class=\"tableColumn text-center\">" +
                "Lista de presença</th><th colspan=\"5\" class=\"tableColumn text-center\">Assinatura(s)</th>")
        } else {
            $("thead").prepend("<tr><th colspan=\"3\" class=\"tableColumn text-center\">" +
                "Lista de presença</th><th colspan=\"5\" class=\"tableColumn text-center\">Assinatura(s)</th>")
        }
    }
    /**
     * @description Altera a visibilidade de um array de campos.
     * @param fields Array de nomes de classes
     * @param visible Booleano: true para tornar visível, false para tornar invisível.
     */
    var showOrHideFieldsByClassName = function (fields, visible) {
        $.each(fields, function (index, value) {
            if (visible) {
                $("." + value).css("display", "")
            } else {
                $("." + value).css("display", "none")
            }
        })
    }
    /**
     * @description Função utilizada para expandir um textarea
     * @param id id do elemento a ser expandido
     */
    var expandTextarea = function (id) {
        var element = document.getElementById(id)
        if (element.scrollHeight != null) {
            var altura = element.scrollHeight + "px"
            $(element).animate({
                overflow: "hidden",
                height: altura
            })
        }
    }
    /**
     * @description Inicia o calendário em um objeto na DOM
     * @param input Objeto em que o calendário será inicializado
     */
    var initCalendar = function (input) {
        //Atribuindo calendário a cada campo de data/hora;
        $(input).css("background-color", "white")
        $(input).focus(function (event) {
            var data = $(this).attr("data-date-hour")
            dateFunctions.calendar.get(this, data)
        })
        // Limpa campo calendar ao clicar no botão limpar do respectivo campo.
        $("span.sp-clear").on("click", function (event) {
            $(this).closest(".form-group").find("input").val("").change()
        })
    }
    /**
     * @description Inicia as máscaras em todos os elementos da DOM que possuem o atributo 'mask'
     */
    var initMasks = function () {
        var inputs = $("[mask]")
        MaskEvent.initMask(inputs)
    }
    /**
     * @description Chama o modo impressão da lista de presença
     */
    var callPrintMode = function () {
        geraListaPresenca()
    }
    /**
     * @description Transforma quebra de texto \n por tags <br>
     * @param elementId id do elemento em que o conteúdo será alterado
     */
    var changeToBreakLine = function (elementId) {
        var textWithBr = $("#" + elementId).text().replace(/\n/g, "<br>")
        $("#" + elementId).html(textWithBr)
    }
    /**
     * @description Altera o header da tabela pai-filho com um valor de um determinado campo
     * @param classHeaderName Nome da classe do header a ser alterado
     * @param mode Modo de visualização do formulário
     * @param contextElement Elemento que irá prover o valor a ser atribuido
     */
    var changeTableHeaderDate = function (classHeaderName, mode, contextElement) {
        if (mode == "VIEW") {
            $("." + classHeaderName).html($(contextElement).text() != "" ? $(contextElement).text() : "__/__/____")
        } else {
            $("." + classHeaderName).html($(contextElement).val() != "" ? $(contextElement).val() : "__/__/____")
        }
    }
    /**
     * @description Preenche alguns campos do formulário dinamicamente
     */
    var preencheCamposComValorPadrao = function () {
        $("#resumoPrograma").text($("#documentosMatriz").val())
        if ($("#titulo").val() == "") {
            $("#titulo").val("Orientações Matriz de Treinamento – Documentos SGQ")
        }
        var area = $("#areaMatriz").val()
        var cargo = $("#cargoMatriz").val()
        var textObjetivo = "Orientar o(s) participante(s) quanto aos documentos " +
            "relacionados ao cargo de " + cargo + " referente à área " + area
        $("#objetivo").text(textObjetivo)
    }
    /**
     * @description Gera um botão de link para o número da solicitação da matriz de treinamento
     * que originou a abertura do processo
     */
    var showMessageNumSolic = function () {
        // gera a mensagem com o numero da solicitação da matriz de treinamentos.
        var numSolicMatriz = $("#numSolicMatriz").val()
        if (numSolicMatriz != "" && numSolicMatriz != undefined && numSolicMatriz != null) {
            var htmlMatriz = "<a href='/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" +
                numSolicMatriz + "' target='_blank'><button class='btn btn-primary btn-insert' type='button'><span class='fluigicon fluigicon-process-details'></span> Matriz de treinamento de origem</button></a>"
            $("#numSolicMatrizContainer").html(htmlMatriz)
        }
    }
    /**
     * @description expande textarea do histórico
     * @param id id do campo
     */
    var expandTextareaHistorico = function (id) {
        var objTextArea = document.getElementById(id)
        if (objTextArea.scrollHeight > objTextArea.offsetHeight) {
            objTextArea.rows += 1
        }
    }
    /**
     * @description Mostra o histórico completo
     */
    var mostraHistorico = function () {
        var historico = "historico"
        document.getElementById(historico).style.display = "inline"
        expandTextarea(historico)
    }
    return {
        actions4Listeners: actions4Listeners,
        zoomFields: zoomFields,
        addFirstHeaderTable: addFirstHeaderTable,
        showOrHideFieldsByClassName: showOrHideFieldsByClassName,
        expandTextarea: expandTextarea,
        initCalendar: initCalendar,
        initMasks: initMasks,
        callPrintMode: callPrintMode,
        changeToBreakLine: changeToBreakLine,
        changeTableHeaderDate: changeTableHeaderDate,
        preencheCamposComValorPadrao: preencheCamposComValorPadrao,
        showMessageNumSolic: showMessageNumSolic,
        expandTextareaHistorico: expandTextareaHistorico,
        mostraHistorico: mostraHistorico
    }
})()