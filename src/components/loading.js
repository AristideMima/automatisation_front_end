import React from 'react';
// import { SolarSystemLoading } from 'react-loadingg'
import { css } from "@emotion/react";
import MoonLoader from 'react-spinners/MoonLoader';
import  { Audio, BallTriangle } from 'react-loader-spinner';

const Container = () =>
    <div className="sweet-loading">
        <BallTriangle
            height="100"
            width="100"
            color='#ef5350'

            ariaLabel='loading'
        />;
    </div>
export default Container;
