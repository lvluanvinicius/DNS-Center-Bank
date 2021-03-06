<?php


namespace db\Messages;


/**
 * Class Messages
 * @package db\Messages
 */
class Messages
{
    /**
     * @var string
     */
    private $ErrorActionsEmptyTransferData = "Não foi localizado nenhum Dado para realizar a transferência. Por favor, consulte seu gerente.";
    /**
     * @var string
     */
    private $ErrorActionsEmptyTransferDataAccountTarget = "O campo da conta, precisa ser preenchido.";
    /**
     * @var string
     */
    private $ErrorActionsEmptyTransferDataAgencyTarget = "O campo da agência, precisa ser preenchido.";
    /**
     * @var string
     */
    private $ErrorActionsEmptyTransferDataTargetValue = "O campo do valor, precisa ser preenchido.";

    /**
     * @var string
     */
    private $ErrorActionsEmptyTransferAgencyTargetNotFound = "A agencia informada não existe.";
    /**
     * @var string
     */
    private $ErrorActionsTransferAccountTargetNotFound = "A conta conta informada não existe";

    /**
     * @var string
     */
    private $ErrorActionsTransferException = "Houve um erro no sistema, por favor, consulte seu gerente.";
    /**
     * @var string
     */
    private $ErrorActionsTransferBigger = "Você não pode transferir um valor maior do que você possui.";
    /**
     * @var string
     */
    private $ErrorActionsTransferSmaller = "Você não pode transferir um valor menor do que você possui ou menor que 1.";

    /**
     * @var string
     */
    private $ErrorActionsTransferAccountEqual = "A conta de destino não pode ser igual sua própria conta.";

    /**
     * @var string
     */
    private $ErrorActionUnblockedBalanceNotFound = "Não foi possível desbloquear seu saldo, por favor, consulte seu gerente.";
    /**
     * @var string
     */
    private $ErrorActionUnblockedBalanceWhiteOrZero = "Você não possui saldo a ser desbloqueado";

    /**
     * @var string
     */
    private $SuccessActionTransfer = "Transferência realizada com sucesso!";
    /**
     * @var string
     */
    private $SuccessActionUblockedBalance = "Desbloqueio realizado com sucesso";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalUsernameExisis = "O usuário informado já existe.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalNotInformateDataBirth = "Não foi informado nenhuma data de nascimento.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalAgeDoesNotMatchDateOfBirth = "A data de nascimento não confere a idade informada.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalDocumentInvalid = "O CPF informado é inválido.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalNotInformateAge = "A idade não foi informada.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalNotInformateName = "O nome não foi informado corretamente.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalNotInformateSex = "O sexo não foi selecionado corretamente.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalNotInformateIdent = "Informe o RG não foi informado corretamente.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalNotInformateDocument = "Informe o CPF não foi informado corretamente.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalNotInformateZipCode = "O Cép não foi informado.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalNotInformateNumber = "O numero da residência não foi informado.";

    /**
     * @var string
     */
    private $ErrorUpdatePersonalSelectImage = "Nenhuma imagem foi selecionada.";

    /**
     * @var string
     */
    private $UpdatePersonalSuccess = "Dados atualizados com sucesso.";

    /**
     * @var string
     */
    private $UpdatePersonalError = "Houve um erro ao tenmtar salvar os dados, por favor, entre em contato com seu gerente.";

    /**
     * @var string
     */
    private $UpdateErrorNotExistisDataPersonal = "Você ainda não possui um endereço cadastrado, por favor, cadastre um imediatamente.";

    /**
     * @var string
     */
    private $UpdateErrorExceptionProgram = "Houve um erro de excessão, por favor, entre em contato com seu gerente.";

    /**
     * @var string
     */
    private $CreateNewUserSuccess = "Sua conta foi criada com sucesso, aproveite.";

    /**
     * @var string
     */
    private $CreateNewUserError = "Não foi possível criar sua conta, por favor verifique os dados informado ou entre em contato com um de nossos atendentes.";

    /**
     * @var string
     */
    private $CreateNewAccountCreate = "Houve um erro ao gerar uma conta para você, por favor, entre em contato com um de nossos atendentes.";

    /**
     * @var string
     */
    private $CreateNewUserErrorExists = "E-mail informado já existe em nosso sistema.";

    /**
     * @var string
     */
    private $CreateNewUserPostEmpty = "Você não pode criar uma conta sem dados cadastrais.";

    /**
     * @var string
     */
    private $CreateNewUserNameEmpty = "Por favor, informe o nome.";

    /**
     * @var string
     */
    private $CreateNewUserEmialEmpty = "Por favor, informe um e-mail para acesso.";

    /**
     * @var string
     */
    private $CreateNewUserPasswordEmpty = "Por favor, informe uma senha de acesso.";

    /**
     * @var string
     */
    private $CreateNewUserPasswordSmall = "Por favor, informe uma senha com mais de 8 dígitos";

    /**
     * @param $name
     * @return mixed
     */
    public function getMessages($name)
    {
        return $this->$name;
    }

}