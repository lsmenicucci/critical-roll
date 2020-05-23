// import react modules
import React from "react";
import styled from "styled-components";

// import theme variables
import theme from "../../config/theme";

const DiceContainer = styled.div`
  align-items: center;
  display: flex;
  border-radius: ${theme.layout.borderRadius};
  background: ${theme.colors.whiteOne};
  color: ${({ active }) => (active ? theme.colors.red : theme.colors.blueOne)};
  border: 1.2px
    ${({ active }) => (active ? theme.colors.red : theme.colors.blueOne)} solid;
  padding: 2px;
  font-family: ${theme.font.family};
  font-size: 12px;
`;

const DiceValue = styled.span`
  background: ${({ active }) =>
    active ? theme.colors.red : theme.colors.blueOne};
  border-radius: ${theme.layout.borderRadius} 0 0 ${theme.layout.borderRadius};
  display: flex;
  color: ${theme.colors.whiteOne};
  justify-content: flex-end;
  padding: 0 2px;
  margin-right: 4px;
  width: 24px;
`;

const DiceInput = styled.input`
  outline: 0;
  background: transparent;
  font-family: ${theme.font.family};
  color: ${({ active }) => (active ? theme.colors.red : theme.colors.blueOne)};
  border: 0;
  width: 40px;
`;

export default ({ type, value, editable, onEdit, ...props }) => {
  const handleChange = (evt) => onEdit && onEdit(evt.target.value);

  return (
    <DiceContainer {...props}>
      {editable ? (
        <React.Fragment>
          d<DiceInput type="number" onChange={handleChange} min={0} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DiceValue active={props.active}>{value || "??"}</DiceValue>
          {type && `d${type}`}
        </React.Fragment>
      )}
    </DiceContainer>
  );
};
