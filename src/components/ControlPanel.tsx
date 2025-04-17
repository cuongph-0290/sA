import React from "react";
import { useRecoilState } from "recoil";
import { controlPanel } from "../state/control_panel";

const ControlPanel: React.FC = () => {
  const [controlPanelState, _] = useRecoilState(controlPanel);

  return controlPanelState;
};

export default ControlPanel;
