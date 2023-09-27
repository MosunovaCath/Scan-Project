import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
function RegisterForm(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography>{children}</Typography> */}
          <img src="/images/repair.jpeg" alt="repair" />
        </Box>
      )}
    </div>
  );
}
export default RegisterForm;
