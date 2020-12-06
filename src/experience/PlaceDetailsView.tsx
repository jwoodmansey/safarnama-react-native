// import React, { useEffect, useRef } from 'react'
// import { PointOfInterestDocument } from '../types/common/point-of-interest'
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet'
// import { Headline, Text } from 'react-native-paper';
// import PlaceDetailsViewContent from './PlaceDetailsViewContent';

// type Props = {
//   place?: PointOfInterestDocument
// }

// const PlaceDetailsView: React.FC<Props> = ({place}) => {
//   const sheetRef = useRef<any>()
//   useEffect(() => {
//     sheetRef.current.snapTo(0)
//   }, [place])
//   return (
//     <BottomSheet
//     // enabledGestureInteraction={false}
//     ref={sheetRef}
//     snapPoints={['80%', 300, 0]}
//     // initialSnap={450}
//     borderRadius={10}
//     sty
//     renderHeader={() => <Headline>Place</Headline>}
//     renderContent={() => <PlaceDetailsViewContent></PlaceDetailsViewContent>}
//   />
//   )
// }

// export default PlaceDetailsView

import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import { RootState } from "../store/configure";
import { PointOfInterestDocument } from "../types/common/point-of-interest";
import PlaceDetailsViewContent from "./PlaceDetailsViewContent";

const PlaceDetailsView: React.FC = () => {
  const bs = useRef<BottomSheet>(null);
  const selectedPlace = useSelector<
    RootState,
    PointOfInterestDocument | undefined
  >((state) => state.experience.selectedPlace);
  useEffect(() => {
    if (selectedPlace && bs.current) {
      const r = bs.current;
      if (r) {
        r.snapTo(1);
      }
    }
  }, [selectedPlace]);

  const renderInner = () => <PlaceDetailsViewContent place={selectedPlace} />;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={bs}
      snapPoints={["80%", 250, 0]}
      renderContent={renderInner}
      renderHeader={renderHeader}
      initialSnap={2}
    />
  );
};

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  search: {
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#F5FCFF",
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  header: {
    backgroundColor: "#f7f5eee8",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  photo: {
    width: "100%",
    height: 225,
    marginTop: 30,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});

export default PlaceDetailsView;
