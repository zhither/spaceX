import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Detail() {

    const [launches, setLaunches] = React.useState([]);
    const [rockets, setRockets] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const mergeArrays = () => {

        const dataToShow = launches.map((launch, i) => {
            if (rockets.find(rocket => rocket.rocket_id === launch.rocket.rocket_id)) {
                launch.rocket = rockets.find(rocket => rocket.rocket_id === launch.rocket.rocket_id)
            }
            return (
                launch
            )
        })
        console.log(dataToShow, 'data mergeArrays')
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
        <div className="App">
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div>
                example
            </div>
        </div>
    );
}

export default Detail;
