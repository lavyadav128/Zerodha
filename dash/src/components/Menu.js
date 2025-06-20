import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as MuiLink, Typography, Button, Box } from "@mui/material";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleLogout = () => {
    // Optional: clear any auth tokens here if needed
    navigate("/");
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div
      className="menu-container"
      style={{
        display: "flex",
        alignItems: "center",
        // keep existing styling untouched otherwise
      }}
    >
      <img
        src="logo.png"
        alt="logo"
        style={{ width: "50px", verticalAlign: "middle" }}
      />
      <div
        className="menus"
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "200px",
          flexGrow: 1,
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "0px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          {[
            { label: "Dashboard", to: "/dashboard" },
            { label: "Orders", to: "/orders" },
            { label: "Holdings", to: "/holdings" },
            { label: "Positions", to: "/positions" },
            { label: "Funds", to: "/funds" },
            { label: "Apps", to: "/apps" },
          ].map((item, index) => (
            <li key={item.to}>
              <MuiLink
                component={RouterLink}
                to={item.to}
                onClick={() => handleMenuClick(index)}
                underline="none"
                sx={{
                  fontWeight: selectedMenu === index ? "bold" : "600",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: "inherit",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
                className={selectedMenu === index ? activeMenuClass : menuClass}
              >
                <Typography component="span">{item.label}</Typography>
              </MuiLink>
            </li>
          ))}
        </ul>

        <hr
          style={{
            marginLeft: "0px",
            marginRight: "0px",
            height: "24px",
            alignSelf: "center",
            borderColor: "#ccc",
            borderWidth: "1px",
            borderStyle: "solid",
            opacity: 0.2,
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: 2,
          }}
        >
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Menu;
