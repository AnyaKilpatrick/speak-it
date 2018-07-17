import React, {Component} from "react";
import { VectorMap } from "react-jvectormap";
import "./Map.css";
import Tooltip from '@material-ui/core/Tooltip';
import API from "../../utils/API";
import Countries from "./../../countries.json";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        color:"grey",
        marginTop:40
    },
    pTag:{
        fontFamily:"'Cabin Sketch', cursive"
    }
})

class Map extends Component {
    state={
        countries: Countries,
        friendCountry:{},
        loaded:false
        
    }
    componentDidMount(){

        API.getFriendsInfo()
        .then(res=>{
            // console.log("Map page", res.data.local.friend);
            if(res.data){
                const array=[];
                const friends= res.data.local.friend;
                const obj = {};
                for(let i=0;i<friends.length; i++){ //looping through array of friends
                    for(let c=0; c<this.state.countries.length; c++){
                        if(this.state.countries[c].name === friends[i].local.country){
                            let code= this.state.countries[c].code;
                            obj[code] = "#6dac6dc9";
                        }
                    }
                    // array.push(res.data.local.friend[i].local.country); //pushing a country to array
                }
                this.setState({friendCountry: obj, loaded:true}, ()=>{
                    console.log(this.state);

                })
            }else{
                console.log(this.state)
            }
        })
        .catch(err=> console.log(err));
    }

    getCodes = () =>{
        if(this.state.friendCountry){
            return this.state.friendCountry
        }
    }

    render(){
        if(this.state.loaded===true) {
            return(
                // <div style={{width: 800, height: 800, marginTop:-170}}>
                    <VectorMap map={"world_mill"}
                        backgroundColor="#ffffff00"
                        ref="map"
                        containerClassName="map"
                        containerStyle={{
                            width: '100%',
                            height: '100%',
                            // marginTop: 
                        }}
                        regionStyle= {{
                            initial: {
                            fill: 'rgba(155, 153, 153, 0.897)'
                            },
                            hover: {
                                fill: "#A0D1DC"
                            },
                            selected: {
                                fill: 'yellow'
                            }
                        }}
                        regionLabelStyle={{
                            initial: {
                                'font-family': 'Verdana',
                                'font-size': '12',
                                'font-weight': 'bold',
                                cursor: 'default',
                                fill: 'black'
                            },
                            hover: {
                                cursor: 'pointer'
                            },
                            onLabelShow: function(event, label, code){
                                label.text('bla bla bal');
                            }
                        }}

                        series= {{
                            regions: [{
                                values: this.state.friendCountry
                            }]
                        }}
                        onRegionTipShow={ function(e, el, code){
                            // el.html(el.html(el[0].innerHTML));
                            // console.log(el[0]);
                            el[0].style.zIndex = 1000;
                            // API.countryInformation(el[0].innerHTML).then(res=>console.log("res",res.data)).catch(err=>console.log(err));
                        }}
                        // onRegionLabelShow={ function(event, label, code){
                        //     // el.html(el.html(el[0].innerHTML));
                        //     label.html(""+label.html());
                        //     console.log(code);
                        // }}

                    />
                // </div>
            )
        }else{
            return(
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <p className={this.props.classes.pTag}>Loading map..</p>
                        <CircularProgress className={this.props.classes.progress} size={50} />
                    </Grid>
                </Grid>
            )
        }
    }
}


export default withStyles(styles)(Map);

