// import rect modules
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// icons
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import theme variables
import theme from "../../config/theme";

// local components
import RollObserverComponent from "./Observer";

const RollObserver = styled(RollObserverComponent)`
  max-height: 100%;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 4px;
`;

export default () => {
  const [selectedIndex, setSelected] = useState(0);
  const [turn, session] = useSelector((state) => [state.turn, state.session]);

  const rollingChars = Array.from(
    new Set(turn && turn.dices && turn.dices.map((d) => d.forWho))
  );

  const showNext = () => setSelected((selectedIndex + 1) % rollingChars.length);

  const showPrevious = () =>
    setSelected(
      selectedIndex === 0
        ? rollingChars.length - 1
        : (selectedIndex - 1) % rollingChars.length
    );

  return (
    rollingChars.length > 0 && (
      <React.Fragment>
        <RollObserver charId={rollingChars[selectedIndex]}></RollObserver>
        {rollingChars.length > 1 && (
          <MenuContainer>
            <FontAwesomeIcon icon={faAngleUp} onClick={showNext} />
            <FontAwesomeIcon icon={faAngleDown} onClick={showPrevious} />
          </MenuContainer>
        )}
      </React.Fragment>
    )
  );
};
