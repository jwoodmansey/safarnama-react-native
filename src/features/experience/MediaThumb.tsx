import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Caption, Colors } from "react-native-paper";
import Pdf from "react-native-pdf";
import HTML from "react-native-render-html";
import Video, { OnPlaybackRateData } from "react-native-video";
// import { Video as ExpoVideo } from "expo-av";
import { getPath } from "../../store/mediaService";
import { MediaDocument } from "../../types/common/media";
import { getMediaType, MediaType } from "../../types/media";
import { MapNaviationProp } from "../../types/nav/map";

type Props = {
  media: MediaDocument;
};

const MediaThumb: React.FC<Props> = ({ media }) => {
  const nav = useNavigation<StackNavigationProp<MapNaviationProp>>();
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const ref = useRef();
  switch (getMediaType(media.mimetype)) {
    case MediaType.Image: {
      const onImagePress = () => {
        nav.navigate("ImageScreen", { media });
      };
      return (
        <TouchableOpacity onPress={onImagePress}>
          <FastImage
            style={styles.image}
            source={{
              uri: getPath(media),
            }}
          />
        </TouchableOpacity>
      );
    }
    case MediaType.Video: {
      const onPlaybackRateChange = (data: OnPlaybackRateData) => {
        // Alert.alert("playback", JSON.stringify(data));
        // if (data.playbackRate === 0) {
        //   setIsPaused(false);
        // } else {
        //   setIsPaused(false);
        // }
      };
      const playVideo = () => {
        if (Platform.OS === "ios") {
          setIsPaused(false);
        }
      };
      const onBuffer = (meta: OnBufferData) => {
        // Are we starting to buffer?
        // if (meta.isBuffering && !isBuffering) {
        //   animateBuffer();
        // }

        // // Did we just finished buffering?
        // if (!meta.isBuffering && isBuffering) {
        //   if (loopedBufferAnimation) {
        //     loopedBufferAnimation.stop();
        //   }
        // }

        setIsBuffering(meta.isBuffering);
      };

      return (
        <View>
          <ExpoVideo
            // onPlaybackRateChange={onPlaybackRateChange}
            // onExternalPlaybackChange={() => {
            //   // Alert.alert("On External");
            // }}
            // onPlaybackResume={() => {
            //   // Alert.alert("Resume");
            //   // setIsPaused(false);
            // }}
            // onProgress={() => {
            //   // Alert.alert("Test");
            // }}
            // controls
            // paused={isPaused}
            // rate={0}
            // allowsExternalPlayback
            // onBuffer={onBuffer}
            // resizeMode="contain"
            useNativeControls
            ref={ref}
            usePoster={false}
            shouldPlay={!isPaused}
            style={{ height: 150, width: "100%" }}
            source={{ uri: getPath(media) }}
          />
          <View>
            <Pressable onPress={playVideo}>
              <Text>Play!!!</Text>
            </Pressable>
          </View>
          {/* {isPaused && !isBuffering && (
            <View>
              <Pressable onPress={playVideo}>
                <Text>Play</Text>
              </Pressable>
            </View>
          )} */}
        </View>
      );
    }
    case MediaType.Text: {
      return (
        <HTML
          baseFontStyle={styles.htmlText}
          containerStyle={styles.textContainer}
          html=""
          uri={getPath(media)}
        />
      );
    }
    case MediaType.Pdf: {
      const onPDFPress = () => {
        nav.navigate("PDFScreen", { media });
      };
      return (
        <View>
          <Pdf
            singlePage
            fitPolicy={1}
            style={styles.pdf}
            source={{ uri: getPath(media), cache: true }}
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={onPDFPress}
          />
        </View>
      );
    }
    default: {
      return (
        <Caption style={[styles.textContainer, styles.unsupported]}>
          Unsupported media: {media.mimetype}
        </Caption>
      );
    }
  }
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 16,
  },
  unsupported: {
    fontStyle: "italic",
    color: Colors.grey600,
  },
  image: {
    maxHeight: 500,
    minHeight: 300,
    width: "100%",
  },
  pdf: {
    height: 200,
  },
  htmlText: {
    fontSize: 20,
  },
});

export default MediaThumb;
