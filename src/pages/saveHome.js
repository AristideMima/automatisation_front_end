// import {Box, Divider, Grid, Link, Paper} from "@material-ui/core";
// import {CircularProgressbar} from "react-circular-progressbar";
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// import {ArgumentAxis, BarSeries, Chart, Title, Tooltip, ValueAxis} from "@devexpress/dx-react-chart-material-ui";
// import {Animation, EventTracker} from "@devexpress/dx-react-chart";
// import React from "react";
//
// <Grid item xs={12} md={4}>
//     <Paper className={classes.paper}>
//         <Grid container spacing={3}>
//             <Grid item xs={3} >
//                 <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} />;
//             </Grid>
//             <Grid item xs={7} >
//                 <p>
//                     <SupervisorAccountIcon fontSize="large" />
//                 </p>
//                 <p>
//                                     <span className="header_count" >
//                                         2 760 Comptes arrêtés
//                                     </span>
//                 </p>
//             </Grid>
//         </Grid>
//         <Divider />
//         <Box mt={2}>
//             <Link href="#" color="primary"  >
//                 Voir plus de détails
//             </Link>
//         </Box>
//     </Paper>
// </Grid>
// <Grid item xs={12} md={4}>
//     <Paper className={classes.paper}>
//         <Grid container spacing={3}>
//             <Grid item xs={3} >
//                 <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} />;
//             </Grid>
//             <Grid item xs={7} >
//                 <p>
//                     <SupervisorAccountIcon fontSize="large" />
//                 </p>
//                 <p>
//                                     <span className="header_count" >
//                                         2 760 Comptes arrêtés
//                                     </span>
//                 </p>
//             </Grid>
//         </Grid>
//         <Divider />
//         <Box mt={2}>
//             <Link href="#" >
//                 Voir plus de détails
//             </Link>
//         </Box>
//     </Paper>
// </Grid>
// <Grid item xs={12} md={4}>
//     <Paper className={classes.paper}>
//         <Grid container spacing={3}>
//             <Grid item xs={3} >
//                 <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} />;
//             </Grid>
//             <Grid item xs={7} >
//                 <p>
//                     <SupervisorAccountIcon fontSize="large" />
//                 </p>
//                 <p>
//                                     <span className="header_count" >
//                                         2 760 Comptes arrêtés
//                                     </span>
//                 </p>
//             </Grid>
//         </Grid>
//         <Divider />
//         <Box mt={2}>
//             <Link href="#" >
//                 Voir plus de détails
//             </Link>
//         </Box>
//     </Paper>
// </Grid>
//
// {/* Others statistics part */}
//
// <Grid item md={6} xs={12}>
//     <Paper>
//         <Chart
//             data={chartData}
//             rotated
//         >
//             <ArgumentAxis />
//             <ValueAxis max={7} />
//
//             <BarSeries
//                 valueField="population"
//                 argumentField="year"
//             />
//             <Title text="Evolution montants par agence"  />
//             <Animation />
//         </Chart>
//     </Paper>
// </Grid>
// <Grid item md={6} xs={12}>
//     <Paper>
//         <Chart
//             data={chartData}
//         >
//             <ArgumentAxis />
//             <ValueAxis />
//
//             <BarSeries
//                 valueField="population"
//                 argumentField="year"
//             />
//             <Title
//                 text="Croissance par agence"
//             />
//             <EventTracker />
//             <Tooltip targetItem={targetItem} onTargetItemChange={this.changeTargetItem} />
//         </Chart>
//     </Paper>
// </Grid>