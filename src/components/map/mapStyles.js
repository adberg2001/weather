const water = '#233142'
const landscape = '#206A5D'
const poi = '#455D7A'
const road_highway = '#F95959'
const road_arterial = '#0F4C75'
const road_local = '#455D7A'
const labels_text_stroke = '#ffffff'
const labels_text_fill = '#ffffff'
const transit = '#1B1B2F'
const administrative = '#336D88'

export const mapStyles = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: water,
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: landscape,
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: poi,
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: road_highway,
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: road_arterial,
      },
      {
        lightness: -20
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: road_local,
      },
      {
        lightness: -17
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: labels_text_stroke,
      },
      {
        visibility: "on"
      },
      {
        weight: 0.9
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: labels_text_fill,
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: transit,
      },
      {
        lightness: -10
      }
    ]
  },
  {},
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: administrative,
      },
      {
        weight: 0.7
      }
    ]
  }
];
