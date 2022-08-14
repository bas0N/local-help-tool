import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";

import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

function Navbar() {
  const pathMatchRoute = (route: string): number => {
    if (route === "/offers") {
      return 0;
    }
    if (route === "/profile") {
      return 2;
    }
    return 1;
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(pathMatchRoute(location.pathname));

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Offers"
        icon={<OfferIcon />}
        onClick={() => navigate("/offers")}
      />
      <BottomNavigationAction
        label="Explore"
        icon={<ExploreIcon />}
        onClick={() => navigate("/")}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<PersonOutlineIcon />}
        onClick={() => navigate("/profile")}
      />
    </BottomNavigation>
  );
}

export default Navbar;
