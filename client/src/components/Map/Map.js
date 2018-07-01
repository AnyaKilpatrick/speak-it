import React, {Component} from "react";
import { VectorMap } from "react-jvectormap";
import "./Map.css";
import Tooltip from '@material-ui/core/Tooltip';

class Map extends Component {

    render(){
        return(
            // <div style={{width: 800, height: 800, marginTop:-170}}>
                <VectorMap map={"world_mill"}
                    backgroundColor="#ffffff00"
                    ref="map"
                    containerClassName="map"
                    containerStyle={{
                        width: '100%',
                        height: '100%',
                        marginTop: -120
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
                    onRegionTipShow={ function(e, el, code){
                        // el.html(el.html(el[0].innerHTML));
                        // console.log(el[0]);
                        el[0].style.zIndex = 1000;
                    }}
                    // onRegionLabelShow={ function(event, label, code){
                    //     // el.html(el.html(el[0].innerHTML));
                    //     label.html(""+label.html());
                    //     console.log(code);
                    // }}

                />
            // </div>
        )
    }
}


export default Map;

