import { collection, DocumentData } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "containers/Root";
import { Workouts } from "./Workouts";
import { useWorkoutSessionCollection } from "firebase/queries/workoutSessionQueries";
import { Container } from "@mantine/core";
import { useMobile } from "util/hooks";

export function LandingPage() {
  const isMobile = useMobile();
  return (
    <Container p={isMobile ? 0 : "sm"} size={"sm"}>
      <Workouts />
    </Container>
  );
}
