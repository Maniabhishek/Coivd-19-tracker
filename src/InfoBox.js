import { Card,CardContent, Typography} from '@material-ui/core';

import React from 'react'

const InfoBox=({title,cases,total})=> {
    return (
    <Card className="infoBox">
        <CardContent>
            <Typography color="textSecondary" className="infoBox_title">
                {title}
            </Typography>
            <Typography color="textSecondary" className="infoBox_cases">{cases}</Typography>
            <Typography color="textSecondary" className="infoBox_total">{total}</Typography>

            </CardContent>
    </Card>
    )
}

export default InfoBox
