'use client';

import {
    NoteIcon,
    PhotoIcon,
    MapFoldIcon,
    DownloadIcon,
    ElectricIcon
} from '@/public/icons';
import { Button } from '@/components/shared/buttons';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { PROJECT_ID_SLUG } from '@/utils/constants';

const Footer = () => {
    const { slug } = useParams();
    const projectId = slug && slug[PROJECT_ID_SLUG];
    const path = usePathname();
    const router = useRouter();

    const isProjectPage = !projectId;

    const handleProjectDetailsFooter = () => {
        if (!path.includes('photos')) {
            return (
                <div className="flex items-center gap-[24px]">
                    <Button
                        className="bg-secondary text-primary hover:bg-hover-secondary"
                        value="Export Project"
                        icon={<DownloadIcon />}
                    />
                    <Button value="Notes" icon={<NoteIcon />} />
                </div>
            );
        }
    };

    const handlePhotoFooter = () => {
        if (path.includes('photos')) {
            return (
                <div className="flex items-center gap-[24px]">
                    <Button
                        className="bg-secondary text-primary hover:bg-hover-secondary"
                        value="Upload"
                        icon={<DownloadIcon className="rotate-180" />}
                    />
                    <Button
                        className="bg-secondary text-primary hover:bg-hover-secondary"
                        value="Download"
                        icon={<DownloadIcon />}
                    />
                </div>
            );
        }
    };

    return (
        <footer className="w-full flex items-center justify-between border-t border-t-line p-[26px]">
            <div className="flex items-center gap-[24px]">
                <Button value="Electrical Boxes" icon={<ElectricIcon />} />
                <Button value="Property Map" icon={<MapFoldIcon />} />
                {!path.includes('photos') && (
                    <Button
                        value="Photos"
                        icon={<PhotoIcon />}
                        onClick={() => router.push(`${path}/photos`)}
                    />
                )}
            </div>
            {handleProjectDetailsFooter()}
            {handlePhotoFooter()}
        </footer>
    );
};

export default Footer;
