import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";
import { Colors, Text } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getPath } from "../../../store/mediaService";
import { MediaDocument } from "../../../types/common/media";

type Props = {
  media: MediaDocument;
};

const AudioPlayer: React.FC<Props> = ({ media }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [duration, setDuration] = useState(0);
  const playAudio = async () => {
    const {
      sound: soundObject,
      status: initialStatus,
    } = await Audio.Sound.createAsync({
      uri: getPath(media),
    });
    setDuration((initialStatus.isLoaded && initialStatus.durationMillis) || 0);
    await soundObject?.playAsync();
    soundObject?.setOnPlaybackStatusUpdate((status) => {
      console.log("status");
      if (status.isLoaded) {
        console.log("on status update");
        setIsPlaying(status.isPlaying);
        setDuration(status.durationMillis || 0);
      }
    });
    setSound(soundObject);
    setIsPlaying(true);
  };
  const stopAudio = async () => {
    if (sound) {
      sound.stopAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      {!isPlaying ? (
        <MaterialCommunityIcon
          color={Colors.black}
          size={30}
          name="play"
          onPress={playAudio}
        />
      ) : (
        <MaterialCommunityIcon
          color={Colors.black}
          size={30}
          name="stop"
          onPress={stopAudio}
        />
      )}
      <Text>{Math.round(duration / 1000)} seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default AudioPlayer;
