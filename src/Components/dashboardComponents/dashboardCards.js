import React from "react";
import { Grid } from "@mui/material";
import './CardStyle.css'

const DashboardCards = ({ title, value, route, IconComponent }) => {

    const handleClick = () => {
        console.log(`Navigating to ${route}`);
    };

    return (
        <div>
            <div className="cardBody">
                <Grid container spacing={0} onClick={handleClick}>
                    <Grid item xs={12} md={8}>
                        <h4>{title}</h4>
                        <h1>{value}</h1>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                            {IconComponent && <IconComponent />}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default DashboardCards;
