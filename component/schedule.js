import React from "react";
import { Text, View } from "react-native";

const Schedule = ({ data }) => {
  // Find the default schedule
  const defaultSchedule = data.find((schedule) => schedule.default == true);
  if (!defaultSchedule) {
    return <Text>No default schedule found</Text>;
  }
  return (
    <View>
      <Text>Default Schedule Name: {defaultSchedule.name}</Text>
      {defaultSchedule.rules.map((rule, index) => (
        <View key={index} style={{ padding: 10 }}>
          <Text>
            Date: {rule.date} {rule.wday}
          </Text>
          {rule.intervals.map((interval, i) => (
            <View key={i}>
              <Text>From: {interval.from}</Text>
              <Text>To: {interval.to}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Schedule;
