'use client';

import HeaderInfo from './HeaderInfo';
import { useParams } from 'next/navigation';
import { avatarImg } from '@/public/images';
import { DashboardHeader } from '@/components/features/dashboard';
import {
    ProfilePopup,
    ProjectDetailsHeader
} from '@/components/features/projects';
import Image from 'next/image';
import { useState } from 'react';
import { PROJECT_ID_SLUG } from '@/utils/constants';

const Header = () => {
    const { slug } = useParams();
    const projectId = slug && slug[PROJECT_ID_SLUG];
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const isProjectPage = !projectId;
    const isProjectDetailsPage = projectId;

    return (
        <header>
            <div className="w-full flex items-center justify-between px-[26px] pt-[26px] mb-[16px]">
                {projectId && <HeaderInfo />}
                <section
                    className={`${
                        !projectId && 'w-full'
                    } flex items-center justify-end`}
                >
                    <Image
                        onClick={() => setShowProfilePopup(!showProfilePopup)}
                        className="cursor-pointer"
                        src={avatarImg}
                        alt="avatar"
                    />
                    <ProfilePopup
                        open={showProfilePopup}
                        onClose={() => setShowProfilePopup(false)}
                    />
                </section>
            </div>
            {isProjectPage && <DashboardHeader />}
            {isProjectDetailsPage && <ProjectDetailsHeader />}
        </header>
    );
};

export default Header;
