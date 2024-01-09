import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <>
      <Toolbar
        sx={{
          //   borderBottom: 1,
          //   borderRight: 2,
          position: "fixed",
          top: 0,
          left: 0,
          borderBottom: 2,
          borderRight: 2,
          borderColor: "#66BB6A",
          background: "#2F684D",
          justifyContent: "flex-start",
          borderRadius: "0 0 80px 0",
          boxShadow: "0px 0px 16px 0px #51CC76",
          height: "10vh",
          width: "35vw",
        }}
      >
        <img src="5.png" width={"80px"} height={"80px"}></img>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          noWrap
          sx={{ flex: 1, color: "#66BB6A", fontWeight: "bold" }}
        >
          MDX AI Assitant
        </Typography>
      </Toolbar>
    </>
  );
}
