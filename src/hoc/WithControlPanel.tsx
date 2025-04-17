import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { controlPanel } from "../state/control_panel";

export default function WithControlPanel(C, CP = null) {
  const F: React.FC = (props) => {
    const [_, setControlPanelState] = useRecoilState(controlPanel);

    useEffect(() => {
      if (!!CP) {
        setControlPanelState(<CP />);
      } else {
        setControlPanelState(null);
      }
    }, []);

    return <C {...props} />;
  };

  return F;
}
