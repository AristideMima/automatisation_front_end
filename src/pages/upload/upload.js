import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { array, object, string } from 'yup';
import { MultipleFileUploadField } from './MultipleFileUploadField';

export default function Upload() {
    return (
        <Card>
            <CardContent>
                <Formik
                    initialValues={{ files: [] }}
                    validationSchema={object({
                        files: array(
                            object({
                                url: string().required(),
                            })
                        ),
                    })}
                    onSubmit={(values) => {
                        console.log('values', values);
                        return new Promise((res) => setTimeout(res, 2000));
                    }}
                >
                    {({ values, errors, isValid, isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2} direction="column">
                                <MultipleFileUploadField name="files" />

                                <Grid item md="12">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        disabled={!isValid || isSubmitting}
                                        type="submit"
                                    >
                                        Charger
                                    </Button>
                                </Grid>
                            </Grid>

                            <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}