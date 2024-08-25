"use client";
import React, { useMemo } from "react";
import styled from "styled-components";
import CustomSpinner from "@/app/components/CustomSpinner";
import useFetchAppointments from "../hooks/useFetchAppointments";
import { useSearchParams } from "next/navigation";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { data, isLoading } = useFetchAppointments();
  const searchParams = useSearchParams();
  const filterValue = searchParams.get("last") || "30";
  
  const { filteredAppointments, confirmedAppointments } = useMemo(() => {
    if (!Array.isArray(data)) {
      return { filteredAppointments: [], confirmedAppointments: [] }; // Return empty arrays if data is not valid
    }

    const now = new Date();
    const filterDays = parseInt(filterValue, 10); // Convert filterValue to integer
    const filterDate = new Date(now.setDate(now.getDate() - filterDays));

    const filteredAppointments = data.filter((appointment) => {
      const createdAt = new Date(appointment.createdAt);
      return createdAt >= filterDate;
    });
    
    const confirmedAppointments = filteredAppointments.filter(
      (appointment) => appointment.status === "confirmed"
    );

    return { filteredAppointments, confirmedAppointments };
  }, [data, filterValue]);

  if (isLoading) {
    return <CustomSpinner />;
  }

  // Ensure data is defined and is an array before filtering
  
  console.log("Filtered Appointments:", filteredAppointments);
  console.log("Confirmed Appointments:", confirmedAppointments);

  return (
    <StyledDashboardLayout>
      <Stats 
        bookings={filteredAppointments} 
        confirmedStays={confirmedAppointments}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}
