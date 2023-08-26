'use client';
import Image from 'next/image';
import { authBg } from '@/public/images';
import {
    Method,
    Verify,
    Reset,
    Done
} from '@/components/features/auth/password-reset';
import { useAppSelector } from '@/redux/store';
import { passwordResetSteps } from '@/utils/constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthCurrentStep } from '@/redux/reducers/app';

const PasswordReset = () => {
    const dispatch = useDispatch();
    const { authCurrentStep } = useAppSelector((state) => state.app);

    const handleContent = () => {
        if (authCurrentStep === passwordResetSteps.METHOD) {
            return <Method />;
        } else if (authCurrentStep === passwordResetSteps.VERIFY) {
            return <Verify />;
        } else if (authCurrentStep === passwordResetSteps.RESET) {
            return <Reset />;
        } else {
            return <Done />;
        }
    };

    useEffect(() => {
        dispatch(setAuthCurrentStep(passwordResetSteps.METHOD));
    }, []);

    return (
        <main className="w-full h-screen flex items-center justify-center">
            <Image
                className="absolute w-full h-screen bottom-0 z-[-1]"
                src={authBg}
                alt="auth-bg"
            />
            <div className="w-[900px] h-[80vh] overflow-hidden">
                {handleContent()}
            </div>
        </main>
    );
};

export default PasswordReset;
