'use client';

import Image from 'next/image';
import { authBg } from '@/public/images';
import {
    EmailContent,
    LoginContent,
    PasswordContent,
    RememberContent
} from '@/components/features/auth/sign-in';
import { useAppSelector } from '@/redux/store';
import { signInSteps } from '@/utils/constants';

const SignIn = () => {
    const { authCurrentStep } = useAppSelector((state) => state.app);

    const handleContent = () => {
        if (authCurrentStep === signInSteps.LOGIN) {
            return <LoginContent />;
        } else if (authCurrentStep === signInSteps.EMAIL) {
            return <EmailContent />;
        } else if (authCurrentStep === signInSteps.PASSWORD) {
            return <PasswordContent />;
        } else {
            return <RememberContent />;
        }
    };

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

export default SignIn;
