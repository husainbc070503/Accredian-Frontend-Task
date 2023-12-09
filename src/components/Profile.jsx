import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Profile = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem("accredian-user");
    window.location.reload();
  };
  return (
    <>
      <Typography textAlign="center" my={2} fontSize={28} fontWeight="bold">
        My Profile
      </Typography>
      <Card className="w-75 mx-auto mt-3">
        <CardActionArea>
          <CardMedia
            component="img"
            className="h-50"
            image={user?.profile}
            alt="profile"
          />
          <CardContent>
            <Typography gutterBottom fontSize={20}>
              Name - {user?.name}
            </Typography>
            <Typography color="text.secondary">
              Email - {user?.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button color="secondary" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Profile;
