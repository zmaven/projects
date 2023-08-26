'use client';

const Page = () => {
    return (
        <section className="w-full h-full flex items-start gap-[12px]">
            <div className="border border-line rounded-[8px] w-full text-[14px]">
                <section className="grid grid-cols-5 bg-[#B9B9B920] font-bold">
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        Takeoff
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        Takeoff ID
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        Measurement
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        Total Amount
                    </div>
                    <div className="py-[12px] px-[14px]">Cost Adjustment</div>
                </section>
                <section className="grid grid-cols-5">
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        Trees
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        12345
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        ea.
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        32
                    </div>
                    <div className="py-[12px] px-[14px]">Yes</div>
                </section>
                <section className="grid grid-cols-5">
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        Concrete
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        12346
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        sqft.
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        1200
                    </div>
                    <div className="py-[12px] px-[14px]">No</div>
                </section>
                <section className="grid grid-cols-5">
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        Bamboo Flooring
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        001
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        sqft.
                    </div>
                    <div className="border-r boreder-line py-[12px] px-[14px]">
                        800
                    </div>
                    <div className="py-[12px] px-[14px]">No</div>
                </section>
            </div>
        </section>
    );
};

export default Page;
