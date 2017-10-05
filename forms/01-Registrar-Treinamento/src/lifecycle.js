    "use strict";
    /** Global Variables */
    var activity = 0,
        modo = '',
        currentLocation = '';

    /**
     * @module Lifecycle
     */
    var lifecycle = (function () {
        /**
         * @description Função de inicialiazação do ciclo de vida do processo.
         */
        var init = function () {
            setup();
            logActivityInformation();
            control();
        };
        /**
         * @description Função que inicializa as variáveis globais que serão utilizadas ao longo do
         * ciclo de vida do processo.
         */
        var setup = function () {
            activity = getAtividade();
            modo = getFormMode();
            currentLocation = document.location.origin;
        };
        /**
         * @description Dispara um log da atividade.
         */
        var logActivityInformation = function () {
            console.log("Activity: ", activity);
            console.log("Modo: ", modo);
        };
        /**
         * @description Controla o ciclo de vida e os eventos do processo
         */
        var control = function () {
            // GLOBAL LISTENERS 
            $('.expand').on('click ', manipulateDOM.actions4Listeners.expandTextAreaListener);


            if (activity == 0 || activity == 4 || activity == 12 || activity == 15 || activity == 21 || activity == 26) {
                // Calendar init
                manipulateDOM.initCalendar('input[data-date-hour]');
                // listener add linha
                $('button#add-linha').on('click', manipulateDOM.actions4Listeners.addLinhaPaiFilhoListener);
                // listener replicar linha
                $('button#replicar-ultimaLinha').on('click', manipulateDOM.actions4Listeners.replicarUltimaLinhaPaiFilhoListener);
                // listener deletar linha
                $('div#tbRegistroTreinamento').on('mousedown', 'i.fluigicon-trash', manipulateDOM.actions4Listeners.removeLinhaPaiFilhoListener);
                // listener que controla a visibilidade dos campos de data
                $("#qtdDias").on("change", manipulateDOM.actions4Listeners.changeVisibilityDateElementsListener);
                // control date header on change
                $("#data1").on("change blur", {
                    classHeaderName: "hdata1",
                    contextElement: "data1"
                }, manipulateDOM.actions4Listeners.changeTableHeaderDateListener);
                $("#data2").on("change blur", {
                    classHeaderName: "hdata2",
                    contextElement: "data2"
                }, manipulateDOM.actions4Listeners.changeTableHeaderDateListener);
                $("#data3").on("change blur", {
                    classHeaderName: "hdata3",
                    contextElement: "data3"
                }, manipulateDOM.actions4Listeners.changeTableHeaderDateListener);
                $("#data4").on("change blur", {
                    classHeaderName: "hdata4",
                    contextElement: "data4"
                }, manipulateDOM.actions4Listeners.changeTableHeaderDateListener);
                $("#data5").on("change blur", {
                    classHeaderName: "hdata5",
                    contextElement: "data5"
                }, manipulateDOM.actions4Listeners.changeTableHeaderDateListener);
                // gera a mensagem com o numero da solicitação da matriz de treinamentos.
                manipulateDOM.showMessageNumSolic();
            }

            if (activity == 12 || activity == 15 || activity == 21 || activity == 26) {
                // control date header on DOM load
                manipulateDOM.changeTableHeaderDate("hdata1", "MOD", "[name*='data1']");
                manipulateDOM.changeTableHeaderDate("hdata2", "MOD", "[name*='data2']");
                manipulateDOM.changeTableHeaderDate("hdata3", "MOD", "[name*='data3']");
                manipulateDOM.changeTableHeaderDate("hdata4", "MOD", "[name*='data4']");
                manipulateDOM.changeTableHeaderDate("hdata5", "MOD", "[name*='data5']");

                if (activity == 12) {
                    $("#print").off("click").on("click", manipulateDOM.callPrintMode);
                }

                if (activity == 26) {
                    manipulateDOM.preencheCamposComValorPadrao();
                    $("#resumoPrograma").attr("readonly", true);
                }
            }


            if (modo == "VIEW") {
                // control date header on DOM load
                manipulateDOM.changeTableHeaderDate("hdata1", "VIEW", "[name*='data1']");
                manipulateDOM.changeTableHeaderDate("hdata2", "VIEW", "[name*='data2']");
                manipulateDOM.changeTableHeaderDate("hdata3", "VIEW", "[name*='data3']");
                manipulateDOM.changeTableHeaderDate("hdata4", "VIEW", "[name*='data4']");
                manipulateDOM.changeTableHeaderDate("hdata5", "VIEW", "[name*='data5']");

                // limpa as células da table.
                $(".presencaData1, .presencaData2, .presencaData3, .presencaData4, .presencaData5").empty();

                // adiciona primeiro header na table(desconsiderando a lixeira)
                manipulateDOM.addFirstHeaderTable(false);
                $(".input-group-addon").remove();

                if (activity == 26) {
                    // Troca enter(\n) por tag <br> no texto do textarea
                    manipulateDOM.changeToBreakLine("resumoPrograma");
                }
            }

        };
        return {
            init: init
        }
    })();
    