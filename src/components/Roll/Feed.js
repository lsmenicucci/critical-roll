// import rect modules
import React, { useState } from "react";
import styled from "styled-components";
import { useSprings, animated } from "react-spring";
import { useSelector } from "react-redux";

// icons
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import theme variables
import theme from "../../config/theme";

// local components
import RollObserverComponent from "./Observer";

const RollObserver = styled(RollObserverComponent)`
  position: absolute;
  max-height: 100%;
`;

const ObserversList = styled.div`
  position: relative;
  flex: 1;
  height: 90px;
  display: flex;
  flex-flow: column;
  overflow-y: hidden;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 4px;
`;

const AnimatedRollObserver = animated(RollObserver);

export default () => {
  const [selectedIndex, setSelected] = useState(0);
  const [turn, session] = useSelector((state) => [state.turn, state.session]);

  const rollingChars = Array.from(
    new Set(turn && turn.dices && turn.dices.map((d) => d.forWho))
  );

  const getPos = (index) => ({
    top: `${
      16 * Math.sign(index - selectedIndex) + 100 * (index - selectedIndex)
    }%`,
  });

  const [springs, set] = useSprings(rollingChars.length, getPos);

  const showNext = () => {
    setSelected((selectedIndex + 1) % rollingChars.length);
    set(getPos);
  };

  const showPrevious = () => {
    setSelected(
      selectedIndex === 0
        ? rollingChars.length - 1
        : (selectedIndex - 1) % rollingChars.length
    );
    set(getPos);
  };

  return (
    rollingChars.length > 0 && (
      <React.Fragment>
        <ObserversList>
          {springs.map((style, k) => (
            <AnimatedRollObserver
              charId={rollingChars[k]}
              style={style}
              key={k}
            />
          ))}
        </ObserversList>
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
