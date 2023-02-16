import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { exampleDocRef } from "../../firebase/queries/exampleQuery";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, DocumentData } from "firebase/firestore";
import { db } from "../../App";
import Navbar from "./navbar/NavBar";
import { Workouts } from "./Workouts";

export function LandingPage() {
  const [workouts, setWorkouts] = useState<DocumentData[]>([]);
  //write a query using useDocumentData to get the workouts
  const exampleDocRef = collection(db, "workoutsessions");
  const [data, loading, error] = useCollectionData(exampleDocRef);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <span>Error</span>;
  }

  if (!data) {
    return <div>Not found</div>;
  }

  console.log(data);
  return (
    <div className="landing-page">
      <Navbar />
      <h1>KondisKlan</h1>

      <Workouts />
    </div>
  );
}
