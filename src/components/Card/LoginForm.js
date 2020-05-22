// import react stuff
import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

// import theme variables
import { colors as themeColors } from "../../config/theme";

// import redux actions
import actions from "../../shared/actions";

// import local components
import TextField from "../Form/TextField";
import Button from "../Form/Button";
import Spinner from "../Form/Spinner";

const LoginFormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  transition: height 0.5s ease;
  margin: 0;
`;

const FormTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 0.2rem;
`;

const SubmitButton = styled(Button)`
  align-self: flex-end;
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
`;

const LoginForm = ({ connection, currentUser, dispatch }) => {
  const [formData, setFormData] = useState({
    url: connection.url,
    charKey: "",
  });

  const handleFormChange = ({ target }) => {
    return setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (connection.connected) {
      dispatch(actions.loadSession({ charKey: formData.charKey }));
    } else {
      dispatch(actions.connect({ url: formData.url }));
    }
  };

  return (
    <LoginFormContainer onSubmit={submitForm}>
      <FormTextField
        name="url"
        placeholder="URL do servidor"
        value={formData.url}
        onChange={handleFormChange}
        success={connection.connected}
        disabled={connection.connected}
      />
      {connection.connected ? (
        <FormTextField
          name="charKey"
          placeholder="Chave do personagem"
          value={formData.charKey}
          onChange={handleFormChange}
        />
      ) : (
        ""
      )}
      <SubmitButton
        onClick={submitForm}
        disabled={connection.conneting || currentUser.loading}
      >
        {connection.conneting || currentUser.loading
          ? "Carregando..."
          : connection.connected
          ? "Carregar personagem"
          : "Conectar"}
      </SubmitButton>
      {connection.connectionError ? (
        <ErrorMessage>Falha ao conectar no servidor :T</ErrorMessage>
      ) : (
        ""
      )}
      {currentUser.error ? (
        <ErrorMessage>Chave de personagem invalida</ErrorMessage>
      ) : (
        ""
      )}
    </LoginFormContainer>
  );
};

const stateToProps = ({ connection, currentUser }) => ({
  connection,
  currentUser,
});

export default connect(stateToProps)(LoginForm);
