// import react stuff
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

// import theme variables
import { colors as themeColors } from "../../config/theme";

// import redux actions
import actions from "../../shared/actions";

// import local components
import TextField from "../Form/TextField";
import Button from "../Buttons/Normal";
import Spinner from "../Form/Spinner";

const LoginFormContainer = styled.form`
  display: flex;
  justify-content: center;
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

export default () => {
  const [formData, setFormData] = useState({
    url: "",
    charKey: "",
  });

  // redux hooks
  const [connection, session] = useSelector((state) => [
    state.connection,
    state.session,
  ]);

  const dispatch = useDispatch();

  // handle form change
  const handleFormChange = ({ target }) => {
    return setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // submit form
  const submitForm = (event) => {
    event.preventDefault();
    if (connection.connected) {
      dispatch(actions.loadSession({ charKey: formData.charKey }));
    } else {
      dispatch(actions.connect({ url: formData.url }));
    }
  };

  if (session.charId || session.isMaster) {
    return <Redirect to="/" />;
  }

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
        disabled={connection.conneting || (session && session.loading)}
      >
        {connection.conneting || (session && session.loading)
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
      {session && session.error ? (
        <ErrorMessage>Chave de personagem invalida</ErrorMessage>
      ) : (
        ""
      )}
    </LoginFormContainer>
  );
};
