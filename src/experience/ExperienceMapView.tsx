import React, { useState } from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/configure'
import { ExperienceSnapshotData } from '../types/common/experience'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { PointOfInterestDocument } from '../types/common/point-of-interest'
import PlacesDetailsView from './PlaceDetailsView'
import { setSelectedPlace } from '../store/experience/experienceReducer'


export const ExperienceMapView: React.FC = () => {
  const experience = useSelector<RootState, ExperienceSnapshotData>((s) => s.experience.experiences[0])
  const dispatch = useDispatch()
  const onPressPlace =  (place: PointOfInterestDocument) => () => {
    dispatch(setSelectedPlace(place))
  }
  return (
    <>
      {experience?.data.pointOfInterests?.map((p) => (
        <Marker
          title={p.name}
          pinColor="#202020"
          key={p._id}
          description={"Test"}
          onPress={onPressPlace(p)}
          coordinate={{ latitude: p.location.coordinates[1], longitude: p.location.coordinates[0] }}
        >
          <MaterialIcon size={20} name={p.type.matIcon.replace('_', '-')} />
        </Marker>
      ))
      }
    </>
  )
}

