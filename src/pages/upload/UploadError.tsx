import {
    createStyles,
    LinearProgress,
    Typography,
    withStyles
} from '@material-ui/core';
import { Fragment } from 'react';
import { FileError } from 'react-dropzone';
// @ts-ignore
import { FileHeader } from './FileHeader';
import React from 'react';

export interface UploadErrorProps {
    file: File;
    onDelete: (file: File) => void;
    errors: FileError[];
}

const ErrorLinearProgress = withStyles((theme) =>
    createStyles({
        bar: {
            backgroundColor: theme.palette.error.main,
        },
    })
)(LinearProgress);

export function UploadError({ file, onDelete, errors }: UploadErrorProps) {
    return (
        <Fragment>
            <FileHeader file={file} onDelete={onDelete} />
            <ErrorLinearProgress variant="determinate" value={100} />
            {errors.map((error) => (
                <div key={error.code}>
                    <Typography color="error">{error.message}</Typography>
                </div>
            ))}
        </Fragment>
    );
}