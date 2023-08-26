import {
    CalculatorIcon,
    MinusIcon,
    PercentIcon,
    PlusIcon,
    RecentlyIcon
} from '@/public/icons';
import { useState } from 'react';
import { CalculatorPopup } from '..';
import { TakeOffTypesHistory } from '.';
import { Input } from '@/components/shared/textfields';
import { ButtonRounded } from '@/components/shared/buttons';

const TakeOffTypesItem = (types: TakeOffTypes) => {
    const [showCalculator, setShowCalculator] = useState(false);
    const [showPercent, setShowPercent] = useState(false);

    return (
        <>
            <li
                className={`
                    ${types.showHistory ? 'bg-[#FAFAFA]' : ''}
                    grid grid-cols-4 h-[60px] place-content-center px-[20px] border-b border-line
                    cursor-pointer hover:bg-[#FAFAFA]
                `}
            >
                <div className="flex items-center gap-[16px]">
                    <p className="text-primary w-[50px] text-right">
                        {types.qty}
                    </p>
                    <p>{types.title}</p>
                </div>
                <div className="flex items-center gap-[16px]">
                    {types.type === 'arms' ? (
                        <>
                            <Input
                                value=""
                                onChange={() => ''}
                                variant="default"
                                rightText="arms"
                                className="bg-white w-[100px]"
                            />
                            <p className="text-gray-400">ea.</p>
                        </>
                    ) : (
                        <p className="text-gray-400">{types.type}</p>
                    )}
                </div>
                <div className="col-span-2 flex items-center justify-end gap-[12px]">
                    {types.type !== 'y/n' && (
                        <ButtonRounded
                            icon={
                                <RecentlyIcon className="w-[18px] h-[18px] text-primary" />
                            }
                            className={
                                types.showHistory
                                    ? 'bg-[#E2F1FF]'
                                    : 'bg-transparent'
                            }
                        />
                    )}
                    {types.type !== 'y/n' && (
                        <div>
                            <ButtonRounded
                                className="bg-transparent hover:bg-hover-secondary"
                                icon={
                                    <CalculatorIcon className="w-[18px] h-[18px] text-primary" />
                                }
                                onClick={() =>
                                    setShowCalculator(!showCalculator)
                                }
                            />
                            <CalculatorPopup
                                type="calculator"
                                open={showCalculator}
                                onClose={() => setShowCalculator(false)}
                            />
                        </div>
                    )}
                    {types.type === 'ea' && (
                        <>
                            <ButtonRounded
                                icon={
                                    <MinusIcon className="w-[18px] h-[18px] text-primary" />
                                }
                            />
                            <ButtonRounded
                                icon={
                                    <PlusIcon className="w-[18px] h-[18px] text-primary" />
                                }
                            />
                        </>
                    )}
                    {types.type === 'sqft' && (
                        <div>
                            <ButtonRounded
                                icon={
                                    <PercentIcon className="w-[18px] h-[18px] text-primary" />
                                }
                                className="bg-transparent hover:bg-hover-secondary"
                                onClick={() => setShowPercent(!showPercent)}
                            />
                            <CalculatorPopup
                                type="numpad"
                                open={showPercent}
                                onClose={() => setShowPercent(false)}
                            />
                        </div>
                    )}
                    {types.type === 'y/n' && (
                        <input
                            className="mr-[14px]"
                            type="checkbox"
                            checked={types.isCheck}
                            onChange={() => ''}
                        />
                    )}
                </div>
            </li>
            {types.showHistory && (
                <TakeOffTypesHistory history={types.history} />
            )}
        </>
    );
};

export default TakeOffTypesItem;
