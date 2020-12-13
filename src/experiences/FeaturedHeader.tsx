import React from "react";
import { Surface, Card, Text } from "react-native-paper";

const FeaturedHeader: React.FC = () => {
  return (
    <Card style={{ margin: 16, padding: 16 }}>
      <Text>If you have a QR code for an experience, scan it here</Text>
    </Card>
  );
};

export default FeaturedHeader;
