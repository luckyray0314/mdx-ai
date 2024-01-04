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
          borderColor: "#C9A4F8",
          background: "#6C5E8D",
          justifyContent: "flex-start",
          borderRadius: "0 0 80px 0",
          boxShadow: "0px 0px 16px 0px #C9A4F8",
          height: "10vh",
          width: "35vw",
        }}
      >
        <img src="1.png" width={"80px"} height={"80px"}></img>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          noWrap
          sx={{ flex: 1, color: "#C9A4F8", fontWeight: "bold" }}
        >
          Proprietary AI
        </Typography>
      </Toolbar>
    </>
  );
}
