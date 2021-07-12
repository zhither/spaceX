import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    root: {
        paddign: "50px",
        width: "600px",
        margin: "auto",
        alignContent: "center",
        // display: "flex",
        marginBottom: 12,
        marginTop: 12
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function Home() {
    const classes = useStyles();
    const [launches, setLaunches] = React.useState([]);
    const [rockets, setRockets] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [detailData, setDetailData] = React.useState("")

    const handleClickOpen = (flight_number) => {
        const detailToShow = data.filter(data => data.flight_number === flight_number);
        setDetailData(detailToShow)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const mergeArrays = () => {

        const dataToShow = launches.map((launch, i) => {
            if (rockets.find(rocket => rocket.rocket_id === launch.rocket.rocket_id)) {
                launch.rocket = rockets.find(rocket => rocket.rocket_id === launch.rocket.rocket_id)
            }
            return (
                launch
            )
        })
        setData(dataToShow)
        setLoading(false)
    }

    React.useEffect(() => {
        setLoading(true);
        fetch("https://api.spacexdata.com/v3/launches")
            .then(response => response.json())
            .then(launchesData => setLaunches(launchesData))

        fetch("https://api.spacexdata.com/v3/rockets")
            .then(response => response.json())
            .then(rocketsData => setRockets(rocketsData))

        mergeArrays()

    }, [])

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >{detailData[0].mission_name}</DialogTitle>
                <DialogContent>
                    <img src={detailData[0].links.mission_patch}
                        width="150" height="150" style={{margin: "auto", alignContent: "center", display: "flex"}}></img>
                    <DialogContentText id="alert-dialog-description">
                        {detailData[0].details}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        BACK
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        ADD TO FAVORITE
                    </Button>
                </DialogActions>
            </Dialog>
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box>
                {
                    data.map((launches, index) => {
                        return (
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Launch #{launches.flight_number}
                                    </Typography>
                                    <Typography variant="h5" component="h2">

                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {launches.mission_name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                       {launches.details}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleClickOpen(launches.flight_number)}>Learn More</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Box>
        </Box>
    );
}

export default Home;
