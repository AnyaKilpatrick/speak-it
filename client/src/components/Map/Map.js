import React, {Component} from "react";
import { VectorMap } from "react-jvectormap";


class Map extends Component {
    render(){
        return(
            <div style={{width: 600, height: 600}}>
                <VectorMap map={"world_mill"}
                    backgroundColor="#ffffff00"
                    ref="map"
                    containerStyle={{
                        width: '100%',
                        height: '100%'
                    }}
                    regionStyle= {{
                        initial: {
                        fill: '#128da7'
                        },
                        hover: {
                            fill: "#A0D1DC"
                        },
                        // selected: {
                        //     fill: 'yellow'
                        // }
                        // series: {
                        //     regions: [{
                        //       values: gdpData,
                        //       scale: ['#C8EEFF', '#0071A4'],
                        //       normalizeFunction: 'polynomial'
                        //     }]
                        //   },
                        //   onRegionTipShow: function(e, el, code){
                        //     el.html(el.html()+' (GDP - '+gdpData[code]+')');
                        //   }
                    }}
                    containerClassName="map"
                />
            </div>
        )
    }
}

export default Map;

