/// Dialog message
function Notify(config) {
    $.confirm({
        title: "",
        content: config.message,
        type: config.color,
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'Ok',
                action: function(){
                }
            }
        }
    });
}
/// End Dialog message

/// Start Format Dade Transfer
function formatDateTransfer(date, type) {
    var data = new Date(date);
    if (type === 'hour') {
        let h = data.getHours();
        let m = data.getMinutes();
        let s = data.getSeconds();
        return `${h.toString().length === 1 ? `0${h}` : h}:${m.toString().length === 1 ? `0${m}` : m}:${s.toString().length === 1 ? `0${s}` : s}`;

    } else if (type === 'date') {
        let d = data.getDay();
        let m = data.getMonth();
        let y = data.getUTCFullYear();
        return `${d.toString().length === 1 ? `0${d}` : d}/${m.toString().length === 1 ? `0${m}` : m}/${y.toString().length === 1 ? `0${y}` : y}`;
    }
}
/// End Format Dade Transfer

/// Start Message Transaction Dialog Config
function MessageDialogTransaction(config) {
    return `<li>&#10004; Uma transação foi realizada para ${config.name} na conta ${config.account_target} as ${formatDateTransfer(config.created_at, 'hour')}, <span style='cursor: pointer;color: #0d6efd' onclick="load_details_trasactions(${config.id_tr})">Mais detalhes<a></li>`;
}

function MessageDialogTransactionRecv(config) {
    return `<li>&#10004; Uma transação foi recebida de ${config.name} as ${formatDateTransfer(config.created_at, 'hour')}, <span style='cursor: pointer;color: #0d6efd' onclick="load_details_trasactions(${config.id_tr})">Mais detalhes<a></li>`;
}
/// End Message Transaction Dialog Config


/// Start Action Run Data Account
function load_data() {

    $.post("api.php", {
        action: "return_account"
    }, function (response) {
        let data = JSON.parse(response);
        $("#balance").text(data.ac_balance);
        $("#blocked_balance").text(data.ac_blocked_balance);
        $("#agency_account").text(data.ac_agency);
        $("#account_number").text(data.ac_account);
    });
}
/// End Action Run Data Account

function load_data_transfer() {
    if (window.location.pathname === "/SiteHTML-Bootstrap/painel.php") {
        $.post("api.php", {
            action: "return_transactions",
            account_number: document.getElementById("account_number").innerText
        }, function (response) {
            const resp = JSON.parse(response);
            document.getElementById('log-content-transactions').innerHTML = "";

            if (resp.status) {
                for (let dt of resp) {
                    if (document.getElementById("account_number").innerText === dt.ac_account_destiny) {
                        $("#log-content-transactions").append(MessageDialogTransactionRecv({
                            name: dt.ac_name,
                            id_tr: dt.id_tr,
                            created_at: dt.created_at
                        }));
                    } else {
                        $("#log-content-transactions").append(MessageDialogTransaction({
                            name: dt.ac_name,
                            id_tr: dt.id_tr,
                            account_target: dt.ac_account_destiny,
                            created_at: dt.created_at
                        }));
                    }
                }
            } else {
                document.getElementById('log-content-transactions').innerHTML = "Nenhuma transação localizada.";
            }
        });
    }
}

/// Start Load Datas
$(window).ready(function () {
    setTimeout(function () { load_data_transfer() }, 200);
    load_data();
    setInterval(function () { load_data() }, 1000);

});

/// End Load Datas

/// start Format Value
try {
    var currencyInput = document.querySelector('input[type="currency"]');
    var currency = 'BRL'; // https://www.currency-iso.org/dam/downloads/lists/list_one.xml
// format inital value
    onBlur({target:currencyInput});
// bind event listeners
    currencyInput.addEventListener('focus', onFocus);
    currencyInput.addEventListener('blur', onBlur);

    function localStringToNumber( s ){
        return Number(String(s).replace(/[^0-9.-]+/g,""));
    }
    function onFocus(e){
        var value = e.target.value;
        e.target.value = value ? localStringToNumber(value) : ''
    }
    function onBlur(e){
        var value = e.target.value;
        var options = {
            maximumFractionDigits : 2,
            currency              : currency,
            style                 : "currency",
            currencyDisplay       : "symbol"
        }
        e.target.value = (value || value === 0)
            ? localStringToNumber(value).toLocaleString(undefined, options)
            : ''
    }
} catch (e) {
}
/// End Format Value

/// Start transfer
$("#tensfer-value").click(function () {
    window.event.preventDefault();

    const data = {
        agency_account  : $("#agency_account").text(),
        account_number  : $("#account_number").text(),
        account_target  : $("#account-target").val(),
        agency_target   : $("#agency-target").val(),
        value_target    : $("#value-target").val().replace(",", ".").replace("R$", "").replace(" ", "").trim(),
    }

    $.post("transfer.php", {
        action: "transfer", data
    },function (response) {
        const resp = JSON.parse(response);
        if (resp.status) {
            Notify({message: resp.message, color: "green"});
        } else {
            Notify({message: resp.message, color: "orange"});
        }
    });
});
/// End transfer

/// Start Unblocked
$("#btn-unblocked").click(function () {
    window.event.preventDefault();
    $.post("transfer.php", {
        action: "unblocked",
        value_blocked: parseFloat(document.getElementById('blocked_balance').innerText)
    }, function (response) {
        console.log(response)
        let resp = JSON.parse(response);

        if (resp.status) {
            Notify({message: resp.message, color: "green"});
        } else {
            Notify({message: resp.message, color: "orange"});
        }
    });


});
/// End Unblocked

/// Action Exit Account...
$("#exit-system-action").click(() => {
    window.event.preventDefault();
    $.confirm({
        title: 'Atenção',
        content: 'Deseja realmente sair?',
        type: 'blue',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'Sair',
                action: function(){
                    $.post("login.php", {
                        action: "logout"
                    }, function (response) {
                        window.location.reload();
                        window.location.href = "index.php";
                    });
                }
            },
            close: {
                text: "Não",
                action: function() {
                }
            }
        }
    });
});
/// End Action Exit Account


/// Start Load details
function configDetails(config) {
    return `<div class="card">
              <div class="card-body">
                <h5 class="card-title">Destino: ${config.resp.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${config.type}</h6>
                <p class="card-text">
                    <ul class="" style="list-style: none; border-left: 2px solid #3498db">
                        ${config.li}
                    </ul>
                </p>
              </div>
            </div>
        `;
}
function load_details_trasactions(id) {
    $.post("transfer.php", {
        action: "transfer_details",
        transfer_id: id
    }, function (response) {
        resp = JSON.parse(response);
        if (!resp.status) {
            if (document.getElementById("account_number").innerText === resp.ac_account_destiny) {
                $.alert({
                    title:'',
                    type: 'blue',
                    typeAnimated: false,
                    buttons: {
                        tryAgain: {
                            text: 'Fechar'
                        }
                    },
                    content: configDetails({
                        li: `Uma transação foi recebida de ${resp.name} no dia ${formatDateTransfer(resp.created_at, 'date')} as ${formatDateTransfer(resp.created_at, 'hour')}
                        <br/>
                        <hr/>
                        <div>
                            <strong>Valor: </strong><span>R$ ${resp.value_transaction}</span><hr/>
                            <strong>Conta de destino: </strong><span>${resp.ac_account_destiny}</span><hr/>
                            <strong>Agência de destino: </strong><span>${resp.ac_agency_destiny}</span>
                        </div>
                        <hr/>
                        <div>
                            <strong>E-mail: </strong><span>${resp.email}</span><hr/>
                        </div>
                        `,
                        resp: resp,
                        type: "Transação recebida"
                    }),
                });
            } else {
                $.alert({
                    title: '',
                    type: 'blue',
                    typeAnimated: false,
                    buttons: {
                        tryAgain: {
                            text: 'Fechar'
                        }
                    },
                    content: configDetails({
                        li: `Uma transação realizada para ${resp.name} no dia ${formatDateTransfer(resp.created_at, 'date')} as ${formatDateTransfer(resp.created_at, 'hour')}
                        <br/>
                        <hr/>
                        <div>
                            <strong>Valor: </strong><span>R$ ${resp.value_transaction}</span><hr/>
                            <strong>Conta de destino: </strong><span>${resp.ac_account_destiny}</span><hr/>
                            <strong>Agência de destino: </strong><span>${resp.ac_agency_destiny}</span>
                        </div>
                        <hr/>
                        <div>
                            <strong>E-mail: </strong><span>${resp.email}</span><hr/>
                        </div>
                        `,
                        resp: resp,
                        type: "Transação realizada"
                    }),
                });
            }
        }
    });

    //
}
// End Load Details

/// Start check Zip Code
//https://viacep.com.br/ws/{zip}/json/unicode/
function clearInputs() {
    $("input[name='public_place']").val('');
    $("input[name='district']").val('');
    $("input[name='city']").val('');
    $("input[name='state-select']").val('');
}
function checkZipCode() {
    let zip = $("input[name='zip_code']").val();
    zip = zip.replace(/\D/g, '');

    if (zip !== "") {

        var checkCepValidate = /^[0-9]{8}$/;

        if(checkCepValidate.test(zip)) {

            $.getJSON(`https://viacep.com.br/ws/${zip}/json/?callback=?`, function(response) {

                if (!("erro" in response)) {
                    $("input[name='public_place']").val(response.logradouro);
                    $("input[name='district']").val(response.bairro);
                    $("input[name='city']").val(response.localidade);
                    $("input[name='state-select']").val(response.uf);
                }
                else {
                    clearInputs()
                    Notify({ message: "CEP não encontrado.", color: "red"});
                }
            });
        }
        else {
            clearInputs();
            Notify({ message: "Formato de CEP inválido.", color: "red"});
        }
    }
    else {
        clearInputs();
    }
}
/// End check Zip Code





























