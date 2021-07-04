import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, Text } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getPath } from "../../../store/mediaService";
import { MediaDocument } from "../../../types/common/media";

type Props = {
  media: MediaDocument;
};

function format(s: number) {
  // eslint-disable-next-line no-param-reassign,  no-return-assign
  return (s - (s %= 60)) / 60 + (s > 9 ? ":" : ":0") + s;
}

const AudioPlayer: React.FC<Props> = ({ media }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const playAudio = async () => {
    await sound?.playAsync();
  };
  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      // setIsPlaying(false);
    }
  };
  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      // setIsPlaying(false);
    }
  };

  useEffect(() => {
    const loadAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      const {
        sound: soundObject,
        status: initialStatus,
      } = await Audio.Sound.createAsync({
        uri: getPath(media),
        name: media.description,
      });
      soundObject?.setOnPlaybackStatusUpdate((status) => {
        console.log("status");
        if (status.isLoaded) {
          console.log("on status update");
          setIsPlaying(status.isPlaying);
          setDuration(status.durationMillis || 0);
          setPosition(status.positionMillis);
        }
      });
      setDuration(
        (initialStatus.isLoaded && initialStatus.durationMillis) || 0
      );
      setSound(soundObject);
    };
    loadAudio();
  }, [media]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound, media]);

  return (
    <View style={styles.container}>
      {!isPlaying ? (
        <>
          <TouchableOpacity onPress={playAudio} style={styles.button}>
            <MaterialCommunityIcon color={Colors.black} size={50} name="play" />
          </TouchableOpacity>
          {position > 0 && (
            <TouchableOpacity onPress={stopAudio} style={styles.button}>
              <MaterialCommunityIcon
                color={Colors.black}
                size={50}
                name="stop"
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <TouchableOpacity onPress={pauseAudio} style={styles.button}>
          <MaterialCommunityIcon color={Colors.black} size={50} name="pause" />
        </TouchableOpacity>
      )}
      <Text>{format(Math.round(position / 1000))} / </Text>
      <Text>{format(Math.round(duration / 1000))}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    flexDirection: "row",
  },
  button: {
    borderRadius: 100,
    marginEnd: 10,
    backgroundColor: Colors.grey100,
  },
});

export default AudioPlayer;
