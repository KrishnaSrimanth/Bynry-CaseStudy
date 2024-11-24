import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core'
import tt, { Marker } from '@tomtom-international/web-sdk-maps';
import { environment } from '../../../environments/environment';
import { MapMarker } from '../../models/mapMarker';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit,OnChanges{

  private addedMarkersList : Marker[] =[]
  private map!: tt.Map;
  @Input() mapMarkers: MapMarker[] = [];

  ngOnInit(): void {
    this.createMap();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("In NgChanges: changed :" + changes['mapMarkers']['firstChange'] + ' :: '+ changes['mapMarkers']['currentValue'].length + " "+this.mapMarkers.length)
    this.updateMarkersOnMap()
  }

  createMap(){
    this.map = tt.map({
      key: environment.mapKeyToken,
      container: "map",
      boxZoom:true,
      scrollZoom: false
    })
    this.map.addControl(new tt.NavigationControl())
  }

  updateMarkersOnMap() {
    if(this.mapMarkers.length > 0 ){
      this.addedMarkersList.forEach(m=>{
        m.remove()
      });

      this.mapMarkers.forEach( mm => {
        const popup = new tt.Popup({ anchor: 'bottom', offset: { bottom: [0, -40] } }).setHTML(mm.markerText);

        var marker = new tt.Marker({draggable:false,}).setLngLat({
          lat: mm.latitude,
          lng: mm.longitude,
        }).addTo(this.map);
        marker.setPopup(popup)
        this.addedMarkersList.push(marker)
      })
      
      if (this.mapMarkers.length == 1){
        const lat=this.mapMarkers.at(0)?.latitude
        const lng=this.mapMarkers.at(0)?.longitude
        if (lat !=null && lng !=null){
          this.map.setCenter(new tt.LngLat(lng, lat))
          this.map.zoomTo(2)
          // this.map.cameraForBounds(new tt.LngLatBounds(new tt.LngLatLike(),new tt.LngLat()))
        }
      }else{
        this.map.setCenter(new tt.LngLat(0, 0))
          this.map.zoomTo(1)
      }
    }
  }
}
