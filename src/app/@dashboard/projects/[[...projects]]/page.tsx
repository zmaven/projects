'use client';

import ProjectDetails from '@/components/ProjectDetails';
import ProjectList from '@/components/ProjectList';
import { useParams } from 'next/navigation';
import React from 'react';

const DashboardPage = () => {
    const { projects } = useParams();
    console.log(projects);

    return projects ? <ProjectList /> : <ProjectDetails />;
};

export default DashboardPage;
