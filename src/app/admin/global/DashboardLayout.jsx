"use client"
import React from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';

export default function DashboardLayout() {
  const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 34rem auto;
    gap: 2.4rem;
  `
  return (
    <StyledDashboardLayout>
        <div>Statistics</div>
        <div>today's activity</div>
        <div>Chart stay durations</div>
        <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}
