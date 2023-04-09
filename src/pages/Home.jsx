import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  useTheme,
  useMediaQuery,
  Grid,
  CardActions,
} from "@mui/material";
import {
  ArrowBackIos as PrevIcon,
  ArrowForwardIos as NextIcon,
} from "@mui/icons-material";

import img1 from "../images/home/1.jpg";
import img2 from "../images/home/2.jpg";
import img3 from "../images/home/3.jpg";

var items = [
  {
    title: "Keep Track",
    text: "You can keep track of what you spent and earned by regularly adding them. You will see them in a list-view where you can also apply filters.",
    alt: "",
    src: img1,
  },
  {
    title: "Monitor",
    text: "You can analyze your expenses and earnings by means of visuals and numbers. This helps you take an overall look at how you manage your money.",
    alt: "",
    src: img2,
  },
  {
    title: "Your Money",
    text: "Managing money is not easy. You may lose control of expenditures sometimes, but not when regularly recording them is your daily routine.",
    alt: "",
    src: img3,
  },
];

const Home = () => {
  return (
    <Box component="div" width="100%" maxWidth={800} mt={2}>
      <Carousel
        NextIcon={<NextIcon />}
        PrevIcon={<PrevIcon />}
        indicators={false}
        animation="slide"
        duration={600}
        interval={5000}
        sx={{ zIndex: 0 }}
      >
        {items.map((item) => (
          <Item key={item.title} item={item} />
        ))}
      </Carousel>
    </Box>
  );
};

export default Home;

const Item = (props) => {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Card>
      <Grid container direction={mobileView ? "column" : "row"}>
        <Grid item xs={12} sm={6}>
          <CardMedia
            component="img"
            alt={props.item.alt}
            src={props.item.src}
            height={400}
            sx={{ objectFit: "cover", objectPosition: "50% 70%" }}
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          xs={12}
          sm={6}
        >
          <CardContent
            sx={{
              textAlign: "justify",
            }}
          >
            <Typography variant={mobileView ? "h4" : "h2"}>
              {props.item.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: mobileView ? 1 : 4 }}>
              {props.item.text}
            </Typography>
          </CardContent>
          <CardActions sx={{ alignSelf: "center", p: 4 }}>
            <Button variant="contained" href="/register" sx={{ mr: 1 }}>
              Create Account
            </Button>
            <Typography variant="body1">or</Typography>
            <Button variant="contained" href="/login">
              Log In
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
