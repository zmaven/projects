'use client';

import Image from 'next/image';
import { useState } from 'react';
import HeaderInfo from './HeaderInfo';
import {
    ProfilePopup,
    ProjectDetailsHeader
} from '@/components/features/projects';
import { useParams, usePathname } from 'next/navigation';
import { avatarImg } from '@/public/images';
import { PROJECT_DETAILS_SLUG, PROJECT_SLUG } from '@/utils/constants';
import { DashboardHeader } from '@/components/features/dashboard';
import { PhotosHeader } from '@/components/features/projects/photos';

const Header = () => {
    const path = usePathname();
    const { dashboard = [] } = useParams();
    const isProjectDetailsPage = dashboard[PROJECT_DETAILS_SLUG];
    const isProjectPage = dashboard[PROJECT_SLUG] && !isProjectDetailsPage;
    const isPhotosPage = path.includes('photos');
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const renderHeader = () => {
        if (isPhotosPage) return <PhotosHeader />;
        if (isProjectDetailsPage) return <ProjectDetailsHeader />;
        if (isProjectPage) return <DashboardHeader />;
    };

    return (
        <header>
            <div className="w-full flex items-center justify-between px-[26px] pt-[26px] mb-[16px]">
                {isProjectDetailsPage && <HeaderInfo />}
                <section
                    className={`${
                        isProjectPage && 'w-full'
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
            {renderHeader()}
        </header>
    );
};

export default Header;
