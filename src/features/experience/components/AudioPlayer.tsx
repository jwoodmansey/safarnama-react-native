import {
  setAudioModeAsync,
  createAudioPlayer,
  AudioPlayer as ExpoAudioPlayer,
} from "expo-audio";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import MusicControl, { Command } from "react-native-music-control";
import { MD2Colors, Text } from "react-native-paper";
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
function msToSeconds(ms: number | undefined) {
  return Math.round((ms || 0) / 1000);
}

const AudioPlayer: React.FC<Props> = ({ media }) => {
  const [sound, setSound] = useState<ExpoAudioPlayer | undefined>(undefined);
  const [status, setStatus] = useState<{
    durationSeconds: number;
    positionSeconds: number;
    isPlaying: boolean;
  }>({
    durationSeconds: 0,
    positionSeconds: 0,
    isPlaying: false,
  });

  const playAudio = async () => {
    sound?.play();
  };
  const pauseAudio = async () => {
    sound?.pause();
    if (Platform.OS === "ios") {
      MusicControl.updatePlayback({ state: MusicControl.STATE_PAUSED });
    }
  };
  const stopAudio = async () => {
    sound?.pause();
    sound?.seekTo(0);
    if (Platform.OS === "ios") {
      MusicControl.updatePlayback({ state: MusicControl.STATE_STOPPED });
    }
  };

  useEffect(() => {
    const loadAudio = async () => {
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionMode: "doNotMix",
      });
      try {
        // this throws TypeError: Cannot read property 'EventEmitter' of undefined, js engine: hermes [Component Stack]
        const soundObject = createAudioPlayer({
          uri: Platform.OS === "ios" ? media.path : getPath(media),
        });
        // const { sound: soundObject } = await Audio.Sound.createAsync({
        //   uri: Platform.OS === "ios" ? media.path : getPath(media),
        //   name: media.description,
        // });
        soundObject?.addListener("playbackStatusUpdate", (newStatus) => {
          if (newStatus.isLoaded) {
            // console.log(newStatus);
            const positionSeconds = Math.round(newStatus.currentTime);
            const durationSeconds = Math.round(newStatus.duration);
            setStatus({
              isPlaying: newStatus.playing,
              positionSeconds,
              durationSeconds,
            });
            // todo this probably all needs moving to redux, or we're going to have conflicts between different audio items
            if (Platform.OS === "ios" && newStatus.playing) {
              MusicControl.setNowPlaying({
                title: media.description,
                notificationIcon: "ic_stat_name",
                elapsedTime: positionSeconds,
                duration: durationSeconds,
              });
              MusicControl.enableBackgroundMode(true);
              MusicControl.enableControl("play", true);
              MusicControl.enableControl("pause", true);
              MusicControl.enableControl("stop", true);
              MusicControl.on(Command.play, () => {
                soundObject.play();
              });
              MusicControl.on(Command.pause, () => {
                soundObject.pause();
              });
              MusicControl.on(Command.stop, () => {
                soundObject.pause();
                soundObject.seekTo(0);
              });
            }
          }
        });
        setSound(soundObject);
      } catch (e) {
        console.log(e);
      }
    };
    loadAudio();
  }, [media]);

  useEffect(() => {
    return sound
      ? () => {
          // MusicControl.stopControl();
          sound.remove();
        }
      : undefined;
  }, [sound, media]);

  return (
    <View style={styles.container}>
      {!status.isPlaying ? (
        <>
          <TouchableOpacity onPress={playAudio} style={styles.button}>
            <MaterialCommunityIcon
              color={MD2Colors.black}
              size={50}
              name="play"
            />
          </TouchableOpacity>
          {status.positionSeconds > 0 && (
            <TouchableOpacity onPress={stopAudio} style={styles.button}>
              <MaterialCommunityIcon
                color={MD2Colors.black}
                size={50}
                name="stop"
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <TouchableOpacity onPress={pauseAudio} style={styles.button}>
          <MaterialCommunityIcon
            color={MD2Colors.black}
            size={50}
            name="pause"
          />
        </TouchableOpacity>
      )}
      <Text>{format(status.positionSeconds)} / </Text>
      <Text>{format(status.durationSeconds)}</Text>
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
    backgroundColor: MD2Colors.grey100,
  },
});

export default AudioPlayer;
