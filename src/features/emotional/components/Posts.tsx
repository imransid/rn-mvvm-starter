import React, { useState, useMemo, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

import { colors, toasts } from "../../../assets/lib";
import Button from "../../../components/Button";
import { RootState } from "../../../app/store";
import { useGetMyStoriesQuery } from "../../../api/storiesApi";
import Spinner from "react-native-loading-spinner-overlay";

type FilterType = "week" | "month" | "3month";

const Posts = ({ showbutton }: { showbutton?: boolean }) => {
  const [selectFilter, setSelectFilter] = useState<FilterType>("week");

  // Get selected child
  const child = useSelector((state: RootState) => state.root.home.selectedChild);

  // Compute date range based on filter
  const { date_from, date_to } = useMemo(() => {
    const today = moment();
    let start = today;
    let end = today;

    switch (selectFilter) {
      case "week":
        start = today.clone().startOf("week");
        end = today.clone().endOf("week");
        break;
      case "month":
        start = today.clone().startOf("month");
        end = today.clone().endOf("month");
        break;
      case "3month":
        start = today.clone().subtract(3, "months").startOf("month");
        end = today.clone().endOf("month");
        break;
      default:
        start = today.clone();
        end = today.clone();
    }

    return {
      date_from: start.format("YYYY-MM-DDTHH:mm:ss[Z]"),
      date_to: end.format("YYYY-MM-DDTHH:mm:ss[Z]"),
    };
  }, [selectFilter]);

  // Fetch stories using RTK Query
  const { data: stories, isLoading, isError, error } = useGetMyStoriesQuery(
    {
      child_id: child?.child_id?.toString() || "", // convert number to string, fallback empty
      date_from,
      date_to,
    },
    {
      skip: !child,
      refetchOnFocus: true,
    }
  );


  useEffect(() => {
    if (!child) {
      toasts("Please select a child to view stories");
    }
  }, [child]);

  useEffect(() => {
    if (isError && (error as any)?.data?.detail) {
      toasts((error as any).data.detail);
    }
  }, [isError, error]);


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Loading Spinner */}
      <Spinner visible={isLoading} textStyle={{ color: "#fff" }} />

      {/* Filter Buttons */}
      {showbutton && (
        <View style={styles.filterWrapper}>
          {["week", "month", "3month"].map((filter) => {
            const label =
              filter === "week" ? "This Week" : filter === "month" ? "This Month" : "Last 3 Month";
            return (
              <Button
                key={filter}
                styles={{ maxWidth: 100, fontSize: 12 }}
                onclick={() => setSelectFilter(filter as FilterType)}
                name={label}
                textColor={selectFilter === filter ? "#fff" : "#679698"}
                bgColor={selectFilter === filter ? colors.primaryButton : "#fff"}
              />
            );
          })}
        </View>
      )}

      {/* Stories List */}
      <View>
        {isError ? (
          <Text style={styles.noStoriesText}>Failed to load stories.</Text>
        ) : stories && stories.length > 0 ? (
          stories.map((story: any, index: number) => (
            <TouchableOpacity key={index} style={styles.storyCard}>
              <Image
                source={require("../../../assets/images/imoji/animoji.png")}
                style={styles.avatar}
              />
              <View style={styles.storyContent}>
                <Text style={styles.storyTitle}>
                  {story.child_first_name}'s Story
                </Text>
                <Text style={styles.storyTime}>
                  {moment(story.cre_date).format("hh:mm a, DD MMM YYYY")}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noStoriesText}>No stories available</Text>
        )}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  storyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9EAEB",
    padding: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
  },
  storyContent: {
    flex: 1,
    marginLeft: 12,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0A0D12",
  },
  storyTime: {
    fontSize: 14,
    fontWeight: "400",
    color: "#717680",
    marginTop: 4,
  },
  noStoriesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#717680",
  },
});
